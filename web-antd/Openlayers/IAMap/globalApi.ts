import { mergeFocusOptions } from './options';
import { isNil, isEmpty } from 'lodash';
import { IALayer, IAIcon, IALine, IAPoint, IABuffer, IAConverIcon } from './extends';
import { getFarmCenter } from './constant';

import 'ol/ol.css';
import Feature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON';
import LinearRing from 'ol/geom/LinearRing';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import { LineString, MultiLineString, MultiPoint, MultiPolygon, Point, Polygon } from 'ol/geom';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { fromLonLat } from 'ol/proj';
import { Style, Stroke, Fill, Circle, Icon, Text } from 'ol/style';
// import IAFeatureIcon from './extends/IAFeatureIcon';
import { clearSpread } from './animation/selected-spread';
import { transform } from 'ol/proj';
import { Draw, Modify, Select, Snap } from 'ol/interaction';
import WKT from 'ol/format/WKT';
import { __getFeatureByWKB, __getFeatureByWKT } from './utils/types';

export function globalApiMixin(IAMap: any) {
  /**
   *
   * 通过名称寻找layer
   * @param {*} name
   */
  IAMap.prototype.findLayer = function (name: string) {
    const ia = this;
    const { $layers } = ia;

    return $layers.find((item: any) => item.values_._name === name);
  };

  /**
   *
   * 通过条件查找feature
   * @param {*} condition
   */
  IAMap.prototype.findFeature = function (layerName: any, condition: any, values: any) {
    const ia = this;
    const features = ia.$findLayer(layerName).getSource().getFeatures();

    return features.find((item: any) => item.values_[condition] === values);
  };

  /**
   *
   * @param {*} opts
   * @returns
   * @example
   * {
   *  code: '',        // 田块code
   *  highlight: true, // 是否高亮
   *  center: true,    // 是否移动到地图中心
   *  zoom: true,      // 是否将田块放到最大
   * }
   */
  IAMap.prototype.focus = async function (options: any) {
    const ia = this;

    setTimeout(() => {
      if (isNil(options.code) || isEmpty(options.code)) {
        throw new Error(`code parameter is required`);
      }

      const { _fieldCache, $map } = ia;
      const opts = mergeFocusOptions(options);
      const { highlight, center, zoom } = opts;

      // 获取对应的田块
      let field = _fieldCache[opts.code];

      if (!field) {
        console.warn(
          `找不到对应田块, 或者是因为田块数据异步加载而导致, 请确保田块数据加载完成再执行focus方法`
        );
      }

      // 判断是否高亮
      if (highlight) {
        ia.$emit('field', field.feature, field.layer);
      }

      // 是否移动到中心点
      if (center) {
        let view = $map.getView();
        view.animate({
          center: field.center
        });
        view.once('change:center', () => {
          options.callback && options.callback();
        });
      }

      // 是否将田块放到最大
      if (zoom) {
        setTimeout(() => {
          $map.getView().fit(field.extent, {
            size: $map.getSize(),
            padding: [100, 100, 100, 100],
            duration: 1000
          });
        });
      }
    }, 1000);
  };

  // 是否移动到中心点
  // IAMap.prototype.animate = function (code) {
  //   let field = this._fieldCache[code];

  //   if (center) {
  //
  //     let view = this.$map.getView();
  //     view.animate({
  //       center: field.center
  //     });
  //     setTimeout(() => {
  //       this.$map.getView().fit(field.extent, {
  //         size: this.$map.getSize(),
  //         padding: [100, 100, 100, 100],
  //         duration: 1000
  //       });
  //     });
  //   }
  // };

  /**
   *
   * 展示或者隐藏图层
   * @param {*} name 插件名称
   */
  IAMap.prototype.toggle = function (name: any) {
    const ia = this;

    let layer = ia.findLayer(name),
      visible;

    if (process.env.NODE_ENV !== 'production' && !layer) {
      throw new Error(`${name} is not in layers list`);
    }

    if (layer) {
      visible = layer.getVisible();

      layer.setVisible(!visible);
    }
  };

  /**
   *
   * 传入名字创建图层
   * @param {*} name
   * @returns
   */
  IAMap.prototype.insertLayer = function (name: any, options: any) {
    const ia = this;
    const layer = new IALayer(name, options);
    ia.$layers.push(layer);
    ia.$map.addLayer(layer);

    return layer;
  };

  /**
   *
   * 添加画线
   * @param {*} name
   * @param {*} options
   * @returns
   */
  IAMap.prototype.insertDraw = function (name: any, options: any) {
    const ia = this;
    const layer = ia.findLayer(name);
    if (!layer) {
      throw new Error(`名字: ${name}的图层找不到`);
    }
    let view = ia.$map.getView();
    let feature = null;
    if (options.type === 'wkt') {
      feature = __getFeatureByWKT(options.point, 'EPSG:4326', view.getProjection());
    } else if (options.type === 'wkb') {
      feature = __getFeatureByWKB(options.point, 'EPSG:4326', view.getProjection());
    } else if (options.type === 'geojson') {
      feature = __getFeatureByWKB(options.point, 'EPSG:4326', view.getProjection());
    } else {
      feature = new Feature({ type: 'drawview', geometry: options.point });
    }
    layer.insertFeatures(feature ? feature : null);
    let source = layer.getSource();
    let modify = new Modify({
      source: source
    });

    modify.on('modifyend', function (e: any) {
      var features = e.features.array_;
      var wktformat = new WKT();
      options.drawend(wktformat.writeGeometry(features[0].getGeometry()));
    });
    let draw = new Draw({
      source: source,
      type: 'Polygon'
    });
    let snap = new Snap({
      source: source
    });
    let select = new Select();
    ia.$map.addInteraction(modify);
    ia.$map.addInteraction(select);
    draw.on('drawstart', function (e) {
      let format = new WKT();
      let data;
      data = format.writeFeature(e.feature);
      options.drawstart(data);
    });
    draw.on('drawend', function (e) {
      const geometry = e.feature.getGeometry();
      let view = ia.$map.getView();
      let format = new WKT();
      let data;
      data = format.writeFeature(e.feature, {
        featureProjection: view.getProjection(),
        dataProjection: 'EPSG:4326'
      });
      options.drawend(data);
      ia.$map.removeInteraction(draw);
      ia.$map.removeInteraction(snap);
    });
    draw.on('change', function (e: any) {
      let format = new WKT();
      let data;
      data = format.writeFeature(e.feature);
      options.change(data);
    });
    // draw.on('clear', function (e) {
    //   let format = new WKT();
    //   let data;
    //   data = format.writeFeature(e.feature);
    //   options.clear(data);
    // });
    options.remove(ia.$map);
    ia.$map.addInteraction(draw);
    ia.$map.addInteraction(snap);
  };
  /**
   *
   * 添加点
   * @param {*} name
   * @param {*} options
   * @returns
   */
  IAMap.prototype.insertPoint = function (name: any, options: any) {
    const ia = this;
    const layer = ia.findLayer(name);
    const feature = new IAPoint(options);

    if (!layer) {
      throw new Error(`名字: ${name}的图层找不到`);
    }

    layer.insertFeatures(feature);
    return feature;
  };

  /**
   *
   * 画图标的方法
   * @param {*} options feature 参数
   * @returns
   * @example
   * {
   *  rotation: '',          // 图标旋转角度
   *  icon: '',              // 图标名称
   *  point: [],             // 图标位置
   * }
   */
  IAMap.prototype.insertIcon = function (name: any, options: any) {
    const ia = this;
    const layer = ia.findLayer(name);
    const feature = new IAIcon(options);

    if (!layer) {
      throw new Error(`名字: ${name}的图层找不到`);
    }

    layer.insertFeatures(feature);
    return feature;
  };

  /**
   *
   * @param {*} name 图层名称
   * @param {*} options 画线的参数, new Stroke的时候传入, 可以参考openlayer Stroke
   * @returns 线的feature
   */
  IAMap.prototype.insertLine = function (name: any, options: any) {
    const ia = this;
    const layer = ia.findLayer(name);
    const feature = new IALine(options);

    if (!layer) {
      throw new Error(`名字: ${name}的图层找不到`);
    }

    layer.insertFeatures(feature);
    return feature;
  };

  /**
   *
   * @param {*} name 图层名称
   * @param {*} options
   * @returns buffer的feature
   */
  IAMap.prototype.insertBuffer = function (name: any, options: any) {
    const ia = this;

    const layer = ia.findLayer(name);
    const feature = new IABuffer(options);

    if (!layer) {
      throw new Error(`名字: ${name}的图层找不到`);
    }

    layer.insertFeatures(feature);
    return feature;
  };

  /**
   *
   * 清空图层要素
   * @param {*} name
   */
  IAMap.prototype.clear = function (name: any) {
    const ia = this;
    const layer = ia.findLayer(name);
    if (!layer) {
      throw new Error(`名字: ${name}的图层找不到`);
    }

    layer.getSource().clear();
  };

  /**
   *
   * 删除图层某个要素
   * @param {*} name
   */
  IAMap.prototype.remove = function (name: any, feature: any) {
    const ia = this;
    const layer = ia.findLayer(name);
    if (!layer) {
      throw new Error(`名字: ${name}的图层找不到`);
    }

    layer.getSource().removeFeature(feature);
  };

  /**
   *
   * 将地图移动到中心
   * @param {*} point
   */
  IAMap.prototype.center = function (point = getFarmCenter()) {
    const { $map } = this;

    $map.getView().animate({
      center: point
    });
  };

  /**
   *
   * 添加地图图标
   * @param {*} options
   */
  IAMap.prototype.addIcon = function (options: any) {
    const ia = this;
    const { $map, $icons } = ia;

    let icon = new IAConverIcon(
      Object.assign(
        {
          ia: ia
        },
        options
      )
    );
    $map.addOverlay(icon);
    $icons.push(icon);

    return icon;
  };

  /**
   *
   * 删除地图图标
   */
  IAMap.prototype.removeIcon = function (icon: any) {
    const ia = this;
    const overlay = ia.$map.getOverlays();
    let idx = 0;

    overlay.array_.forEach((item: any, index: any) => {
      if (item.ol_uid === icon.ol_uid) {
        idx = index;
      }
    });
    overlay.removeAt(idx);
    ia.$icons.splice(idx, 1);
  };

  /**
   *
   * 显示或隐藏图标
   * @param {*} type addIcon调用时传入的type
   */
  IAMap.prototype.toggleIcon = function (type: any) {
    const ia = this;

    ia.$icons.forEach((item: any) => {
      if (item.$type === type) {
        if (item._show) {
          item.hide();
        } else {
          item.show();
        }
      }
    });
  };

  IAMap.prototype.testBuffered = function (points: any) {
    // const parser = new jsts.io.OL3Parser();
    // parser.inject(
    //   Point,
    //   LineString,
    //   LinearRing,
    //   Polygon,
    //   MultiPoint,
    //   MultiLineString,
    //   MultiPolygon
    // );
    // const source = new VectorSource()
    // const feature = new Feature({
    //   type: 'line',
    //   geometry: new LineString(points),
    // })
    // const jstsGeom = parser.read(feature.getGeometry());
    // // create a buffer of 40 meters around each line
    // const buffered = jstsGeom.buffer(3, 0, 2);
    // // convert back from JSTS and replace the geometry on the feature
    // feature.setGeometry(parser.write(buffered))
    // feature.setStyle(
    //   new Style({
    //     stroke: new Stroke({
    //       color: [243, 222, 7, 0.5],
    //     }),
    //     // 填充
    //     fill: new Fill({
    //       color: [243, 222, 7, 0.5],
    //     }),
    //   })
    // )
    // source.addFeature(feature)
    // const vectorLayer = new VectorLayer({
    //   source: source,
    // })
    // this.$map.addLayer(vectorLayer)
  };

  /**
   * 配合 _animation plugin使用
   * 添加地图feature图标
   * @param {*} options
   */
  IAMap.prototype.addFeatureIcon = function (options: any) {
    const ia = this;
    const { $map, $featureIcons } = ia;

    let icon = $featureIcons({
      ia: ia,
      ...options
    });
    let layer = ia.findLayer('animation');
    if (layer) {
      let source = layer.getSource();
      // icon.on('change:active',(v)=>{
      //   let aniKey = icon.get('aniKey')
      //   if(v){
      //     if(!aniKey) {
      //       let key = selectedSpread(icon,layer,ia)
      //       icon.set('aniKey',key)
      //     }
      //   } else {
      //     aniKey && clearSpread(aniKey)
      //   }
      // })
      // icon.on('hide', () => {
      //   let aniKey = icon.get('aniKey');
      //   if (aniKey) {
      //     clearSpread(aniKey);
      //     icon.set('aniKey', '');
      //   }
      // });
      // icon.on('show', () => {
      //   let active = icon.get('active');
      //   if (active) {
      //     let aniKey = selectedSpread(icon, layer, ia);
      //     icon.set('aniKey', aniKey);
      //   }
      // });
      source.addFeature(icon);
    }
    $featureIcons.push(icon);
    return icon;
  };

  /**
   *
   * 删除地图feature图标
   */
  IAMap.prototype.removeFeatureIcon = function (icon: any) {
    const ia = this;
    const { $featureIcons } = ia;
    let layer = ia.findLayer('animation');

    if (layer) {
      let source = layer.getSource();
      const features = source.getFeatures();
      source.removeFeature(icon);
      const fIndex = features.findIndex((item: any) => item.ol_uid === icon.ol_uid);
      if (fIndex > -1) {
        $featureIcons.splice(fIndex, 1);
      }
    }
  };

  /**
   *
   * 全部删除地图feature图标
   */
  IAMap.prototype.removeAllFeatureIcon = function () {
    const ia = this;
    clearSpread(0);
    ia.findLayer('animation').getSource().clear();
  };

  /**
   *
   * 去除图标的激活动画
   */
  IAMap.prototype.removeIconAnimate = function () {
    clearSpread(0);
  };

  /**
   *
   * 显示或隐藏feature图标
   * @param {*} type addIcon调用时传入的type
   * @param {number} iShow  1->显示  2->隐藏
   */
  IAMap.prototype.toggleFeatureIcon = function () {
    const ia = this;

    ia.$icons.forEach((item: any) => {
      // if (item.$type === type) {
      //
      //   if (item._show) {
      //     item.hide();
      //   } else {
      //     item.show();
      //   }
      // }
    });
  };

  IAMap.prototype.toggleShowFeatureIcon = function (type: any, iShow: any) {
    const ia = this;

    ia.$featureIcons.forEach((item: any) => {
      if (item.$type === type) {
        if (iShow) {
          if (iShow === 1) {
            item.show();
          } else {
            item.hide();
          }
        } else {
          if (item._show) {
            item.hide();
          } else {
            item.show();
          }
        }
      }
    });
  };

  IAMap.prototype.douglas = function (points: any) {
    const ia = this;

    try {
      return new Promise((res, rej) => {
        ia.$worker.postMessage(JSON.stringify(points));

        ia.$worker.onmessage = function (event: any) {
          res(event.data);
        };

        ia.$worker.onerror = function (e: any) {
          rej(e);
        };
      });
    } catch (error) {
      console.log('err', error);
    }
  };

  IAMap.prototype.clearWorker = function () {
    this.$worker.terminate();
  };

  /**
   * 水滴文字
   * options: {point: [], text: ''}
   */
  IAMap.prototype.addWaterDropText = function (options: any) {
    const ia = this;
    let layer = ia.findLayer('waterDropText');
    if (layer) {
      let source = layer.getSource();
      let point = new Feature({ geometry: new Point(options.point) });
      point.set('text', options.text);
      source.addFeature(point);
    }
  };

  /**
   * new规划路径
   * options: {point: [], text: ''}
   */
  const LineType = {
    STRAIGHT: 1,
    CURVE: 0
  };

  /**
   *
   * @param {*} pointsList 暂只支持32649经纬度数据
   * @param {*} param1
   */
  IAMap.prototype.insertPlanRouteLine = async function (
    pointsList: any,
    {
      inOut = true,
      arrow = true,
      douglas = true,
      straightColor = '#ffea19',
      curveColor = '#33F3FF'
    } = {}
  ) {
    const ia = this;
    let layer = ia.findLayer('planRoute');

    pointsList.forEach((p: any) => {
      let c = transform([p.x, p.y], 'EPSG:32649', 'EPSG:3857');
      p.x = c[0];
      p.y = c[1];
    });
    if (douglas) {
      pointsList = await this.$douglas.getObjList({
        array: pointsList
      });
    }
    if (layer) {
      let source = layer.getSource();
      let straightLines: any = []; // 直线
      let curveLines: any = []; // 曲线
      let linePoints: any = [];
      let lineCountPoints: any = [];
      let arrowLines: any = [];
      let curveArrowLines: any = [];

      let curLineType = '',
        curStraightLineIndex = -1,
        curCurveLineIndex = -1,
        isAutoComp = true; // 是否补全路径

      // category 直线作业点的类别  -1->非直线作业点  0->起点  1->终点
      // flag     是否已行驶股过    0->否  1->是
      // line     行号
      // strCur   是否直线作业点    0->否  1->是
      // x        横坐标
      // y        纵坐标
      pointsList.forEach((point: any, index: any) => {
        const tempLineType = point.strCur;
        if (index === 0) {
          if (tempLineType === LineType.STRAIGHT) {
            // 直线点
            curStraightLineIndex++;
            straightLines.push({
              index: curStraightLineIndex,
              points: [point]
            });
          } else {
            // 曲线点
            curCurveLineIndex++;
            curveLines.push({
              index: curCurveLineIndex,
              points: [point]
            });
          }
        } else {
          if (+curLineType === LineType.STRAIGHT && tempLineType === LineType.CURVE) {
            // 当前点为曲线点，上一个作业点为直线点
            curCurveLineIndex++;
            curveLines[curCurveLineIndex] = {
              index: curCurveLineIndex,
              points: [point]
            };
            if (isAutoComp) {
              straightLines[curStraightLineIndex].points.push({
                ...point,
                line: curStraightLineIndex + 1
              });
            }
          } else if (+curLineType === LineType.CURVE && tempLineType === LineType.STRAIGHT) {
            // 当前点为直线点，上一个作业点为曲线点
            curStraightLineIndex++;
            const tempPoints = isAutoComp ? [point] : [pointsList[index - 1]];
            straightLines.push({
              index: curStraightLineIndex,
              points: tempPoints
            });
          } else {
            if (+curLineType === LineType.CURVE && tempLineType === LineType.CURVE) {
              // 曲线点
              curveLines[curCurveLineIndex].points.push(point);
            } else if (+curLineType === LineType.STRAIGHT && tempLineType === LineType.STRAIGHT) {
              // 直线点
              straightLines[curStraightLineIndex].points.push(point);
            }
          }
        }
        lineCountPoints.push(point);
        curLineType = tempLineType;
      });

      // lineCountPoints = straightLines.map((line)=>{
      //   let len = line.points.length
      //   return [ line.points[0], line.points[len-1] ]
      // }).flat()
      // console.log('%c 🍜 lineCountPoints: ', 'font-size:20px;background-color: #4b4b4b;color:#fff;', lineCountPoints);

      for (let i = 0; i < lineCountPoints.length; i++) {
        let lineCountPoint = lineCountPoints[i];
        let target = arrowLines.find((p: any) => {
          return p.line === lineCountPoint.line;
        });
        if (target) {
          if (lineCountPoint.category === 0) {
            target.start = [lineCountPoint.x, lineCountPoint.y];
          } else {
            target.end = [lineCountPoint.x, lineCountPoint.y];
          }
        } else {
          if (lineCountPoint.line) {
            let line: any = {
              line: lineCountPoint.line
            };
            if (lineCountPoint.category === 0) {
              line.start = [lineCountPoint.x, lineCountPoint.y];
            } else {
              line.end = [lineCountPoint.x, lineCountPoint.y];
            }
            arrowLines.push(line);
          }
        }
      }

      // 直线 Feature
      const straightLineStyle = new Style({
        stroke: new Stroke({
          color: straightColor,
          width: 2,
          lineDash: [8, 4],
          lineCap: 'butt'
        })
      });

      straightLines.forEach((line: any) => {
        let coords = line.points.map((p: any) => {
          return [p.x, p.y];
        });
        let feature = new Feature();
        let geo = new LineString(coords);
        feature.setGeometry(geo);
        feature.setStyle(straightLineStyle);
        source.addFeature(feature);
      });
      // 直线箭头点
      const arrowPointStyle = (fea: any) => {
        let angle = fea.get('angle');
        return new Style({
          image: new Icon({
            src: require('./icons/plan_route_arrow_yellow.svg'),
            rotation: angle || 0,
            scale: 1.2
          })
        });
      };
      const lineCountStyle = (fea: any) => {
        let { line, entry, exit } = fea.getProperties();
        if (entry) {
          return inOut
            ? new Style({
                text: new Text({
                  // font: '16px PingFangSC',
                  font: '12px',
                  textAlign: 'center',
                  textBaseline: 'top',
                  offsetY: -34,
                  text: '进',
                  fill: new Fill({
                    color: '#fff'
                  })
                }),
                image: new Icon({
                  displacement: [0, 17],
                  src: require(`./icons/plan_route_location.svg`)
                })
              })
            : undefined;
        }
        if (exit) {
          return inOut
            ? new Style({
                text: new Text({
                  font: '12px',
                  textAlign: 'center',
                  textBaseline: 'top',
                  offsetY: -34,
                  text: '出',
                  fill: new Fill({
                    color: '#fff'
                  })
                }),
                image: new Icon({
                  displacement: [0, 17],
                  src: require(`./icons/plan_route_location.svg`)
                })
              })
            : undefined;
        }
        return [
          new Style({
            text: new Text({
              font: '12px',
              textAlign: 'center',
              textBaseline: 'top',
              offsetY: -10,
              text: line.toString(),
              fill: new Fill({
                color: '#4B7EFF'
              })
            }),
            image: new Icon({
              src: require('./icons/plan_route_line_count.svg')
            })
          })
        ];
      };

      arrowLines.forEach((arrowLine: any, index: any) => {
        if (index === 0) {
          console.log(
            '%c 🥑 arrowLine: ',
            'font-size:20px;background-color: #ED9EC7;color:#fff;',
            arrowLine
          );
        }
        if (arrowLine.start && arrowLine.end && arrow) {
          // 直线箭头
          let arrowCenter = [
            (arrowLine.start[0] + arrowLine.end[0]) / 2,
            (arrowLine.start[1] + arrowLine.end[1]) / 2
          ];
          let pointFeature = new Feature();
          let point = new Point(arrowCenter);
          pointFeature.setGeometry(point);
          pointFeature.setStyle(arrowPointStyle);
          source.addFeature(pointFeature);

          // 计算倾斜角度
          let angle = getAngle(arrowLine.start, arrowLine.end);
          pointFeature.set('angle', Math.PI / 2 + angle);
        }

        if (arrowLine.start) {
          let center = arrowLine.start;
          let pointFeature = new Feature();
          pointFeature.set('line', arrowLine.line);
          let point = new Point(center);
          pointFeature.setGeometry(point);
          pointFeature.setStyle(lineCountStyle);
          source.addFeature(pointFeature);
          if (index === 0) {
            // 进入口
            pointFeature.set('entry', true);
          }
        }
        if (arrowLine.end) {
          let center = arrowLine.end;
          let pointFeature = new Feature();
          pointFeature.set('line', arrowLine.line);
          let point = new Point(center);
          pointFeature.setGeometry(point);
          pointFeature.setStyle(lineCountStyle);
          source.addFeature(pointFeature);
          if (index === arrowLines.length - 1) {
            // 出口
            pointFeature.set('exit', true);
          }
        }
      });

      // 曲线
      const curveLineStyle = new Style({
        stroke: new Stroke({
          color: curveColor,
          width: 2,
          lineDash: [8, 4],
          lineCap: 'butt'
        })
      });
      curveLines.forEach((line: any, index: any) => {
        let coords = line.points.map((p: any) => {
          return [p.x, p.y];
        });
        let feature = new Feature();
        let geo = new LineString(coords);
        feature.setGeometry(geo);
        feature.setStyle(curveLineStyle);
        source.addFeature(feature);
        // if(index === 1) {
        // 画第一条
        //   let count = 0
        //   geo.forEachSegment((start,end)=>{
        //     if(count % 15 === 0) {
        //       // console.log('%c 🍥 start,end: ', 'font-size:20px;background-color: #F5CE50;color:#fff;', start,end);
        //       let mid = [(start[0]+end[0])/2,(start[1]+end[1])/2]
        //       curveArrowLines.push({
        //         start:  transform(start,'EPSG:3857','EPSG:4326'),
        //         end:  transform(end,'EPSG:3857','EPSG:4326'),
        //         // start,
        //         // end,
        //         midPoint: mid
        //       })
        //     }
        //     count++
        //   })
        // }
      });

      // 曲线箭头点
      if (arrow) {
        const curveArrowPointStyle = (fea: any) => {
          let angle = fea.get('angle');
          return new Style({
            image: new Icon({
              src: require(`./icons/plan_route_arrow_blue.svg`),
              rotation: angle || 0,
              scale: 1.2
            })
          });
        };
        curveArrowLines.forEach((arrowLine: any) => {
          let pointFeature = new Feature();
          let point = new Point(arrowLine.midPoint);
          pointFeature.setGeometry(point);
          pointFeature.setStyle(curveArrowPointStyle);
          source.addFeature(pointFeature);

          // 计算倾斜角度
          let angle = getAngle(arrowLine.start, arrowLine.end);
          pointFeature.set('angle', Math.PI / 2 + angle);
        });
      }
    }
  };

  // TODO
  /*
    "back": 0,
    "category": -1-曲线, 0-起点, 1-终点
    "flag": "",
    "line": 路段号(大于0显示),
    "strCur": 1-直线(#FFEA19), 0-曲线(#33F3FF),
    "taskIndex": 0,
    "x": 0,
    "y": 0
  * 调度监控&记录回放路径信息-路段号, 规划路径, 方向 
  */
  IAMap.prototype.dispatchPath = function (list: any) {
    const ia = this;
    const lPath = ia.findLayer('dispatch:path')
      ? ia.findLayer('dispatch:path')
      : ia.insertLayer('dispatch:path', { zIndex: 1002 });
    const lIcon = ia.findLayer('dispatch:icon')
      ? ia.findLayer('dispatch:icon')
      : ia.insertLayer('dispatch:icon', { zIndex: 1001 });

    lIcon.setVisible(false);

    function straightStyle() {
      return new Style({
        stroke: new Stroke({
          color: '#FFEA19',
          width: 2,
          lineDash: [8, 4],
          lineCap: 'butt'
        })
      });
    }

    function curveStyle() {
      return new Style({
        stroke: new Stroke({
          color: '#33F3FF',
          width: 2,
          lineDash: [8, 4],
          lineCap: 'butt'
        })
      });
    }

    function lineNumber(point: any, number: any) {
      let feature = new Feature({
        geometry: new Point(point)
      });
      feature.setStyle(
        new Style({
          image: new Icon({
            src: require('./icons/plan_route_line_count.svg'),
            anchor: [0.5, 1]
          }),
          text: new Text({
            font: '12px',
            textAlign: 'center',
            // textBaseline: 'middle'
            offsetY: -14,
            text: number.toString(),
            fill: new Fill({
              color: '#4B7EFF'
            })
          })
        })
      );
      lIcon.insertFeatures(feature);
    }

    function direction(start: any, end: any) {
      let feature = new Feature({
        geometry: new Point([(start[0] + end[0]) / 2, (start[1] + end[1]) / 2])
      });

      feature.setStyle(
        new Style({
          image: new Icon({
            src: require('./icons/plan_route_arrow_yellow.svg'),
            rotation: Math.PI / 2 + getAngle(start, end) || 0,
            scale: 0.8
          })
        })
      );
      lIcon.insertFeatures(feature);
    }

    let temp = [];
    let path = [];
    let farm = [];

    let road = [];
    let straight = [];
    let curve = [];
    let straightLine = '';

    // 画机耕道
    function insertRoad(points: any) {
      let fFeatrue = new Feature({
        geometry: new LineString(points)
      });
      fFeatrue.setStyle(
        new Style({
          stroke: new Stroke({
            color: '#4b8cff',
            width: 4,
            lineCap: 'butt'
          })
        })
      );
      lPath.insertFeatures(fFeatrue);
    }

    // 起止点
    function guidePoint(start: any, end: any) {
      let s = new Feature({
        geometry: new Point(start)
      });
      let e = new Feature({
        geometry: new Point(end)
      });
      s.setStyle(
        new Style({
          image: new Icon({
            src: require(`./icons/farm_lbs.svg`)
          })
        })
      );
      e.setStyle(
        new Style({
          image: new Icon({
            src: require(`./icons/farm_lbs.svg`)
          })
        })
      );
      lIcon.insertFeatures(s);
      lIcon.insertFeatures(e);
    }

    for (let i = 0; i < list.length; i++) {
      const points = list[i].pointVoList;

      for (let j = 0; j < points.length; j++) {
        const { x, y, lineType: strCur, line } = points[j];
        // 机耕道
        if (list[i].type === 0) {
          road.push(transform([x, y], 'EPSG:32649', 'EPSG:3857'));
        }
        // 田间作业
        if (list[i].type === 1) {
          // 画机耕道
          if (road.length > 0) {
            insertRoad(road);
            road = [];
            // 画作业起止点
            guidePoint(
              transform([points[0].x, points[0].y], 'EPSG:32649', 'EPSG:3857'),
              transform(
                [points[points.length - 1].x, points[points.length - 1].y],
                'EPSG:32649',
                'EPSG:3857'
              )
            );
          }

          // 直线
          if (strCur === 1) {
            // 画曲线
            if (curve.length > 0) {
              let feature = new Feature();
              feature.setGeometry(new LineString(curve));
              feature.setStyle(curveStyle);
              lPath.insertFeatures(feature);
              curve = [];
            }
            straight.push(transform([x, y], 'EPSG:32649', 'EPSG:3857'));
            straightLine = line;
          }

          // 曲线
          if (strCur === 0) {
            // 画直线
            if (straight.length > 0) {
              let feature = new Feature();
              lineNumber(straight[0], straightLine);
              direction(straight[0], straight[1]);
              feature.setGeometry(new LineString(straight));
              feature.setStyle(straightStyle);
              lPath.insertFeatures(feature);
              straight = [];
              straightLine = '';
            }
            curve.push(transform([x, y], 'EPSG:32649', 'EPSG:3857'));
          }
        }
      }
    }

    // 画机耕道
    if (road.length > 0) {
      insertRoad(road);
      road = [];
    }

    // 画曲线
    if (curve.length > 0) {
      let feature = new Feature();
      feature.setGeometry(new LineString(curve));
      feature.setStyle(curveStyle);
      lPath.insertFeatures(feature);
      curve = [];
    }

    // 画直线
    if (straight.length > 0) {
      let feature = new Feature();
      lineNumber(straight[0], straightLine);
      direction(straight[0], straight[1]);
      feature.setGeometry(new LineString(straight));
      feature.setStyle(straightStyle);
      lPath.insertFeatures(feature);
      straight = [];
      straightLine = '';
    }

    // for (let i = 0; i < list.length; i ++) {
    //   const points = list[i].pointXyzList

    //   for (let j = 0; j < points.length; j ++) {
    //     const { x, y, strCur, line } = points[j]
    //     if (list[i].type === 0) {
    //       farm.push(transform([x, y], 'EPSG:32649', 'EPSG:3857'))
    //     } else {
    //       let fFeatrue = new Feature({
    //         geometry: new LineString(farm)
    //       })
    //       fFeatrue.setStyle(
    //         new Style({
    //           stroke: new Stroke({
    //             color: '#B7B7B7',
    //             width: 16,
    //             lineCap: 'butt',
    //           }),
    //         })
    //       )
    //       lPath.insertFeatures(fFeatrue)
    //       farm = []

    //       let point = transform([x, y], 'EPSG:32649', 'EPSG:3857')
    //       temp.push(point)
    //       if (!points[j + 1] || points[j + 1].strCur !== strCur) {
    //         path.push({
    //           strCur,
    //           point: temp,
    //           line
    //         })
    //         temp = []
    //       }
    //     }
    //   }
    // }

    // for (let i = 0; i < path.length; i ++) {
    //   const { strCur, point, line } = path[i]

    //   let feature = new Feature()

    //   if (strCur === 1) {
    //     lineNumber(point[0], line)
    //     direction(point[0], point[1])
    //     feature.setGeometry(new LineString(point))
    //     feature.setStyle(straightStyle)
    //   } else {
    //     feature.setGeometry(new LineString(point))
    //     feature.setStyle(curveStyle)
    //   }
    //   lPath.insertFeatures(feature)
    // }
  };

  IAMap.prototype.dispatchBuffer = function (points: any, id: any, radius: any, isRemove: any) {
    const _this = this;
    const layer = _this.findLayer('dispatch:buffer')
      ? _this.findLayer('dispatch:buffer')
      : _this.insertLayer('dispatch:buffer', { zIndex: 104 });

    layer.setStyle(
      new Style({
        fill: new Fill({
          color: [47, 183, 85, 0.5] // 面颜色
        })
      })
    );

    const linestring = new LineString(points);
    const jstsGeom = _this.$parser.read(linestring);
    const buffered = jstsGeom.buffer(radius);
    const bufferPolygon = _this.$parser.write(buffered);
    const bufferFeature = new Feature({
      geometry: bufferPolygon,
      id
    });
    const vecterSource = layer.getSource();
    if (isRemove) {
      vecterSource.getFeatures().forEach((feature: any) => {
        const fId = feature.getProperties().id;
        if (!isNaN(+id - 1) && fId === +id - 1) {
          vecterSource.removeFeature(feature);
        }
      });
    }
    layer.getSource().addFeature(bufferFeature);
  };

  IAMap.prototype.testBuffer = function () {
    const _this = this;
    const layer = _this.findLayer('dispatch:buffer')
      ? _this.findLayer('dispatch:buffer')
      : _this.insertLayer('dispatch:buffer', { zIndex: 104 });

    layer.setStyle(
      new Style({
        fill: new Fill({
          color: [47, 183, 85, 0.5] // 面颜色
        })
      })
    );
  };
}

function getAngle(first: any, second: any) {
  let y = second[1] - first[1];
  let x = second[0] - first[0];
  let radAngle = Math.atan(y / x);
  if (y <= 0 && x >= 0) {
    //第二象限
    // console.log('第二象限');
    radAngle = -radAngle;
  } else if (x >= 0 && y >= 0) {
    //第一象限
    radAngle = -radAngle;
    // console.log('第一象限');
  } else if (x <= 0 && y >= 0) {
    //第四象限
    radAngle = Math.PI - radAngle;
    // console.log('第四象限');
  } else if (x <= 0 && y <= 0) {
    //第三象限
    radAngle = Math.PI - radAngle;
    // console.log('第三象限');
  }
  return radAngle;
}

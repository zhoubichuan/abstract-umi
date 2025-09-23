import { PREFIX_CLS_BUTTON, PREFIX_CLS_MODAL } from '../constant';
import { ModalFuncProps } from 'antd/lib/modal';

const ignoreKeys = ['defaultProps'];
const modalKeys = ['info', 'success', 'error', 'warning', 'confirm'];

/**
 * Modal.xxx 类型的参数处理
 */
const handleModal = (source:any, target:any, key:any, val:any) => {
  target[key] = (params: ModalFuncProps = {}) => {
    const p = {
      prefixCls: PREFIX_CLS_MODAL,
      width: 480,
      okButtonProps: { prefixCls: PREFIX_CLS_BUTTON, ...params.okButtonProps },
      cancelButtonProps: {
        prefixCls: PREFIX_CLS_BUTTON,
        ...params.cancelButtonProps,
      },
      ...params,
    };
    val.call(source, p);
  };
};

/**
 * 将antd组件上的方法，子组件暴露到目标组件
 * 如：confirm, info, success 等方法挂载到 HljModal 上
 * Form.Item 挂载到 HljForm 上
 */
export const setExportsToComponent = (source:any, target:any) => {
  Object.keys(source).forEach((key) => {
    // val 可能是类组件、方法组件、普通方法、其他未知类型
    const val = source[key];
    if (ignoreKeys.some((i) => i == key)) return;

    if (modalKeys.some((i) => i == key)) {
      handleModal(source, target, key, val);
    } else {
      target[key] = typeof val === 'function' ? val.bind(source) : val;
    }
  });
};

export const omit = (obj: object, fields: string[]) => {
  const copy:any = Object.assign({}, obj);
  for (let i = fields.length - 1; i > -1; i--) {
    delete copy[fields[i]];
  }
  return copy;
};

// 图片路径统一处理
export const imgPath = (path:any, type?:any, width?:any, height?:any, format?:any) => {
  if (path) {
    if (!/http(s)?:\/\//i.test(path)) {
      // 匹配 http:// 或 https://
      path = 'https://' + path;
    }
    if (path.includes('?imageView2')) {
      const p = path.split('?imageView2')[0];
      path = `${p}?`;
    } else if (path.includes('|imageView2')) {
      const p = path.split('|imageView2')[0];
      path = `${p}|`;
    } else {
      path = path.includes('?') ? `${path}|` : `${path}?`;
    }
    path += 'imageView2';
    if (type) {
      path += `/${type}`;
    }
    if (width) {
      path += `/w/${+width}`;
    }
    if (height) {
      path += `/h/${height}`;
    }
    if (format) {
      path += `/format/${format}`;
    }
  }
  return path;
};

// 获取文件大小尺寸等信息
export const checkSize = (item:any, onImageLoaded:any) => {
  const reader = new FileReader();
  reader.onload = (e:any) => {
    const src = e.target.result;
    let image = new Image();
    image.onload = (e) => {
      onImageLoaded(image);
    };
    image.src = src as any;
  };
  reader.readAsDataURL(item);
};

export const checkSizeSync = (item: File) => {
  const image = document.createElement('img');
  image.src = URL.createObjectURL(item);
  return new Promise((resolve, reject) => {
    image.onerror = () => {
      console.error('图片加载失败');
      reject();
    };
    image.onload = () => {
      window.URL.revokeObjectURL(image.src);
      resolve(image);
    };
  });
};

import { transform } from 'ol/proj';
interface Utils {
  transform: Function;
}
let utils: Utils = {
  transform: (point: Array<number>) => transform(point, 'EPSG:4326', 'EPSG:3857'),
};
export default utils;

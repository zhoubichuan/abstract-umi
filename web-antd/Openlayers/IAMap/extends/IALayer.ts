import { Vector as Source } from 'ol/source';
import { Vector as Layer } from 'ol/layer';

export default class IALayer extends Layer<any> {
  constructor(name: any, options: any) {
    const opt = Object.assign(
      {
        _name: name,
        zIndex: 1000,
        source: new Source({
          features: [],
        }),
      },
      options,
    );
    super(opt);
  }

  insertFeatures(Features: any) {
    const source = this.getSource();

    Features && source.addFeature(Features);
    this.setSource(source);
  }
}

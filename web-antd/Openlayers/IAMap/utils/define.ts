export const defineSelect = (features: any, defaultStyleFunc: any, selectStyleFunc: any) => {
  if (Array.isArray(features)) {
    features.forEach((item) => {
      // 初始值
      item._isSelect = false;
      item.isSelect = false;

      // 配置isSelect的get和set
      Object.defineProperty(item, 'isSelect', {
        get() {
          return this._isSelect;
        },
        set(val) {
          if (val) {
            this.setStyle(selectStyleFunc);
          } else {
            this.setStyle(defaultStyleFunc);
          }
          this._isSelect = val;
        }
      });
    });
  } else {
    features._isSelect = false;
    features.isSelect = false;

    // 配置isSelect的get和set
    Object.defineProperty(features, 'isSelect', {
      get() {
        return this._isSelect;
      },
      set(val) {
        if (val) {
          this.setStyle(selectStyleFunc);
        } else {
          this.setStyle(defaultStyleFunc);
        }
        this._isSelect = val;
      }
    });
  }
};

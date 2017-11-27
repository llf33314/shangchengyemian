import Vue from 'vue'
import picker from './picker-custom/index.js';
import comment from './comment-grade/index.js';
import map from './map/src/index';
import material from './source-material/index.js'

const components = [
  picker,
  comment,
  material
];

const install = function(Vue, opts = {}) {

  components.map(component => {
    Vue.component(component.name, component);
  });

  Vue.prototype.$map = map.show;
  Vue.prototype.$material = material.show;

};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: '1.0.0',
  install,
};

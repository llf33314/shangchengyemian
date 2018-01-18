import material from './packages/source-material/index.js'
import transfer from './packages/transfer/index.js'
import wangEditor from './packages/wangEditor/index.js'

const components = [
	transfer,
];

const install = function(Vue, opts = {}) {

  components.map(component => {
    Vue.component(component.name, component);
  });

  Vue.prototype.$material = material.show;

  window.wangEditor = wangEditor;
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

const version = '1.0.0';

export {
	transfer,
}
export default {
    version,
    install,
}

import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';

Vue.use(Vuex);

const loadModules = () => {
  const files = require.context('./modules', false, /\.js$/);
  const modules = files.keys().reduce((all, key) => {
    const _key = key.replace(/(\.\/|\.js)/g, '');
    const _module = files(key).default;
    _module.namespaced = true;
    all[_key] = _module;
    return all;
  }, {});
  return modules;
};

export default new Vuex.Store({
  getters,
  modules: loadModules(),
});

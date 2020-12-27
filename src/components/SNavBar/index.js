import SNavBar from './src/main';

SNavBar.install = function(Vue) {
  Vue.component(SNavBar.name, SNavBar);
};

export default SNavBar;

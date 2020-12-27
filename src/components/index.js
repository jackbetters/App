import Vue from 'vue';

import SNavBar from './SNavBar';
import SFooter from './SFooter';
import SView from './SView';

const components = [SNavBar, SFooter, SView];

const loadComponents = () => {
  components.forEach(item => {
    item.install(Vue);
  });
};

typeof window !== undefined && loadComponents();

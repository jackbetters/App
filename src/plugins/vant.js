import Vue from 'vue';
import { Collapse, CollapseItem, Icon } from 'vant';

const plugin = [Collapse, CollapseItem, Icon];

plugin.forEach(item => {
  Vue.use(item);
});

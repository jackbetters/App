import Vue from 'vue';
import validate from '@/utils/validate'; // 校验类
import utils from '@/utils'; // 校验类
import '@/components'; // 载入项目的公共组件
import '@/styles/index.less'; // 公共样式入口

import './vant'; // 按需加载vant UI

// 工具类
Vue.prototype.$validate = validate;
Vue.prototype.$utils = utils;

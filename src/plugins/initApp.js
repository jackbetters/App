/* h5应用初始化 */
import { getUrlParam } from '@/utils/base';
import store from '@/store';

// 客户端环境检查
const u = navigator.userAgent;
const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
// const isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

const outlinkParam = getUrlParam('outlink');

const isOutlink = () => (outlinkParam && outlinkParam === '1' ? true : false);

const initApp = ({ needVConsole = false, isH5 = false } = {}, loginParam = {}) => {
  // 动态加载vconsole, 减小打包体积
  needVConsole && import('vconsole').then(v => new v.default());

  return new Promise((resolve, reject) => {
    // 检查是否为外链，如果是则跳过授权直接返回
    if (isOutlink()) {
      return resolve({ isOutlink: false });
    }
    if (isH5) {
      window.APP_PLATFORM = isAndroid ? 'android' : 'ios';
      setTimeout(
        async () => {
          const { status } = await store.dispatch('user/getAuth', { isH5, ...loginParam });
          return status ? resolve() : reject();
        },
        isAndroid ? 300 : 0
      );
    }
  });
};

export default initApp;

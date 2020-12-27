import router, { constantRoutes } from '@/router';
import store from '@/store';

const whiteList = constantRoutes.map(item => item.path); // no redirect whitelist

router.beforeEach((to, from, next) => {
  const hasToken = !!store.getters['token'];
  const isWhiteList = whiteList.indexOf(to.path) !== -1;
  // if (hasToken || isWhiteList) {
  //   next();
  // } else {
  //   next(`/401?redirect=${to.path}`);
  // }
  next(hasToken || isWhiteList ? undefined : `/401?redirect=${to.path}`);
});

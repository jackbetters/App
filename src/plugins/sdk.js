/* 原生sdk（ios/android）回调 */

import callApp from './callApp';
import { Toast } from 'vant';

//判断终端类型
const u = navigator.userAgent;
export const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
export const isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

/**
 * Android/iOS SDK调用方式（相同）,且传参方式一致时直接使用
 * @param {String} name 调用的原生方法名称
 * @param {Object} args 要传给原生的参数
 */
const callSDK = (name, args) =>
  new Promise((resolve, reject) => {
    const _resHandler = res => {
      const _res = typeof res == 'string' ? JSON.parse(res) : res;
      _res.status === 1 ? resolve(_res.data) : reject(_res.msg || 'SDK调用失败');
    };
    try {
      callApp(bridge => {
        bridge.callHandler(name, args || {}, _resHandler);
      });
    } catch (err) {
      Toast('SDK调用失败');
      reject(err);
    }
  });

/**
 * Android/iOS SDK调用方式（不同）,且传参方式一致时直接使用
 * @param {String} name 调用的原生方法名称
 * @param {Object | ...rest} args 要传给原生的参数
 */
const callScriptSDK = (name, ...args) => {
  if (isAndroid) {
    return new Promise((resolve, reject) => {
      const _resHandler = res => {
        const _res = typeof res == 'string' ? JSON.parse(res) : res;
        _res.status === 1 ? resolve(_res.data) : reject(_res.msg || 'SDK调用失败');
      };
      try {
        if (window.SLScript[name]) {
          args && args.length > 0
            ? window.SLScript[name](...args, _resHandler)
            : window.SLScript[name](_resHandler);
        }
      } catch (err) {
        Toast('SDK调用失败');
        reject(err);
      }
    });
  } else {
    return callSDK(name, ...args);
  }
};

//  Android/iOS SDK调用方式（不同）,且传参方式（不一致）时,使用示例：
/* 
// 微信分享
const shareWechat= (params = { title, content, toUrl, imgUrl, platform }) =>
 isAndroid
  ? callScriptSDK('slUmShareCallback', title, content, toUrl, imgUrl, platform)
  : callSDK('slUmShareCallback', params) 
*/

/**
 * 获取token
 * @param {String} businessClass 业务线
 */
export const getToken = ({ businessClass = 'XSC' } = {}) =>
  callSDK('getUserTokenCallback', { businessClass });

/**
 * 刷新token
 * @param {String} businessClass 业务线
 */
export const refreshToken = ({ businessClass = 'XSC' } = {}) =>
  callSDK('refreshRelatives', { businessClass });

/**
 * 获取用户信息
 * @param {String} businessClass 业务线
 */
export const getUserInfo = ({ businessClass = 'XSC' } = {}) =>
  callSDK('getUserInfoCallback', { businessClass });

const SDK = {
  getToken /* 获取token */,
  refreshToken /* 刷新token */,
  getUserInfo /* 获取用户信息 */,
  exitApp: () => callScriptSDK('slFinish') /* 关闭webview */,
  platformBack: () => callSDK('platformBack') /* 回退上一步（返回上一页） */,
  goLogin: () => callSDK('goNativeLoginCallback') /* 跳转app登录页 */,

  /**
   * 微信分享
   * @param {String} title
   * @param {String} content
   * @param {String} url
   * @param {String} imageUrl
   * @param {String} platform
   */
  shareWechat: ({ title = '', content = '', toUrl = '', imgUrl = '', platform = '' } = {}) =>
    isAndroid
      ? callScriptSDK('slUmShareCallback', title, content, toUrl, imgUrl, platform)
      : callSDK('slUmShareCallback', { title, content, toUrl, imgUrl, platform }),

  /**
   * 从相册选择视频
   * @param {Number} maxNum 最多选择的数量
   */
  ChooseVideo: ({ maxNum = 1, duration = 30000 } = {}) =>
    isAndroid
      ? callScriptSDK('slChooseVideos', maxNum)
      : callSDK('slChooseVideos', { maxNum, duration }),

  /**
   * 保存图片到本地
   * @param {String} picUrl 图片地址
   */
  SavePhoto: ({ picUrl = '' } = {}) =>
    isAndroid
      ? callScriptSDK('slSavePhotoCallback', picUrl)
      : callSDK('slSavePhotoCallback', { picUrl }),

  /**
   * 下载文件
   * @param {String} fileUrl 文件地址
   */
  platformDownloadFile: ({ fileUrl = '' } = {}) => callSDK('platformDownloadFile', { fileUrl }),

  /**
   * 上传视频(返回视频路径)
   * @param {String} path 文件地址
   * @param {String} token 授权token
   * @param {String} maxDuration 最大播放时长
   */
  getFileUrlByPath: ({ path = '', token = '', maxDuration = 30000 } = {}) =>
    callSDK('getFileUrlByPath', { path, token, maxDuration }),

  /**
   * 上传图片
   * @param {Number} maxNum 最大上传个数
   */
  ChoosePicture: ({ maxNum = 1 } = {}) =>
    isAndroid
      ? callScriptSDK('slSavePhotoCallback', maxNum)
      : callSDK('slSavePhotoCallback', { maxNum }),

  /**
   * 获取通讯录
   */
  getContacts: () =>
    isAndroid ? callScriptSDK('slGetContactsCallback') : callSDK('slSavePhotoCallback'),

  /**
   * 跳转微信小程序
   */
  jumpWXMiniProgress: ({ path = '', wxMiniId = 'gh_2793a8e526ea' } = {}) =>
    callSDK('getWXMiniProgress', { path, wxMiniId }),

  /**
   * 打开一个新的webview
   * @param {String} packageName H5包名称
   * @param {String} title 页面名称
   * @param {String} url  跳转的地址 0:H5外链必传
   * @param {String} route   路由 1：本地加载。必传:#/me.必须带井号
   * @param {Number} style 0= 隐藏导航栏； 1=显示返回按钮（逐级返回）+X（关闭按钮）；2=显示返回按钮（逐级返回），隐藏X（关闭按钮）；3=隐藏返回按钮，显示X（关闭按钮）
   * @param {Number} loadType 0:H5外链， 1：本地加载。 默认0
   */
  openWebWindow: ({
    title = '',
    url = '',
    style = 0,
    route = '',
    loadType = 1,
    packageName = 'com.bonade.h5.xxf.welfare',
  } = {}) => callSDK('openWebWindowCallback', { title, url, style, route, loadType, packageName }),

  /**
   * H5页面通知滚动事件给原生
   */
  scrollToValue: ({ value = 0 } = {}) => callSDK('scrollToValue', { value }),

  /**
   * H5页面通知刷新页面缓存历史给原生（用于返回时跳转到该页面）
   * @param {String} hpage 要刷新的页面
   */
  refreshRelatives: ({ hpage = 'familyCare' } = {}) => callSDK('refreshRelatives', { hpage }),
};

export default SDK;

import base from './base'; /* 基础工具类 */
import imgUtil from './imgUtil'; /* 图片处理类 */
import treeUtil from './treeUtil'; /* 树状数据处理 */
import dateTime from './dateTime'; /* 日期事件操作 */
import { setLocal, getLocal, removeLocal, createCache } from './localStore'; /* localStroage操作 */
import { setCookie, getCookie, removeCookie } from './cookie'; /* cookie操作 */
import { setSession, getSession, removeSession } from './sessionStore'; /* sessionStroage操作 */
import debounce from './debounce'; /* 防抖 */
import throttle from './throttle'; /* 节流 */

export default {
  ...base,
  /* 图片处理类 */
  Img: imgUtil,
  /* 树状数据处理 */
  Tree: treeUtil,
  /* 日期处理 */
  DateTime: dateTime,
  /* 节流，防抖 */
  debounce,
  throttle,
  /* 缓存操作 */
  setLocal,
  getLocal,
  removeLocal,
  createCache,
  setSession,
  getSession,
  removeSession,
  setCookie,
  getCookie,
  removeCookie,
};

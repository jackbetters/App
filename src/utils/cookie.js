import Cookies from 'js-cookie';

export function getCookie(key) {
  const value = Cookies.get(key);
  return typeof value === 'string' ? value : '';
}

export function setCookie(key, value, opt = { expires: 1 }) {
  return Cookies.set(key, typeof value === 'string' ? value : '', opt);
}

export function removeCookie(key) {
  return Cookies.remove(key);
}

export default {
  get: getCookie,
  set: setCookie,
  remove: removeCookie,
};

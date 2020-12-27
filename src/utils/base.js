import JSEncrypt from 'jsencrypt';

/* 函数柯里化的简单实现 */
export function curry(func, args = []) {
  const arity = func.length;
  return (...other) => {
    const _args = [...other, ...args];
    // 如果参数个数小于最初的func.length，则递归调用，继续收集参数
    if (_args.length < arity) {
      return curry.call(this, func, _args);
    }
    // 参数收集完毕，则执行func
    return func.apply(this, _args);
  };
}

/* 偏函数：用于提前预置参数 */
export function partial(fn, ...args) {
  return (...partials) => {
    let [i, j] = [0, 0];
    for (; i < args.length && j < partials.length; i++) {
      if (args[i] === undefined) {
        args[i] = partials[j++];
      }
    }
    return fn.apply(null, args);
  };
}

/* 延迟执行，自定义延时时间 */
export const delay = partial(setTimeout, undefined, undefined);

/* 延迟执行 */
export const defer = partial(setTimeout, undefined, 0);

/* 转换为json字符串 */
export const toJson = partial(JSON.stringify, undefined);

/* 格式化输出json字符串 */
export const prettyJson = partial(JSON.stringify, undefined, null, 2);

/* 深拷贝 */
export function deepClone(values) {
  let copy;

  if (values === null || typeof values !== 'object') return values;

  if (values instanceof Date) {
    copy = new Date();
    copy.setTime(values.getTime());
    return copy;
  }

  if (values instanceof Array) {
    copy = [];
    for (let i = 0, len = values.length; i < len; i++) {
      copy[i] = deepClone(values[i]);
    }
    return copy;
  }

  // Handle Object
  if (values instanceof Object) {
    copy = {};
    for (const attr in values) {
      if (Object.prototype.hasOwnProperty.call(values, attr)) {
        copy[attr] = deepClone(values[attr]);
      }
    }
    return copy;
  }
}

/* 生成UUID（36位） */
export function makeUUID(length = 36) {
  const s = [];
  const str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  for (let i = 0; i < length; i += 1) {
    s[i] = str.charAt(Math.floor(Math.random() * str.length));
  }
  [8, 13, 18, 23].forEach(n => {
    s[n] = '-';
  });
  return s.join('');
}

/* 随机数 */
export function random(m = 1, n = 10) {
  return Math.floor(Math.random() * (m - n) + n);
}

/*  AES 加密单个 */
export function encrypt(str) {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCelcIWD6kCmTsgHhWeOkRl8vyuzzcMXdhxFM+RrTS/D72Gitzf5MI6h/6CTPjUMtDedRSHYbngzjAmBLjbHrzB1TY6T9ze+5z4ijNWr66R6St//AqzdFO2/nrswCpGM3RlFMq4/m+ovfRlwbPe0pcgWbafCDcXKqieVq9PjGK/ewIDAQAB'
  );
  return encrypt.encrypt(str);
}

/* url参数解析 */
export function getUrlParam(name) {
  const url = decodeURI(window.location.href);
  const reg = new RegExp('[?&]' + name + '=([^&#]*)', 'i');
  const res = url.match(reg);
  return res && res.length > 1 ? res[1] : '';
}

export function getUrlParams() {
  const url = decodeURI(window.location.href);
  return (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (a, v) => ((a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a),
    {}
  );
}

/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
export function debounce(func, wait, immediate) {
  let timeout;
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function');
  }
  return function() {
    const context = this;
    const args = [...arguments];
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      const callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow) func.apply(context, args);
    } else {
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    }
  };
}

/* 节流 */
export function throttle(func, wait) {
  let timeout;
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function');
  }
  return function() {
    let context = this;
    let args = arguments;
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args);
      }, wait);
    }
  };
}

export default {
  curry,
  partial,
  delay,
  defer,
  toJson,
  prettyJson,
  makeUUID,
  random,
  // debounce,
  // throttle,
  getUrlParam,
  getUrlParams,
};

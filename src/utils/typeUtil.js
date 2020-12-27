import { curry } from './base';

/* 获取数据类型 */
export function getType(data) {
  const TypeMap = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
  };
  return TypeMap[Object.prototype.toString.call(data)];
}

/* 类型匹配 */
export function matchType(data, typeStr) {
  return getType(data) === typeStr;
}

/* 柯里化的类型匹配方法 */
export const matchTypeCurry = curry(matchType);

export const isBoolean = matchTypeCurry('boolean');
export const isNumber = matchTypeCurry('number');
export const isString = matchTypeCurry('string');
export const isFunction = matchTypeCurry('function');
export const isArray = matchTypeCurry('array');
export const isDate = matchTypeCurry('date');
export const isRegExp = matchTypeCurry('regExp');
export const isUndefined = matchTypeCurry('undefined');
export const isNull = matchTypeCurry('null');
export const isObject = matchTypeCurry('object');

import { curry } from './base';

/* 返回正则test方法判断结果 */
function matchReg(str, reg) {
  return reg.test(str);
}
/* 柯里化的test方法 */
export const matchRegCurry = curry(matchReg);

/* 校验邮箱 */
export const isEmail = matchRegCurry(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);

/* 校验是否是邮编 */
export const isPostalCode = matchRegCurry(
  /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])d{4}$/
);

/* 校验座机号 */
export const isPhone = matchRegCurry(/^(0\d{2}-\d{8}|0\d{3}-\d{7,8})$/);

/* 校验手机号 */
export const isMobile = matchRegCurry(/^1[35789]\d{9}$/);

// /* 校验身份证 */
// export const isCardID = matchRegCurry(
//   /(^d{8}(0d|10|11|12)([0-2]d|30|31)d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/
// );

/* 校验身份证 */
export const isCardID = matchRegCurry(
  /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
);

/* 校验是否为中文 */
export const isChina = matchRegCurry(/^[\u4E00-\u9FA5]{2,4}$/);

/* 校验是否是URL */
export const isUrl = matchRegCurry(
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/
);

/* 校验是否是视频 */
export const isVideo = matchRegCurry(
  /^https?:\/\/.*?(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp4)$/i
);

/* 校验是否是图片 */
export const isImg = matchRegCurry(/^https?:\/\/.*?(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif)$/i);

/* 是不是营业执照（图片） */
export const isCertificateImg = matchRegCurry(/^.*\.(gif|png|jpg|jpeg|bmp)$/i);

/* 校验是否是密码：6-20位的字母数字下划线 */
export const isPassword = matchRegCurry(/^\w{6,20}$/);

/* 校验是否是ipv4 */
export const isIPv4 = matchRegCurry(
  /^(?:(?:25[0-5]|20-4|[01]?0-9?).){3}(?:25[0-5]|20-4|[01]?0-9?)$/
);

/* 校验是否是QQ */
export const isQQ = matchRegCurry(/^1-9{4,10}$/);

/* 校验是否是微信 */
export const isWX = matchRegCurry(/^a-zA-Z{5,19}$/);

/* 校验是否是金钱（正数，最多包含两位小数） */
export const isMoney = matchRegCurry(/^\d+(.\d{0,2})?$/);

/* 是否是execl文件 */
export const isExcel = matchRegCurry(/^.*\.(xls|xlsx)$/i);

/*只能输入数字和 “-”*/
export const numberAndSpecial = matchRegCurry(/^[0-9\-]*$/);

/*只能输入数字*/
export const isNumber = matchRegCurry(/^[0-9]*$/);

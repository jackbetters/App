/**
 * 预加载图片
 * @param {Array} images 图片地址
 */
export function preloadImg(images = []) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(images) || !images.length) {
      return reject();
    }
    const loaded = [];
    const push = src => {
      loaded.push(src);
      if (loaded.length >= images.length) {
        resolve(loaded);
      }
    };
    images.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = () => push(src);
      img.onerror = () => {
        console.error(`图片加载失败：${img.src}`);
        push(src);
      };
    });
  });
}

/**
 * @description: 获取本地图片文件尺寸
 * @param {File} file
 * @return: Promise<{widh: string, height: string}>
 */
export function imgInfo(file) {
  return new Promise(resolve => {
    if (!file) return resolve(null); // 没有选择图片，直接return
    if (!/^image\/[jpeg|png|jpg|gif|svg|ico]/gi.test(file.type)) {
      console.error('文件类型不是图片');
      return resolve(null);
    }

    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const { width, height } = img;
      resolve({
        width,
        height,
      });
    };
    img.onerror = () => resolve(null);
  });
}

export default {
  preload: preloadImg,
  info: imgInfo,
};

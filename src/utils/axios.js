import axios from 'axios';
import store from '@/store';
import { Toast } from 'vant';
import contentDisposition from 'content-disposition';

const baseURL = '';
const timeout = 3000;
const successCode = [200];
const downloadTypes = [
  'application/octet-stream',
  'application/msexcel',
  'application/vnd.ms-excel',
];

const getDownloadFilename = disposition => {
  let filename = '';
  try {
    const _disposition = contentDisposition.parse(disposition);
    if (_disposition && _disposition.parameters) {
      filename = _disposition.parameters.filename;
    }
  } catch (error) {}
  return filename;
};

const showErrorMsg = (message = '请求异常') => {
  Toast(message);
};

const handleErrorCode = (status, code, msg) => {
  showErrorMsg(msg || `请求${status}异常: {code: ${code}}`);
};

const useInterceptors = instance => {
  instance.interceptors.request.use(
    config => {
      config.headers['Authorization'] = store.getters['token'] || ''; // 接口授权
      return config;
    },
    error => Promise.reject(error)
  );

  instance.interceptors.response.use(
    async response => {
      const { status, data, config, headers } = response;
      const contentType = headers['content-type'];

      // 接口200正常返回
      if (status === 200) {
        if (data.status && !successCode.includes(data.status)) {
          handleErrorCode(status, data.status, data.message);
        }
        // 判断是不是文件下载
        const disposition = headers['content-disposition'];
        if (disposition && downloadTypes.some(type => contentType.includes(type))) {
          return Promise.resolve({ data, filename: getDownloadFilename(disposition) });
        }
        // 其它情况：不做处理直接返回data
        return Promise.resolve(data);
      }

      // 接口调用异常
      console.error(
        '请求异常：' +
          JSON.stringify({ url: config.url, status: data.status || status, msg: data.message })
      );
      showErrorMsg();
      return Promise.reject();
    },
    error => {
      const { response, message } = error;
      const { status = 0, data = {} } = response || {};
      if ('message' in data) {
        handleErrorCode(status, data.status || status, data.message);
        return Promise.reject(error);
      }
      const convertMsg = message => {
        if (message.includes('Network Error')) {
          return '后端接口连接异常';
        }
        if (message.includes('timeout')) {
          return '后端接口请求超时';
        }
        if (message.includes('Request failed with status code')) {
          const code = message.substr(message.length - 3);
          return '后端接口' + code + '异常';
        }
        return '后端接口未知异常';
      };
      showErrorMsg(convertMsg(message));
      return Promise.reject(error);
    }
  );
};

export const request = options => {
  const instance = axios.create({
    baseURL,
    timeout,
    headers: {
      'Content-Type': 'application/json;chareset=UTF-8',
    },
  });
  useInterceptors(instance);
  return instance(options);
};

// 扩充request的请求方式
function extendRequest(request) {
  const otherMethods = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch'].reduce(
    (all, name) => {
      const fn = (url, data, config) =>
        request({
          url,
          method: name.toUpperCase(),
          [name.startsWith('p') ? 'data' : 'params']: data,
          ...config,
        });
      return { ...all, [name]: fn };
    },
    {}
  );
  const upload = (url, data, config) =>
    request({
      url,
      method: 'POST',
      data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      ...config,
    });
  return {
    request,
    ...otherMethods,
    upload,
  };
}

export default extendRequest(request);

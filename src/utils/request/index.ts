import axios from "axios";
import qs from "qs";

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { methodsEnum } from "./enum";
import { failedRequest, errorResponse } from "./error";
import type { Pedding, RequestHandle } from "./type";

const axiosInstance: AxiosInstance = axios.create();
const pending: Array<Pedding> = []; // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
const removePending = (config: AxiosRequestConfig) => {
  for (const p in pending) {
    if (pending[p].conf === config.url + "&" + config.method) {
      // 当当前请求在数组中存在时执行函数体
      pending[p].func(); // 执行取消操作
      pending.splice(Number(p), 1); // 把这条记录从数组中移除
    }
  }
};

const CancelToken = axios.CancelToken;
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    removePending(config); // 在一个ajax发送前执行一下取消操作
    config.withCredentials = true; // 跨域请求时发送Cookie
    config.cancelToken = new CancelToken((c) => {
      pending.push({ conf: config.url + "&" + config.method, func: c });
    });
    if (
      config.url &&
      config.headers &&
      config.url.indexOf("https:") == -1 &&
      config.url.indexOf("http:") == -1
    ) {
      // token处理
      // const accountStore = useAccountStore();
      const accountStore = {
        token: "",
      };
      const token = accountStore.token;
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 全局响应拦截器
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    removePending(response.config); // 在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
    return response;
  },
  (error) => {
    return Promise.reject(error);
    // return { data: error }  // 返回一个空对象，主要是防止控制台报错
  }
);

// URL接口地址参数拼接
const parseUrlParams = (url: string, data) => {
  // 使用$$做为定界符
  return url.replace(/(\$(\w*?)\$)/g, function (match, full, n1) {
    if (full === "$$") {
      return data;
    } else if (data[n1] !== undefined) {
      const rs = data[n1];
      delete data[n1];
      return rs;
    }
    return full;
  });
};
// 请求头配置
const headersConfig = (method) => {
  const header = {
    json: {
      "Content-Type": "application/json",
    },
    post: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    upload: {
      "Content-Type": "multipart/form-data",
    },
  };
  return header[method] || {};
};

// 其他请求配置项
const otherConfig = (method, cb?) => {
  const other = {
    download: {
      responseType: "blob",
    },
    upload: {
      onUploadProgress: (progressEvent: any) => {
        if (cb) {
          cb(progressEvent);
        }
      },
    },
    post: {
      transformRequest: [
        function (data) {
          return qs.stringify(data, { arrayFormat: "repeat" });
        },
      ],
    },
  };
  return other[method] || {};
};

// 请求配置
const requestConfig: RequestHandle<any> = (api, data, cb?) => {
  const method = api.method.toLocaleLowerCase();
  const url = parseUrlParams(api.url, data);
  return {
    method: methodsEnum[method],
    url: url,
    data,
    timeout: 15 * 1000,
    headers: headersConfig(method),
    ...otherConfig(method, cb),
  };
};

const requestControl: RequestHandle<Promise<any>> = (api, data, cb?) => {
  return new Promise((resolve, reject) => {
    axiosInstance(requestConfig(api, data, cb))
      .then((res) => {
        if (res.data.code === 0) {
          resolve(res.data.data);
        } else {
          errorResponse(res, reject);
        }
      })
      .catch((err) => {
        failedRequest(err, reject);
      });
  });
};

export default requestControl;

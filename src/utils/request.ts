import axios from 'axios';
import type { AxiosRequestConfig, AxiosError } from 'axios';
// import store from '@/store';
import notification from 'ant-design-vue/es/notification';
import message from 'ant-design-vue/es/message';
import { Storage, ACCESS_TOKEN } from '@/utils/Storage';

// 创建 axios 实例
const service = axios.create({
  // API 请求的默认前缀
  baseURL: '',
});

// 异常拦截处理器
const errorHandler = (error: AxiosError) => {
  if (error.response) {
    if (error.response.status === 403) {
      notification.error({
        message: '错误',
        description: '用户登录有效期已过时',
      });
      // store.dispatch('user/Logout').then(() => {
      //   setTimeout(() => {
      //     window.location.reload();
      //   }, 1500);
      // });
    }
    if (error.response.status === 500) {
      message.error('服务器异常，请稍后再试');
    }
  }
  return Promise.reject(error);
};

// request interceptor
service.interceptors.request.use(config => {
  if (!navigator.onLine) {
    message.error('服务器异常，请稍后再试');
    return {};
  }
  const token = Storage.get(ACCESS_TOKEN);
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token && config.headers) {
    config.headers['Authorization'] = 'JWT ' + token;
  }
  return config;
}, errorHandler);

// response interceptor
service.interceptors.response.use(response => {
  const res = response;
  return res;
}, errorHandler);

const request = async <T = any>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const res = await service.request(config);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default request;

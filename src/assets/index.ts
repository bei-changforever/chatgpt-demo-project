import Axios from 'axios'
import { showLoadingToast, closeToast, Toast  } from 'vant';
const http = Axios.create({
    baseURL: 'xxxxxxxx',
 
})

http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    showLoadingToast({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
        className: 'particulars-detail-popup',
        duration: 30000,
    })
    return config;
}, function (error) {
    closeToast()
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    closeToast()
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    closeToast()
  
    return Promise.reject(error);
});

export default http
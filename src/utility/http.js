import axios from 'axios'
import { Promise } from 'core-js'
import server from './env'
import {Message} from 'element-ui'
import router from '../router'
axios.defaults.baseURL = server
axios.defaults.timeout = 10 * 1000
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8;'

// 请求拦截器
axios.interceptors.request.use(
    config => {
        // Do something before request is sent
        // console.log("请求拦截器")
        // console.log(config)
        var user = sessionStorage.getItem("user")
        if (user != null) {
            var token = JSON.parse(user).token
            if (token != null) {
                config.headers.Authorization = "Bearer " + token;
            }
        }
        return config;
    },
    error => {
        // console.log("请求拦截器")
        // console.log(error)
        // Do something with request error
        return Promise.reject(error);
    });

// 响应拦截器
axios.interceptors.response.use(
    response => {
        // console.log("响应拦截器")
        // console.log(response)
        if (response.status === 200) {
            return response.data
        }
    },
    error => {
        console.log("响应拦截器error")
        console.log(error.response.status)
        switch (error.response.status) {
            case 400:
                Message.error("请你好好想想是不是填错了什么")
                break
            case 401:
                Message.error("请先登录哦")
                sessionStorage.removeItem("user")
                router.replace("/login")
                
                break
            case 403:
                Message.error("登陆过期，请重新登录")
                sessionStorage.removeItem("user")
                router.replace("/login")
                break
            case 404:
                Message.error("好像出错了哦")
                break
            default:
                Message.error("网络出错")
        }
        // Do something with response error
        return Promise.reject(error);
    });
//get方法
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}
//post方法
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}
//delete方法
export function del(url, params) {
    return new Promise((resolve, reject) => {
        axios.delete(url, { params: params })
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}
//put方法
export function put(url, params) {
    return new Promise((resolve, reject) => {
        axios.put(url, params)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}
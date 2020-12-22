import axios from 'axios'
import { Promise } from 'core-js'
// import router from '../router'
import server from './env'
axios.defaults.baseURL = server
axios.defaults.timeout = 5 * 1000
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8;'

// 请求拦截器
axios.interceptors.request.use(
    config => {
        // Do something before request is sent
        console.log("请求拦截器")
        console.log(config)
        if (config.method === "post" || config.method === "put" || config.method === "delete") {
            var user = sessionStorage.getItem("user")
            if (user != null) {
                var token = JSON.parse(user).token
                if (token != null) {
                    config.headers.Authorization = "Bearer " + token;
                }
            }
        }
        return config;
    },
    error => {
        console.log("请求拦截器")
        console.log(error)
        // Do something with request error
        return Promise.reject(error);
    });

// 响应拦截器
axios.interceptors.response.use(
    response => {
        console.log("响应拦截器")
        console.log(response)
        if (response.status === 200) {
            return response.data
        }
    },
    error => {
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
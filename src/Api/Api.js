
import Base from './Base';
import { createContext } from "react";

/**
 * [封裝fetch api GET方法]
 * @param {*} requireURL 
 * @returns 
 */
export function getApi(requireURL) {
    return new Promise((reslove, reject) => {
        fetch(Base.baseUrl+requireURL, {
            headers: {
                'Content-Type': 'application/json',
                // "X-CSRF-Token": csrfToken
            },
            method: 'get'
        }).then((res) => reslove(res.json())).catch((err) => reslove(err))
    });
}
/**
 * [封裝fetch api POST方法]
 * @param {*} requireURL 
 * @param {*} datax 
 * @returns 
 */
export function postApi(requireURL, datax = null) {
    var data = {
            data: JSON.stringify(datax)
        };
    return new Promise((reslove, reject) => {
        fetch(Base.baseUrl+requireURL, {
            headers: {
                'Content-Type': 'application/json',
                // "X-CSRF-Token": csrfToken
            },
            method: 'post',
            body: JSON.stringify(data)
        }).then((res) => reslove(res.json())).catch((err) => reslove(err))
    })
}
/**
 * [封裝fetch api post 呼叫api時header帶token]
 * @param {*api address} requireURL 
 * @param {*token} token 
 * @param {*data} data 
 * @returns 
 */
export function tokenPostApi(requireURL,datax = null){
    // var data = {
    //     data: JSON.stringify(datax)
    // };

    return new Promise((reslove, reject) => {
        fetch(Base.baseUrl+requireURL, {
            headers: { 
                // 'Content-Type': 'multipart/form-data',
            // "X-CSRF-Token": csrfToken
            authorization: `Bearer ${getAuthToken()}`, },
            method: 'post',
            body: datax
        }).then((res) => reslove(res.json())).catch((err) => reslove(err))
    })
}
/**
 * [封裝fetch api get 呼叫api時header帶token]
 * @param {*api address} requireURL 
 * @param {*token} token 
 * @param {*data} data 
 * @returns 
 */
 export function tokenGetApi(requireURL){
    return new Promise((reslove, reject) => {
        fetch(Base.baseUrl+requireURL, {
            headers: {
                'Content-Type': 'application/json',
                // "X-CSRF-Token": csrfToken
                authorization: `Bearer ${getAuthToken()}`,
            },
            method: 'get',
        }).then((res) => reslove(res.json())).catch((err) => reslove(err))
    })
}

// 身分驗證
export function getMe(){
    // 從 localStorage 讀取 token
    const token = getAuthToken();
    return new Promise((reslove, reject) => {
        fetch(Base.baseUrl+"auth/me", {
            headers: {
                authorization: `Bearer ${token}`,
            },
            method: 'post',
        }).then((res) => reslove(res.json())).catch((err) => reslove(err))
    })  
  };
/**
 * [token 前綴]
 */
const TOKEN_NAME = "token";
/**
 * [將 token 存到 localStorage]
 * @param {*token} token 
 */

export const setAuthToken = (token) => {
  localStorage.setItem(TOKEN_NAME, token);
};
/**
 * [從 localStorage 讀取 token]
 * @returns token
 */
export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_NAME);
};
export const setLocalStorage=(k,v)=>{
    localStorage.setItem(k, v);
}
export const getLocalStorage = (k) => {
    return localStorage.getItem(k);
  };
/**
 * []
 */
export const AuthContext = createContext(null);
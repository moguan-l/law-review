import request from '../utils/request';
import {baseURL} from '../config/index';

/**
 * 登录
 * @param data
 * @returns {*}
 */
export const login = data => {
    return request({url: `${baseURL}`, data})
};
/**
 * 获取城市列表
 * @returns {*}
 */
export const getCities = () => {
    return request({url: `${baseURL}`})
};
/**
 * 发送验证码
 * @param data
 * @returns {*}
 */
export const sendVerify = data => {
    return request({url: `${baseURL}`, data})
};
/**
 * 注册
 * @param data
 * @returns {*}
 */
export const register = data => {
    return request({url: `${baseURL}`, data})
};
/**
 * 修改密码
 * @param data
 * @returns {*}
 */
export const resetPassword = data => {
    return request({url: `${baseURL}`, data})
};
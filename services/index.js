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
/**
 * 完善个人资料
 * @param data
 * @returns {*}
 */
export const userUpdate = data => {
    return request({method: 'POST', url: `${baseURL}`, data})
};
/**
 * 我的任务
 * @param data
 * @returns {*}
 */
export const queryNotify = data => {
    return request({url: `${baseURL}`, data})
};
/**
 * 违法拍
 * @param data
 * @returns {*}
 */
export const eventUpload = data => {
    return request({method: 'POST', url: `${baseURL}`, data})
};
/**
 * 上传记录
 * @param data
 * @returns {*}
 */
export const queryEventHistory = data => {
    return request({url: `${baseURL}`, data})
};
/**
 * 我的积分
 * @param data
 * @returns {*}
 */
export const userRealPoint = data => {
    return request({url: `${baseURL}`, data})
};
/**
 * 积分明细
 * @param data
 * @returns {*}
 */
export const queryUserPoint = data => {
    return request({url: `${baseURL}`, data})
};
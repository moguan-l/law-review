import request from '../utils/request';
import {API} from '../config/index';

/**
 * 登录
 * @param data
 * @returns {*}
 */
export const login = data => {
    return request({method: 'POST', url: API.login, data})
};
/**
 * 获取城市列表
 * @returns {*}
 */
export const getCityList = () => {
    return request({method: 'POST', url: API.getCityList, data: {pageNum: 1, pageSize: 9999}})
};
/**
 * 发送验证码
 * @param data
 * @returns {*}
 */
export const sendVerify = data => {
    return request({method: 'POST', url: API.sendVerify, data})
};
/**
 * 注册
 * @param data
 * @returns {*}
 */
export const register = data => {
    return request({method: 'POST', url: API.register, data})
};
/**
 * 修改密码
 * @param data
 * @returns {*}
 */
export const resetPassword = data => {
    return request({method: 'POST', url: API.resetPassword, data: {type: 1, ...data}})
};
/**
 * 获取用户信息
 * @param data
 * @returns {*}
 */
export const getUserDetail = data => {
    return request({method: 'POST', url: API.getUserDetail, data})
};
/**
 * 完善个人资料
 * @param data
 * @returns {*}
 */
export const userUpdate = data => {
    return request({method: 'POST', url: API.userUpdate, data})
};
/**
 * 我的任务
 * @param data
 * @returns {*}
 */
export const queryNotify = data => {
    return request({method: 'POST', url: API.queryNotify, data})
};
/**
 * 获取违规模板列表
 * @returns {*}
 */
export const queryTemplate = () => {
    return request({method: 'POST', url: API.queryTemplate})
};
/**
 * 违法拍
 * @param data
 * @returns {*}
 */
export const eventUpload = data => {
    return request({method: 'POST', url: API.eventUpload, data})
};
/**
 * 上传记录
 * @param data
 * @returns {*}
 */
export const queryEventHistory = data => {
    return request({method: 'POST', url: API.queryEventHistory, data})
};
/**
 * 我的积分
 * @param data
 * @returns {*}
 */
export const userRealPoint = data => {
    return request({method: 'POST', url: API.userRealPoint, data})
};
/**
 * 积分明细
 * @param data
 * @returns {*}
 */
export const queryUserPoint = data => {
    return request({method: 'POST', url: API.queryUserPoint, data})
};
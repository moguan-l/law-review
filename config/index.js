/**
 * 接口域名
 * @type {string}
 */
const baseURL = 'https://www.pohou.com';
/**
 * 接口地址
 * @type {{login: string, getCityList: string, sendVerify: string, register: string, resetPassword: string, getUserDetail: string, userUpdate: string, queryNotify: string, queryTemplate: string, eventUpload: string, queryEventHistory: string, userRealPoint: string, queryUserPoint: string}}
 */
export const API = {
    login: `${baseURL}/api/user/manage/login`,
    getCityList: `${baseURL}/api/user/base/getCityList`,
    sendVerify: `${baseURL}/api/user/base/sendVerify`,
    register: `${baseURL}/api/user/manage/register`,
    resetPassword: `${baseURL}/api/user/manage/resetPassword`,
    getUserDetail: `${baseURL}/api/user/manage/getUserDetail`,
    userUpdate: `${baseURL}/api/user/manage/userUpdate`,
    queryNotify: `${baseURL}/api/user/event/queryNotify`,
    queryTemplate: `${baseURL}/admin/api/template/selectTemplate`,
    eventUpload: `${baseURL}/api/user/event/eventUpload`,
    queryEventHistory: `${baseURL}/api/user/event/queryEventHistory`,
    userRealPoint: `${baseURL}/api/user/point/userRealPoint`,
    queryUserPoint: `${baseURL}/api/user/point/queryUserPoint`
};

/**
 * 又拍云配置
 * @type {{bucket: string, operator: string, password: string, endpoint: string}}
 */
export const upyun = {
    bucket: 'quncao',
    operator: 'quncao',
    password: 'quncao888',
    endpoint: 'v0'
};
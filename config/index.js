/**
 * 接口域名
 * @type {string}
 */
const baseURL = 'https://www.pohou.com';
/**
 * 接口地址
 * @type {{login: string, getCities: string, sendVerify: string, register: string, resetPassword: string, userUpdate: string, queryNotify: string, eventUpload: string, queryEventHistory: string, userRealPoint: string, queryUserPoint: string}}
 */
export const API = {
    login: `${baseURL}/api/user/manage/login`,
    getCities: `${baseURL}`,
    sendVerify: `${baseURL}/api/user/base/sendVerify`,
    register: `${baseURL}/api/user/manage/register`,
    resetPassword: `${baseURL}/api/user/manage/resetPassword`,
    userUpdate: `${baseURL}/api/user/manage/userUpdate`,
    queryNotify: `${baseURL}/api/user/event/queryNotify`,
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
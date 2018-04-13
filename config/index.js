/**
 * 接口域名
 * @type {string}
 */
const baseURL = 'https://www.pohou.com';
/**
 * 接口地址
 * @type {{login: {method: string, url: string, requireAuth: boolean}, getCityList: {method: string, url: string, requireAuth: boolean}, sendVerify: {method: string, url: string, requireAuth: boolean}, register: {method: string, url: string, requireAuth: boolean}, resetPassword: {method: string, url: string, requireAuth: boolean}, getUserDetail: {method: string, url: string, requireAuth: boolean}, userUpdate: {method: string, url: string, requireAuth: boolean}, queryNotify: {method: string, url: string, requireAuth: boolean}, queryTemplate: {method: string, url: string, requireAuth: boolean}, eventUpload: {method: string, url: string, requireAuth: boolean}, queryEventHistory: {method: string, url: string, requireAuth: boolean}, userRealPoint: {method: string, url: string, requireAuth: boolean}, queryUserPoint: {method: string, url: string, requireAuth: boolean}}}
 */
export const API = {
    login: {
        method: 'POST',
        url: `${baseURL}/api/user/manage/login`,
        requireAuth: false
    },
    getCityList: {
        method: 'POST',
        url: `${baseURL}/api/user/base/getCityList`,
        requireAuth: false
    },
    sendVerify: {
        method: 'POST',
        url: `${baseURL}/api/user/base/sendVerify`,
        requireAuth: false
    },
    register: {
        method: 'POST',
        url: `${baseURL}/api/user/manage/register`,
        requireAuth: false
    },
    resetPassword: {
        method: 'POST',
        url: `${baseURL}/api/user/manage/resetPassword`,
        requireAuth: false
    },
    getUserDetail: {
        method: 'POST',
        url: `${baseURL}/api/user/manage/getUserDetail`,
        requireAuth: true
    },
    userUpdate: {
        method: 'POST',
        url: `${baseURL}/api/user/manage/userUpdate`,
        requireAuth: true
    },
    queryNotify: {
        method: 'POST',
        url: `${baseURL}/api/user/event/queryNotify`,
        requireAuth: true
    },
    queryTemplate: {
        method: 'POST',
        url: `${baseURL}/admin/api/template/selectTemplate`,
        requireAuth: false
    },
    eventUpload: {
        method: 'POST',
        url: `${baseURL}/api/user/event/eventUpload`,
        requireAuth: true
    },
    queryEventHistory: {
        method: 'POST',
        url: `${baseURL}/api/user/event/queryEventHistory`,
        requireAuth: true
    },
    userRealPoint: {
        method: 'POST',
        url: `${baseURL}/api/user/point/userRealPoint`,
        requireAuth: true
    },
    queryUserPoint: {
        method: 'POST',
        url: `${baseURL}/api/user/point/queryUserPoint`,
        requireAuth: true
    }
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
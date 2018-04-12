/**
 * 接口域名
 * @type {string}
 */
const baseURL = 'https://www.pohou.com';
/**
 * 接口地址
 * @type {{login: {url: string, requireAuth: boolean}, getCityList: {url: string, requireAuth: boolean}, sendVerify: {url: string, requireAuth: boolean}, register: {url: string, requireAuth: boolean}, resetPassword: {url: string, requireAuth: boolean}, getUserDetail: {url: string, requireAuth: boolean}, userUpdate: {url: string, requireAuth: boolean}, queryNotify: {url: string, requireAuth: boolean}, queryTemplate: {url: string, requireAuth: boolean}, eventUpload: {url: string, requireAuth: boolean}, queryEventHistory: {url: string, requireAuth: boolean}, userRealPoint: {url: string, requireAuth: boolean}, queryUserPoint: {url: string, requireAuth: boolean}}}
 */
export const API = {
    login: {
        url: `${baseURL}/api/user/manage/login`,
        requireAuth: false
    },
    getCityList: {
        url: `${baseURL}/api/user/base/getCityList`,
        requireAuth: false
    },
    sendVerify: {
        url: `${baseURL}/api/user/base/sendVerify`,
        requireAuth: false
    },
    register: {
        url: `${baseURL}/api/user/manage/register`,
        requireAuth: false
    },
    resetPassword: {
        url: `${baseURL}/api/user/manage/resetPassword`,
        requireAuth: false
    },
    getUserDetail: {
        url: `${baseURL}/api/user/manage/getUserDetail`,
        requireAuth: true
    },
    userUpdate: {
        url: `${baseURL}/api/user/manage/userUpdate`,
        requireAuth: true
    },
    queryNotify: {
        url: `${baseURL}/api/user/event/queryNotify`,
        requireAuth: true
    },
    queryTemplate: {
        url: `${baseURL}/admin/api/template/selectTemplate`,
        requireAuth: false
    },
    eventUpload: {
        url: `${baseURL}/api/user/event/eventUpload`,
        requireAuth: true
    },
    queryEventHistory: {
        url: `${baseURL}/api/user/event/queryEventHistory`,
        requireAuth: true
    },
    userRealPoint: {
        url: `${baseURL}/api/user/point/userRealPoint`,
        requireAuth: true
    },
    queryUserPoint: {
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
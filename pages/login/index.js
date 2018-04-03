import {login} from '../../services/index';
import {loading, info} from '../../utils/util';

const app = getApp();

Page({
    data: {
        login_code: '',
        password: ''
    },
    handleUserNameInput(e) {
        let value = e.detail.value.trim();
        this.setData({login_code: value});
        return value
    },
    handlePasswordInput(e) {
        this.setData({password: e.detail.value});
    },
    handleLogin() {
        let {login_code, password} = this.data;
        if (!login_code) {
            return info('请输入用户名')
        }
        if (!password) {
            return info('请输入密码')
        }
        loading('正在登录');
        setTimeout(() => {
            loading();
            wx.switchTab({url: '/pages/record/index'})
        }, 1000)
    }
});
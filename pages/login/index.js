import crypto from '../../utils/crypto-js/index';
import {login} from '../../services/index';
import {loading, info} from '../../utils/util';

const app = getApp();

Page({
    data: {
        mobile: '',
        password: ''
    },
    handleUserNameInput(e) {
        let value = e.detail.value.trim();
        this.setData({mobile: value});
        return value
    },
    handlePasswordInput(e) {
        this.setData({password: e.detail.value});
    },
    login() {
        let {mobile, password} = this.data;
        if (!mobile) {
            return info('请输入用户名')
        }
        if (!password) {
            return info('请输入密码')
        }
        loading('正在登录');
        login({loginType: 1, mobile, password: crypto.MD5(password).toString()})
            .then(res => {
                loading();
                if (res.ret) {
                    app.user.login(res.data);
                    wx.switchTab({url: '/pages/record/index'})
                } else {
                    info(res.errmsg)
                }
            })
            .catch(err => {
                loading();
                info(err.errMsg)
            })
    }
});
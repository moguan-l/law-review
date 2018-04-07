import crypto from '../../utils/crypto-js/index';
import {sendVerify, resetPassword} from '../../services/index';
import {loading, info} from '../../utils/util';
import {isPhone} from '../../utils/validator';

Page({
    data: {
        mobile: '',
        vCode: '',
        sendWait: 0,
        newPassword: ''
    },
    handleInput(e) {
        let {name} = e.currentTarget.dataset,
            value = name === 'newPassword' ? e.detail.value : e.detail.value.trim();
        this.setData({[name]: value});
        return value
    },
    sendVerify() {
        let {mobile} = this.data;
        if (!isPhone(mobile)) {
            return info('请输入正确的手机号')
        }
        loading('正在发送');
        sendVerify({mobile})
            .then(res => {
                loading();
                if (res.ret) {
                    wx.showToast({title: '发送成功'});
                    this.setData({sendWait: 60});
                    this.handleSendWait = setInterval(() => {
                        let sendWait = this.data.sendWait - 1;
                        this.setData({sendWait});
                        sendWait <= 0 && clearInterval(this.handleSendWait)
                    }, 1000)
                } else {
                    info(res.errmsg)
                }
            })
            .catch(err => {
                loading();
                info(err.errMsg)
            })
    },
    reset() {
        let {mobile, vCode, newPassword} = this.data;
        if (!isPhone(mobile)) {
            return info('请输入正确的手机号')
        }
        if (vCode === '') {
            return info('请输入验证码')
        }
        if (newPassword === '') {
            return info('请输入新密码')
        }
        loading('正在提交');
        resetPassword({mobile, vCode, newPassword: crypto.MD5(newPassword).toString()})
            .then(res => {
                loading();
                if (res.ret) {
                    wx.showToast({title: '重置成功'});
                    setTimeout(() => wx.navigateBack(), 1500)
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
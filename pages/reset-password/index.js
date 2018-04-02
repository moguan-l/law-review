import {sendVerify, resetPassword} from '../../services/index';
import {loading, info} from '../../utils/util';
import {isPhone} from '../../utils/validator';

Page({
    data: {
        mobile: '',
        vcode: '',
        sendWait: 0,
        new_password: ''
    },
    handleInput(e) {
        let {name} = e.currentTarget.dataset,
            value = name == 'new_password' ? e.detail.value : e.detail.value.trim();
        this.setData({[name]: value});
        return value
    },
    sendVerify() {
        let {mobile} = this.data;
        if (!isPhone(mobile)) {
            return info('请输入正确的手机号')
        }
        loading('正在发送');
        setTimeout(() => {
            loading();
            wx.showToast({title: '发送成功'});
            this.setData({sendWait: 60});
            this.handleSendWait = setInterval(() => {
                let sendWait = this.data.sendWait - 1;
                this.setData({sendWait});
                sendWait <= 0 && clearInterval(this.handleSendWait)
            }, 1000)
        }, 2000)
    },
    reset() {
        let {mobile, vcode, new_password} = this.data;
        if (!isPhone(mobile)) {
            return info('请输入正确的手机号')
        }
        if (vcode === '') {
            return info('请输入验证码')
        }
        if (new_password === '') {
            return info('请输入新密码')
        }
        loading('正在提交');

    }
});
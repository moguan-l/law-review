import {getCities, sendVerify, register} from '../../services/index';
import {loading, info} from '../../utils/util';
import {isPhone} from '../../utils/validator';

Page({
    data: {
        mobile: '',
        vcode: '',
        sendWait: 0,
        password: '',
        name: '',
        cityIndex: 0,
        cities: [
            {id: 1, name: '北京'},
            {id: 2, name: '上海'},
            {id: 3, name: '广州'},
            {id: 4, name: '深圳'},
            {id: 5, name: '青岛'}
        ]
    },
    onLoad() {
        loading('正在加载');
        setTimeout(() => {
            loading()
        }, 2000)
    },
    handleInput(e) {
        let {name} = e.currentTarget.dataset,
            value = name === 'password' ? e.detail.value : e.detail.value.trim();
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
    handleCityChange(e) {
        this.setData({cityIndex: e.detail.value})
    },
    register() {
        let {mobile, vcode, password, name, cityIndex, cities} = this.data;
        if (!isPhone(mobile)) {
            return info('请输入正确的手机号')
        }
        if (vcode === '') {
            return info('请输入验证码')
        }
        if (password === '') {
            return info('请输入密码')
        }
        if (name === '') {
            return info('请输入姓名')
        }
        loading('正在提交');

    }
});
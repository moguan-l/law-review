import crypto from '../../utils/crypto-js/index';
import {getCityList, sendVerify, register} from '../../services/index';
import {loading, info} from '../../utils/util';
import {isPhone} from '../../utils/validator';

Page({
    data: {
        mobile: '',
        vCode: '',
        sendWait: 0,
        password: '',
        nickname: '',
        name: '',
        cityIndex: 0,
        cities: []
    },
    onLoad() {
        loading('正在加载');
        getCityList()
            .then(res => {
                loading();
                if (res.ret) {
                    this.setData({cities: res.data || []})
                } else {
                    info(res.errmsg)
                }
            })
            .catch(err => {
                loading();
                info(err.errMsg)
            })
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
    handleCityChange(e) {
        this.setData({cityIndex: e.detail.value})
    },
    register() {
        let {mobile, vCode, password, nickname, name, cityIndex, cities} = this.data;
        if (!isPhone(mobile)) {
            return info('请输入正确的手机号')
        }
        if (vCode === '') {
            return info('请输入验证码')
        }
        if (password === '') {
            return info('请输入密码')
        }
        if (nickname === '') {
            return info('请输入昵称')
        }
        if (name === '') {
            return info('请输入姓名')
        }
        loading('正在提交');
        let city = cities[cityIndex] || {};
        register({mobile, vCode, password: crypto.MD5(password).toString(), nickname, name, cityCode: city.cityCode, cityName: city.name})
            .then(res => {
                loading();
                if (res.ret) {
                    wx.showToast({title: '注册成功'});
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
import {getUserDetail, userUpdate, getCityList} from '../../../services/index';
import upload from '../../../utils/upload';
import {loading, info} from '../../../utils/util';

const app = getApp();

Page({
    status: {
        10: '待审核',
        20: '审核中',
        30: '审核通过',
        40: '审核未通过'
    },
    data: {
        editable: false,
        nickname: '',
        name: '',
        identNo: '',
        identSideA: {},
        identSideB: {},
        payType: 10,
        payAccount: '',
        payName: '',
        cityIndex: 0,
        cities: []
    },
    onLoad() {
        this.mobile = app.user.get().mobile;
        loading('正在加载');
        getCityList()
            .then(res => {
                if (res.ret) {
                    this.setData({cities: res.data || []});
                    return getUserDetail({mobile: this.mobile})
                } else {
                    return Promise.reject(res)
                }
            })
            .then(res => {
                if (res.ret) {
                    loading();
                    let {identStatus, nickname, name, identNo, identSideA, identSideB, cityCode, payInfoList} = res.data,
                        {payType = 10, payAccount = '', payName = ''} = payInfoList[0] || {},
                        cityIndex = 0;
                    this.data.cities.forEach((item, index) => {
                        if (item.cityCode == cityCode) {
                            cityIndex = index;
                            return
                        }
                    });
                    this.setData({
                        editable: identStatus === 10 || identStatus === 40,
                        nickname, name, identNo,
                        identSideA: {url: identSideA},
                        identSideB: {url: identSideB},
                        cityIndex,
                        payType,
                        payAccount,
                        payName
                    })
                } else {
                    return Promise.reject(res)
                }
            })
            .catch(err => {
                loading();
                info(err.errMsg || err.errmsg)
            })
    },
    handleInput(e) {
        let {name} = e.currentTarget.dataset,
            value = e.detail.value.trim();
        this.setData({[name]: value});
        return value
    },
    chooseImage(e) {
        let {id} = e.currentTarget;
        wx.chooseImage({
            success: res => this.setData({[id]: {tempFilePath: res.tempFilePaths[0]}})
        })
    },
    handleCityChange(e) {
        this.setData({cityIndex: e.detail.value})
    },
    submit() {
        let {nickname, name, identNo, identSideA, identSideB, cityIndex, cities, payType, payAccount, payName} = this.data,
            city = cities[cityIndex] || {};
        userUpdate({mobile: this.mobile, nickname, name, identNo, identSideA: identSideA.url, identSideB: identSideB.url, cityCode: city.cityCode, cityName: city.name, payType, payAccount, payName})
            .then(res => {
                loading();
                if (res.ret) {
                    wx.showToast({title: '提交成功'});
                    setTimeout(() => wx.navigateBack(), 1500)
                } else {
                    info(res.errmsg)
                }
            })
            .catch(err => {
                loading();
                info(err.errMsg)
            })
    },
    upload() {
        let {nickname, name, identNo, identSideA, identSideB, payAccount, payName} = this.data;
        if (!nickname) {
            return info('请填写昵称')
        }
        if (!name) {
            return info('请填写真实姓名')
        }
        if (!identNo) {
            return info('请填写身份证号')
        }
        if ((!identSideA.url && !identSideA.tempFilePath) || (!identSideB.url && !identSideB.tempFilePath)) {
            return info('请上传身份证照片')
        }
        if (!payAccount) {
            return info('请填写支付宝账号')
        }
        if (!payName) {
            return info('请填写支付宝昵称')
        }
        let uploadFiles = [],
            uploadActions = [];
        loading('正在提交');
        if (!!identSideA.tempFilePath && !identSideA.url) {
            uploadFiles.push('identSideA');
            uploadActions.push(upload(identSideA.tempFilePath, 'card'))
        }
        if (!!identSideB.tempFilePath && !identSideB.url) {
            uploadFiles.push('identSideB');
            uploadActions.push(upload(identSideB.tempFilePath, 'card'))
        }
        if (!!uploadActions.length) {
            Promise.all(uploadActions)
                .then(res => {
                    let flag = true;
                    res.forEach((item, index) => {
                        let {data, upyunHost} = item,
                            {code, url} = JSON.parse(data);
                        if (code === 200) {
                            this.data[uploadFiles[index]].url = upyunHost + url
                        } else {
                            flag = false
                        }
                    });
                    uploadFiles.forEach(item => this.setData({[item]: this.data[item]}));
                    if (!flag) {
                        return info('上传身份证照片失败')
                    }
                    this.submit()
                })
                .catch(err => {
                    loading();
                    info('上传身份证照片失败')
                })
        } else {
            this.submit()
        }
    }
});

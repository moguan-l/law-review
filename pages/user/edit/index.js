import {getUserDetail, userUpdate} from '../../../services/index';
import upload from '../../../utils/upload';
import {loading, info} from '../../../utils/util';

const app = getApp();

Page({
    mobile: app.user.get().mobile,
    status: {
        10: '未审核',
        20: '审核中',
        30: '审核通过',
        40: '审核未通过'
    },
    data: {
        identStatus: 0,
        name: '',
        identNo: '',
        identSideA: {},
        identSideB: {},
        payType: 10,
        payAccount: '',
        payName: ''
    },
    onLoad() {
        loading('正在加载');
        getUserDetail({mobile: this.mobile})
            .then(res => {
                loading();
                if (res.ret) {
                    let {identStatus, name, identNo, identSideA, identSideB, payInfoList} = res.data,
                        {payType = 10, payAccount = '', payName = ''} = payInfoList[0] || {};
                    this.setData({
                        identStatus,
                        name, identNo,
                        identSideA: {url: identSideA},
                        identSideB: {url: identSideB},
                        payType,
                        payAccount,
                        payName
                    })
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
    submit() {
        let {name, identNo, identSideA, identSideB, payType, payAccount, payName} = this.data;
        userUpdate({mobile: this.mobile, name, identNo, identSideA: identSideA.url, identSideB: identSideB.url, payType, payAccount, payName})
            .then(res => {
                loading();
                if (res.ret) {
                    wx.showToast({title: '提交成功'})
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
        let {identStatus, name, identNo, identSideA, identSideB, payAccount, payName} = this.data;
        if (identStatus !== 10 && identStatus !== 40) {
            return info(`${this.status[identStatus] || '未知状态'}，信息无法提交`)
        }
        if (name === '') {
            return info('请填写真实姓名')
        }
        if (identNo === '') {
            return info('请填写身份证号')
        }
        if ((!identSideA.url && !identSideA.tempFilePath) || (!identSideB.url && !identSideB.tempFilePath)) {
            return info('请上传身份证照片')
        }
        if (payAccount === '') {
            return info('请填写支付宝账号')
        }
        if (payName === '') {
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

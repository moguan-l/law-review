import {userUpdate} from '../../../services/index';
import upload from '../../../utils/upload';
import {loading, info} from '../../../utils/util';

const app = getApp();

Page({
    data: {
        name: '',
        identNo: '',
        identSideA: {},
        identSideB: {},
        payAccount: '',
        payName: ''
    },
    onLoad() {

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
        let {name, identNo, identSideA, identSideB, payAccount, payName} = this.data;
        userUpdate({mobile: app.user.get().mobile, name, identNo, identSideA: identSideA.url, identSideB: identSideB.url, payType: 10, payAccount, payName})
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
        let {name, identNo, identSideA, identSideB, payAccount, payName} = this.data,
            uploadFiles = [],
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

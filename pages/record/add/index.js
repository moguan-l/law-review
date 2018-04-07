import {queryTemplate, eventUpload} from '../../../services/index';
import upload from '../../../utils/upload';
import {loading, info} from '../../../utils/util';

const app = getApp();

Page({
    data: {
        files: [],
        ownership: '',
        address: '',
        lat: '',
        lng: '',
        content: '',
        reasonIndex: 0,
        reasonTemplates: []
    },
    onLoad() {
        this.mobile = app.user.get().mobile;
        loading('正在加载');
        queryTemplate()
            .then(res => {
                loading();
                if (res.ret) {
                    this.setData({
                        reasonTemplates: res.data || []
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
            value = name === 'content' ? e.detail.value : e.detail.value.trim();
        this.setData({[name]: value});
        return value
    },
    chooseImage() {
        wx.chooseImage({
            success: res => {
                let {files} = this.data;
                res.tempFilePaths.forEach(tempFilePath => {
                    files.push({
                        timestamp: (new Date()).getTime(),
                        tempFilePath
                    })
                });
                this.setData({files})
            }
        })
    },
    deleteImage(e) {
        let {timestamp} = e.currentTarget.dataset,
            {files} = this.data;
        files = files.filter(item => item.timestamp !== timestamp);
        this.setData({files})
    },
    _chooseLocation() {
        wx.chooseLocation({
            success: res => {
                let {address = '', latitude, longitude} = res;
                this.setData({
                    address,
                    lat: latitude,
                    lng: longitude
                })
            }
        })
    },
    chooseLocation() {
        wx.getSetting({
            success: res => {
                if (!res.authSetting['scope.userLocation']) {
                    wx.authorize({
                        scope: 'scope.userLocation',
                        success: this._chooseLocation
                    })
                } else {
                    this._chooseLocation()
                }
            }
        })
    },
    handleReasonChange(e) {
        this.setData({reasonIndex: e.detail.value})
    },
    submit() {
        let {ownership, files, lat, lng, content, reasonIndex, reasonTemplates} = this.data,
            attachInfoList = files.map(item => ({url: item.url}));
        eventUpload({mobile: this.mobile, attachInfoList, ownership, lat, lng, content, reasonTemplateId: reasonTemplates[reasonIndex] ? reasonTemplates[reasonIndex].templateTypeId : null, })
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
        let {ownership, files, lat, lng, content} = this.data;
        if (!files || !files.length) {
            return info('请选择违规照片')
        }
        if (ownership === '') {
            return info('请填写违规主体')
        }
        if (!lat || !lng) {
            return info('请选择所在位置')
        }
        if (content === '') {
            return info('请填写违规说明')
        }
        loading('正在提交');
        let uploadedFiles = files.filter(item => !!item.url),
            uploadFiles = files.filter(item => !item.url),
            uploadActions = uploadFiles.map(item => {
                return upload(item.tempFilePath)
            });
        if (!!uploadActions.length) {
            Promise.all(uploadActions)
                .then(res => {
                    let flag = true;
                    res.forEach((item, index) => {
                        let {data, upyunHost} = item,
                            {code, url} = JSON.parse(data);
                        if (code === 200) {
                            uploadFiles[index].url = upyunHost + url
                        } else {
                            flag = false
                        }
                    });
                    this.setData({files: uploadedFiles.concat(uploadFiles)});
                    if (!flag) {
                        return info('上传照片失败')
                    }
                    this.submit()
                })
                .catch(err => {
                    loading();
                    info('上传照片失败')
                })
        } else {
            this.submit()
        }
    }
});

import {userUpdate} from '../../../services/index';
import upload from '../../../utils/upload';
import {loading, info} from '../../../utils/util';

const app = getApp();

Page({
    data: {
        name: '',
        ident_no: '',
        ident_side_a: {},
        ident_side_b: {},
        pay_account: '',
        pay_name: ''
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
        let {name, ident_no, ident_side_a, ident_side_b, pay_account, pay_name} = this.data
        console.log(ident_side_a);
        console.log(ident_side_b);
    },
    upload() {
        let {name, ident_no, ident_side_a, ident_side_b, pay_account, pay_name} = this.data,
            uploadFiles = [],
            uploadActions = [];
        loading('正在提交');
        if (!!ident_side_a.tempFilePath && !ident_side_a.url) {
            uploadFiles.push('ident_side_a');
            uploadActions.push(upload(ident_side_a.tempFilePath, 'card'))
        }
        if (!!ident_side_b.tempFilePath && !ident_side_b.url) {
            uploadFiles.push('ident_side_b');
            uploadActions.push(upload(ident_side_b.tempFilePath, 'card'))
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
                    uploadFiles.forEach(item => this.setData({[item]: this.data[item]}))
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

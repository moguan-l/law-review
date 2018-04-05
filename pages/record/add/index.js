import {getCities, eventUpload} from '../../../services/index';
import upload from '../../../utils/upload';
import {loading, info} from '../../../utils/util';

const app = getApp();

Page({
    data: {
        title: '',
        files: [],
        comment: '',
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

    },
    handleInput(e) {
        let {name} = e.currentTarget.dataset,
            value = name === 'comment' ? e.detail.value : e.detail.value.trim();
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
    handleCityChange(e) {
        this.setData({cityIndex: e.detail.value})
    },
    submit() {
        let {title, files, comment, cityIndex, cities} = this.data;
        console.log(files);
    },
    upload() {
        let {title, files, comment} = this.data;
        if (!files || !files.length) {
            return info('请选择违规照片')
        }
        if (title === '') {
            return info('请填写违规主体')
        }
        if (comment === '') {
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

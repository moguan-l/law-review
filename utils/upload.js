import crypto from './crypto-js/index';
import {upyun} from '../config/index';

const {bucket, operator, password, endpoint} = upyun;

export default (filePath, folder = '{year}/{mon}/{day}') => {
    let date = (new Date()).toGMTString();
    let policyObj = {
            date,
            bucket,
            expiration: Math.round(new Date().getTime() / 1000) + 3600,
            'save-key': `/${folder}/{filemd5}{.suffix}`,
            'allow-file-type': 'jpg,jpeg,png'
        },
        policy = crypto.enc.Base64.stringify(crypto.enc.Utf8.parse(JSON.stringify(policyObj)));
    let md5Password = crypto.MD5(password).toString(),
        signature = crypto.HmacSHA1(['POST', '/' + bucket, date, policy].join('&'), md5Password).toString(CryptoJS.enc.Base64);
    return new Promise((success, fail) => {
        wx.uploadFile({
            url: `https://${endpoint}.api.upyun.com/${bucket}`,
            filePath,
            name: 'file',
            formData: {
                authorization: `UPYUN ${operator}:${signature}`,
                policy
            },
            success, fail
        })
    })
}
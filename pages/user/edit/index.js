import {userUpdate} from '../../../services/index';

const app = getApp();

Page({
    data: {
        name: '',
        ident_no: '',
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
    submit() {

    }
});

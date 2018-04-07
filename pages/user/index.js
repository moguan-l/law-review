import {getUserDetail, userRealPoint} from '../../services/index';
import {loading, info} from '../../utils/util';

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
        user: {},
        credit: {}
    },
    onLoad() {
        loading('正在加载');
        Promise.all([
                getUserDetail({mobile: this.mobile}),
                userRealPoint({mobile: this.mobile})
            ])
            .then(res => {
                loading();
                let [user, credit] = res;
                user.ret ? this.setData({user: user.data}) : info(user.errmsg);
                credit.ret ? this.setData({credit: credit.data}) : info(credit.errmsg)
            })
            .catch(err => {
                loading();
                info(err.errMsg)
            })
    }
});

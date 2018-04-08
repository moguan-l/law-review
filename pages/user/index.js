import {getUserDetail, userRealPoint} from '../../services/index';
import {loading, info} from '../../utils/util';

const app = getApp();

Page({
    data: {
        status: {
            10: '未审核',
            20: '审核中',
            30: '审核通过',
            40: '审核未通过'
        },
        user: {},
        credit: {}
    },
    onLoad() {
        this.mobile = app.user.get().mobile;
        this.getData()
            .catch(err => {
                loading();
                info(err.errMsg)
            })
    },
    onPullDownRefresh() {
        this.getData()
            .then(() => {
                wx.stopPullDownRefresh()
            })
            .catch(err => {
                wx.stopPullDownRefresh();
                loading();
                info(err.errMsg)
            })
    },
    getData() {
        loading('正在加载');
        return Promise.all([
                getUserDetail({mobile: this.mobile}),
                userRealPoint({mobile: this.mobile})
            ])
            .then(res => {
                loading();
                let [user, credit] = res;
                user.ret ? this.setData({user: user.data}) : info(user.errmsg);
                credit.ret ? this.setData({credit: credit.data}) : info(credit.errmsg)
            })
    }
});

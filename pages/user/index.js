import {userRealPoint} from '../../services/index';
import {loading, info} from '../../utils/util';

const app = getApp();

Page({
    data: {
        user: app.user.get(),
        credit: 0
    },
    onLoad() {
        loading('正在加载');
        let {mobile} = this.data.user;
        userRealPoint({mobile})
            .then(res => {
                loading();
                if (res.ret) {
                    this.setData({credit: res.data.availabilityPoint})
                } else {
                    info(res.errmsg)
                }
            })
            .catch(err => {
                loading();
                info(err.errMsg)
            })
    }
});

import {queryNotify} from '../../../services/index';
import {formatTime, info} from '../../../utils/util';

const app = getApp();

Page({
    mobile: app.user.get().mobile,
    data: {
        loading: false,
        reqPage: {
            pageNum: 0,
            pageSize: 10
        },
        pageCount: Infinity,
        items: []
    },
    onLoad() {
        this.getItems()
    },
    onReachBottom() {
        this.getItems()
    },
    getItems() {
        let {loading, reqPage, pageCount, items} = this.data,
            pageNum = reqPage.pageNum + 1;
        if(loading || pageNum > pageCount) {
            return false
        }
        this.setData({loading: true});
        queryNotify({mobile: this.mobile, reqPage: {...reqPage, pageNum}})
            .then(res => {
                this.setData({loading: false});
                if (res.ret) {
                    reqPage.pageNum = res.data.pageNum;
                    this.setData({
                        reqPage,
                        pageCount: res.data.pageCount,
                        items: items.concat(res.data.items)
                    })
                } else {
                    info(res.errmsg)
                }
            })
            .catch(err => {
                this.setData({loading: false});
                info(err.errMsg)
            })
    },
    formatTime
});

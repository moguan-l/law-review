import {queryUserPoint} from '../../../services/index';
import {formatTime, info} from '../../../utils/util';

const app = getApp();

Page({
    data: {
        loading: false,
        reqPage: {
            pageNum: 0,
            pageSize: 10
        },
        pageCount: 1,
        items: []
    },
    onLoad() {
        this.mobile = app.user.get().mobile;
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
        queryUserPoint({mobile: this.mobile, reqPage: {...reqPage, pageNum}})
            .then(res => {
                this.setData({loading: false});
                if (res.ret) {
                    reqPage.pageNum = res.data.pageNum;
                    this.setData({
                        reqPage,
                        pageCount: res.data.pageCount,
                        items: items.concat(
                            res.data.items.map(item => {
                                item.createTime = formatTime(new Date(item.createTime), 'yyyy-MM-dd hh:mm:ss');
                                return item
                            })
                        )
                    })
                } else {
                    info(res.errmsg)
                }
            })
            .catch(err => {
                this.setData({loading: false});
                info(err.errMsg)
            })
    }
});

import {queryEventHistory} from '../../services/index';
import {formatTime, info} from '../../utils/util';

const app = getApp();

Page({
    data: {
        status: {
            10: '待审核',
            20: '审核中',
            30: '审核完成',
            40: '审核未通过'
        },
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
    onPullDownRefresh() {
        if (this.data.loading) {
            return false
        }
        this.setData({
            reqPage: {
                pageNum: 0,
                pageSize: 10
            },
            pageCount: 1
        });
        this._getItems()
            .then(() => {
                wx.stopPullDownRefresh()
            })
            .catch(err => {
                wx.stopPullDownRefresh();
                this.setData({loading: false});
                info(err.errMsg)
            })
    },
    _getItems() {
        let {loading, reqPage, pageCount, items} = this.data,
            pageNum = reqPage.pageNum + 1;
        if(loading || pageNum > pageCount) {
            return false
        }
        this.setData({loading: true});
        return queryEventHistory({mobile: this.mobile, reqPage: {...reqPage, pageNum}})
            .then(res => {
                this.setData({loading: false});
                if (res.ret) {
                    reqPage.pageNum = res.data.pageNum;
                    this.setData({
                        reqPage,
                        pageCount: res.data.pageCount,
                        items: (res.data.pageNum === 1 ? [] : items).concat(
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
    },
    getItems() {
        let result = this._getItems();
        !!result && result.catch(err => {
            this.setData({loading: false});
            info(err.errMsg)
        })
    },
    previewImage(e) {
        let {current, urls} = e.currentTarget.dataset;
        urls = urls.map(item => item.url);
        wx.previewImage({current, urls})
    }
});

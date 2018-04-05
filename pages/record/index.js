import {queryEventHistory} from '../../services/index';

const app = getApp();

Page({
    data: {
        loading: false,
        records: [],
        page: {
            page_num: 0,
            page_row: 5,
            total: 0
        }
    },
    onLoad() {

    },
    onReachBottom() {

    },
    getRecords() {

    }
});

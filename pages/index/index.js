import {formatTime} from '../../utils/util';

const app = getApp();

Page({
    data: {
        title: formatTime(new Date(), 'yyyy-MM-dd')
    },
    onLoad() {

    }
});

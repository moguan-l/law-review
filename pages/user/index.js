import {userRealPoint} from '../../services/index';

const app = getApp();

Page({
    data: {
        user: app.user.get()
    }
});

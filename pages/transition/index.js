const app = getApp();

Page({
    onLoad() {
        wx.redirectTo({
            url: app.user.loggedIn() ? '../index/index' : '../login/index'
        })
    }
});
const app = getApp();

Page({
    onLoad() {
        app.user.loggedIn() ?
            wx.switchTab({url: '/pages/record/index'}) :
            wx.redirectTo({url: '/pages/login/index'})
    }
});
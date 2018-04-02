const USER = 'user';

export default {
    get() {
        return wx.getStorageSync(USER)
    },
    login(user) {
        wx.setStorageSync(USER, user);
    },
    logout() {
        wx.removeStorageSync(USER)
    },
    loggedIn() {
        return !!this.get()
    }
}

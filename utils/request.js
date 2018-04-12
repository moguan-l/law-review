export default ({method, api, data}) => {
    let {url, requireAuth} = api;
    return new Promise((success, fail) => {
        wx.request({
            url, method, data,
            success: res => {
                if (requireAuth) {
                    let {errcode} = res.data;
                    if (errcode === 602 || errcode === 610) {
                        return wx.reLaunch({url: '/pages/login/index'})
                    }
                }
                success(res.data)
            },
            fail
        })
    })
}
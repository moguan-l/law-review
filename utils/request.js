export default ({url, method, data}) => {
    return new Promise((success, fail) => {
        wx.request({
            url, method, data,
            success: res => {
                success(res.data)
            },
            fail
        })
    })
}
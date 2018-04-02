/**
 * 日期格式化
 * @param date
 * @param format
 * @returns {*}
 */
export const formatTime = (date, format) => {
    const o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'H+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        S: date.getMilliseconds(),
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
        if (new RegExp(`(${k})`).test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr(`${o[k]}`.length))
        }
    }
    return format
};
/**
 * 加载提示
 * @param title
 */
export const loading = title => !!title ? wx.showLoading({title, mask: true}) : wx.hideLoading();
/**
 * 信息提示
 * @param title
 */
export const info = title => wx.showToast({title, icon: 'none'});
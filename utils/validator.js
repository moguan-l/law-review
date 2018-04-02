const reg = {
    phone: /^1[3-9]\d(\d)(?!\1{7})\d{7}$/
};

/**
 * 校验手机号
 * @param phone
 * @returns {boolean}
 */
export const isPhone = phone => reg['phone'].test(phone);
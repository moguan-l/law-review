/**
 * Created by LQJ on 2018/3/28.
 */
import request from '../utils/request';
import {target} from '../config';

export const login = data => {
    return request({url: `${target}`, data})
};
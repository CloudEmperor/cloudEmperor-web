/**
 * 接口地址
 */
import env from '../env'
const API = {
  base: env.BASE_API,
  // 业务类
  // 登录页面
  login: {
    login: () => `/admin/admin_login`,
    register: () => `/admin/user_register`
  },
  //新闻相关
  new: {
    details: () => `/news/get`
  }
};

export default API;
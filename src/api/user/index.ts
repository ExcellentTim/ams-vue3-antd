import request from '@/utils/request';

export function userLogin({ phone, password }: API.LoginParam) {
  return request({
    url: `/api/login/`,
    method: 'post',
    data: {
      phone,
      password,
      login_type: 'password'
    }
  });
}

export function getUserInfo() {
  return request({
    url: `/api/v1/users/me/`,
    method: 'get'
  });
}
// 可删除
// export function upLoadAvatar(username, data) {
//   return request({
//     url: `/api/v1/users/${username}/`,
//     method: 'patch',
//     data
//   });
// }

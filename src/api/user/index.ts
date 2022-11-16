import request from '@/utils/request';

export function userLogin({ phone, password }: API.LoginParam) {
  return request({
    url: `/api/login/`,
    method: 'post',
    data: {
      phone,
      password,
      login_type: 'password',
    },
  });
}

export function getUserInfo() {
  return request({
    url: `/api/v1/users/me/`,
    method: 'get',
  });
}

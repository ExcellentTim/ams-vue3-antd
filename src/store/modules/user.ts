import { defineStore } from 'pinia';
import store from '@/store';
import { Storage } from '@/utils/Storage';
import { getUserInfo } from '@/api/user';
interface UserState {
  userInfo: Partial<API.AdminUserInfo>;
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    userInfo: {}
  }),
  getters: {
    getInfo: state => {
      return state.userInfo;
    }
  },
  actions: {
    /** 退出登录清空token及用户信息 */
    logout() {
      this.userInfo = {};
      Storage.clear();
      location.href = '/';
    },
    async saveUserInfo() {
      try {
        const res = await getUserInfo();
        if (res.code === 19995) {
          return Promise.reject({ res });
        }
        this.userInfo = res.user;
        return { res };
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async updateUserInfo(data) {
      try {
        const res = await getUserInfo();
        if (res.code === 19995) {
          return Promise.reject({ res });
        }
        this.userInfo = { ...res.user, username: '123' };
        return { res };
      } catch (error) {
        return Promise.reject(error);
      }
    }
  }
});

// 在组件setup函数外使用
export function useUserStoreWithOut() {
  return useUserStore(store);
}

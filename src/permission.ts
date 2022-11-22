import router from '@/router';
import { Storage, ACCESS_TOKEN } from '@/utils/Storage';
import { BlankLayout } from '@/layouts';
import { useUserStore } from '@/store/modules/user';

import { to as _to } from '@/utils/util';
const LOGIN_NAME = 'login';
const whiteList = ['/user/login'];

router.beforeEach(async (to, _, next) => {
  const store = useUserStore();
  if (Storage.get(ACCESS_TOKEN)) {
    if (to.name === LOGIN_NAME) {
      next({ path: '/' });
    } else {
      if (Object.keys(store.userInfo).length) {
        next();
      } else {
        const [err] = await _to(store.saveUserInfo());

        if (err) {
          store.logout();
        } else {
          next();
        }
      }
    }
  } else {
    router.addRoute({
      path: '/user',
      component: BlankLayout,
      redirect: '/user/login',
      children: [
        {
          path: LOGIN_NAME,
          name: LOGIN_NAME,
          component: () =>
            import(/* webpackChunkName: "user" */ '@/views/user/Login.vue')
        }
      ]
    });
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next({ name: LOGIN_NAME });
    }
  }
});

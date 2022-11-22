import { createRouter, createWebHistory } from 'vue-router';
import { BasicLayout, BlankLayout } from '@/layouts';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'index',
      meta: { title: '首页' },
      component: BasicLayout,
      redirect: () => ({ name: 'curriculum_list' }),
      children: [
        {
          path: '/curriculum',
          name: 'curriculum',
          meta: { title: '课程管理', icon: 'icon-Livebroadcast' },
          redirect: () => ({ name: 'curriculum_list' }),
          children: [
            {
              path: 'list',
              name: 'curriculum_list',
              meta: { title: '课程列表' },
              component: () => import('@/views/curriculum/List.vue')
            },
            {
              path: 'detail/:id',
              name: 'curriculum_detail',
              meta: {
                title: '课程列表',
                params: { id: 1 },
                hideInMenu: true
              },
              component: () => import('@/views/curriculum/Detail.vue')
            }
          ]
        },
        {
          path: '/classes',
          name: 'classes',
          meta: { title: '班级管理', icon: 'icon-data2' },
          component: BlankLayout,
          redirect: () => ({ name: 'classes_list' }),
          children: [
            {
              path: 'list',
              name: 'classes_list',
              meta: { title: '班级列表' },
              component: () => import('@/views/classes/List.vue')
            }
          ]
        },
        {
          path: '/account',
          name: 'account',
          meta: { title: '账号信息', hideInMenu: true },
          component: () => import('@/views/account/Index.vue')
        }
      ]
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', redirect: '/' }
  ]
});

export default router;

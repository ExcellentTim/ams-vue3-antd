import { createRouter, createWebHistory } from 'vue-router';
import { BasicLayout, BlankLayout } from '@/layouts';
import { user, hotel } from '@/core/icons';

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
          meta: { title: '课程管理', icon: user },
          redirect: () => ({ name: 'curriculum_list' }),
          children: [
            {
              path: 'list',
              name: 'curriculum_list',
              meta: { title: '课程列表' }, //hideInMenu: true
              component: () => import('@/views/curriculum/List.vue'),
            },
          ],
        },
        {
          path: '/classes',
          name: 'classes',
          meta: { title: '班级管理', icon: hotel, flat: true },
          component: BlankLayout,
          redirect: () => ({ name: 'classes_list' }),
          children: [
            {
              path: 'list',
              name: 'classes_list',
              meta: { title: '班级列表' }, //hideInMenu: true
              component: () => import('@/views/classes/PageInfo.vue'),
            },
            {
              path: 'page-2',
              name: 'page2',
              meta: { title: '二级页面', hideInMenu: true },
              component: () => import('@/views/classes/PageTypography.vue'),
            },
            {
              path: 'dynamic-match/:id(\\d+)',
              name: 'dynamic-match',
              // 路由 path 默认参数再 meta.params 里
              meta: { title: '动态参数页面', params: { id: 1 } },
              component: () => import('@/views/classes/DynamicMatch.vue'),
            },
          ],
        },
      ],
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', redirect: '/' },
  ],
});

export default router;

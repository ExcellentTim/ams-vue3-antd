<template>
  <pro-layout
    v-model:collapsed="state.collapsed"
    v-model:selectedKeys="state.selectedKeys"
    v-model:openKeys="state.openKeys"
    :loading="loading"
    :menu-data="menuData"
    :breadcrumb="{ routes: breadcrumb }"
    disable-content-margin
    style="min-height: 100vh"
    iconfont-url="//at.alicdn.com/t/c/font_1365073_y0odjvsv9nq.js"
    v-bind="proConfig"
  >
    <template #menuHeaderRender>
      <router-link class="logo_box" :to="{ path: '/' }">
        <img v-if="state.collapsed" src="~@/assets/favicon.ico" />
        <img v-else src="~@/assets/logo.png" />
      </router-link>
    </template>
    <template #rightContentRender>
      <RightContent :current-user="userInfo" />
    </template>
    <!-- custom breadcrumb itemRender  -->
    <template #breadcrumbRender="{ route, params, routes }">
      <span v-if="routes.indexOf(route) === routes.length - 1">
        {{ route.breadcrumbName }}
      </span>
      <router-link v-else :to="{ path: route.path, params }">
        {{ route.breadcrumbName }}
      </router-link>
    </template>
    <RouterView v-slot="{ Component, route }">
      <transition name="slide-left" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </RouterView>
  </pro-layout>
</template>

<script setup lang="ts">
import { useRouter, RouterView, RouterLink } from 'vue-router';
import {
  getMenuData,
  clearMenuItem,
  type RouteContextProps,
  type MenuDataItem
} from '@ant-design-vue/pro-layout';
import { useUserStore } from '@/store/modules/user';

const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo);

const router = useRouter();
const { menuData } = getMenuData(clearMenuItem(router.getRoutes()));

const state = reactive<Omit<RouteContextProps, 'menuData'>>({
  collapsed: false, // default collapsed
  openKeys: [], // defualt openKeys
  selectedKeys: [] // default selectedKeys
});
const loading = ref(false);
const proConfig = ref({
  layout: 'side',
  navTheme: 'light',
  fixedHeader: true,
  fixSiderbar: true,
  splitMenus: true
});
const breadcrumb = computed(() =>
  router.currentRoute.value.matched.concat().map(item => {
    return {
      path: item.path,
      breadcrumbName: item.meta.title || ''
    };
  })
);

watch(
  router.currentRoute,
  () => {
    const matched = router.currentRoute.value.matched.concat();
    state.selectedKeys = matched
      .filter(r => r.name !== 'index')
      .map(r => r.path);
    state.openKeys = matched
      .filter(r => r.path !== router.currentRoute.value.path)
      .map(r => r.path);
  },
  {
    immediate: true
  }
);
</script>

<style lang="less" scoped>
.logo_box {
  width: 100%;
  img {
    width: 140px;
    height: 38px;
  }
}
</style>

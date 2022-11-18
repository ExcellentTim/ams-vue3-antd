<template>
  <page-container :title="`${route.meta.title}`">
    <template #extra>
      <a-button class="container-title-btn" size="large" type="primary"
        >新增</a-button
      >
    </template>
    <main class="container">
      <a-button @click="handletapDetail">课程课表详情</a-button>
      <!-- <Suspense></Suspense> -->
    </main>
  </page-container>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const handletapDetail = () => {
  router.push({
    name: 'curriculum_detail',
    params: { id: 2 }
  });
};
</script>

<style lang="less" scoped></style>

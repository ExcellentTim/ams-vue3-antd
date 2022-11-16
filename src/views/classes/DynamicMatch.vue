<template>
  <page-container :title="`${route.meta.title} ${route.params.id}`">
    <!-- 主内容区 -->
    <div style="height: 300px">
      <p>路由参数联动 分页器 组件</p>
      <a-space>
        <a-button type="dashed" @click="prev">跳转上一页</a-button>
        <a-button type="dashed" @click="next">跳转下一页</a-button>
      </a-space>
      <a-divider />
      <a-pagination :current="currentId" :total="total" show-less-items @change="handlePageChange" />
    </div>
  </page-container>
</template>

<script setup lang="ts">
import { LikeOutlined } from '@ant-design/icons-vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const currentId = computed(() => Number.parseInt(route.params.id as string, 10));
const total = computed(() => {
  const v = currentId.value * 20;
  if (v >= Number.MAX_SAFE_INTEGER) {
    return Number.MAX_SAFE_INTEGER;
  }
  return v;
});

const next = () => {
  router.push({
    name: 'dynamic-match',
    params: { id: currentId.value + 1 },
  });
};
const prev = () => {
  router.push({
    name: 'dynamic-match',
    params: { id: currentId.value > 1 ? currentId.value - 1 : 1 },
  });
};
const handlePageChange = (currentPage: number) => {
  router.push({
    name: 'dynamic-match',
    params: { id: currentPage },
  });
};
</script>

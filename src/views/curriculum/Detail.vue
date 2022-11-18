<template>
  <page-container :title="`${route.meta.title}`">
    <main class="container">
      <div>课程详情</div>
    </main>
  </page-container>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
</script>

<style lang="less" scoped></style>

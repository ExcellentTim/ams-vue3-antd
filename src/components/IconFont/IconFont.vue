<template>
  <icon-font :type="type" />
</template>

<script lang="ts" setup>
import { createFromIconfontCN } from '@ant-design/icons-vue';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js'
});

defineProps<{
  type: string;
}>();
</script>

<style lang="less" scoped></style>

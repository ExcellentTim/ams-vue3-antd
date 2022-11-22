<template>
  <page-container :title="route.meta.title">
    <!-- <template #content> content </template> -->
    <!-- <template #extra>
      <a-button key="1" type="primary">主操作</a-button>
    </template> -->
    <!-- <template #extraContent> extraContent </template> -->
    <!-- 主内容区 -->
    <main class="container">
      <div class="header_status">
        <div>
          状态：
          <a-radio-group v-model:value="state.status" button-style="solid">
            <a-radio-button value="1">全部</a-radio-button>
            <a-radio-button value="2">未开班</a-radio-button>
            <a-radio-button value="3">开班中</a-radio-button>
            <a-radio-button value="4">已结束</a-radio-button>
          </a-radio-group>
        </div>
        <div>
          <a-checkbox v-model:checked="state.lookme">
            仅看我担任班主任的班级
          </a-checkbox>
        </div>
      </div>
    </main>
    <br />
    <main class="container">
      <div class="table">
        <a-table :dataSource="state.dataSource" :columns="columns">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'class_name'">
              <div
                class="move_active"
                @click="handletapDetail('info', record.id)"
              >
                {{ record.class_name }}
              </div>
            </template>
            <template v-if="column.key === 'action'">
              <a>删除</a>
            </template>
          </template>
          <template #emptyText>
            <div class="empty_img">
              <img src="~@/assets/empty.png" alt="" />
            </div>
          </template>
        </a-table>
      </div>
    </main>
  </page-container>
</template>

<script setup lang="ts">
import { getClassesList } from '@/api/classes/list';
import { useRoute } from 'vue-router';

const route = useRoute();

const state = reactive({
  status: '1',
  lookme: false,
  dataSource: []
});

onMounted(async () => {
  const res = await getClassesList();
  state.dataSource = res.results;
});

const handletapDetail = (type, id) => {};
const columns = [
  {
    title: '班级名称',
    dataIndex: 'class_name',
    key: 'class_name'
  },
  {
    title: '学生数量',
    dataIndex: 'count',
    key: 'count'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: '班主任',
    dataIndex: 'headmaster',
    key: 'headmaster'
  },
  {
    title: '任课教师',
    dataIndex: 'teacher',
    key: 'teacher'
  },
  {
    title: '创建日期',
    dataIndex: 'create_time',
    key: 'create_time'
  },
  {
    title: '操作',
    key: 'action'
  }
];
</script>

<style lang="less" scoped>
.header_status {
  display: flex;
  justify-content: space-between;
  :deep(.ant-radio-group) {
    .ant-radio-button-wrapper {
      border: none;
      padding: 0 8px;
      margin-right: 24px;
      border-radius: 2px;
      height: 26px;
      line-height: 26px;
      &::before {
        display: none;
      }
    }
  }
}
</style>

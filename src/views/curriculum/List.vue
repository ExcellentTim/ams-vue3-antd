<template>
  <page-container :title="`${route.meta.title}`">
    <template #extra>
      <a-button class="ams-btn" type="primary" @click="handletapDetail('add')"
        >新增</a-button
      >
    </template>
    <main class="container">
      <div class="header_status">
        <div>
          状态：
          <a-radio-group v-model:value="state.status" button-style="solid">
            <a-radio-button :value="-1">全部</a-radio-button>
            <a-radio-button v-for="item in statusList" :value="item.id">
              {{ item.title }}
            </a-radio-button>
          </a-radio-group>
        </div>
        <div>
          <a-checkbox v-model:checked="state.lookme">
            仅看我直播的课
          </a-checkbox>
        </div>
      </div>
      <div>
        <span class="header_classes">
          班级：
          <a-select
            ref="select"
            v-model:value="state.classes"
            style="width: 230px"
          >
            <a-select-option :value="-1">全部</a-select-option>
            <a-select-option
              v-for="item in state.classesList"
              :value="item.id"
              >{{ item.id }}</a-select-option
            >
          </a-select>
        </span>
        <span>
          直播时间：
          <a-range-picker v-model:value="state.liveTime" show-time>
            <template #suffixIcon>
              <icon-font type="icon-calendar" />
            </template>
          </a-range-picker>
        </span>
      </div>
    </main>
    <br />
    <main class="container">
      <div class="table">
        <a-table :dataSource="state.dataSource" :columns="columns">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'curriculum_name'">
              <div
                class="move_active"
                @click="handletapDetail('info', record.id)"
              >
                {{ record.curriculum_name }}
              </div>
            </template>
            <template v-if="column.key === 'status'">
              <div>
                {{ statusList.filter(el => el.id === record.status)[0].title }}
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

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { getCurriculumList } from '@/api/curriculum/list';
import type { Dayjs } from 'dayjs';
type RangeValue = [Dayjs, Dayjs];

const route = useRoute();
const router = useRouter();

const statusList = [
  {
    id: 1,
    title: '待开播'
  },
  {
    id: 2,
    title: '开播中'
  },
  {
    id: 3,
    title: '已结束'
  },
  {
    id: 4,
    title: '已取消'
  }
];
const state = reactive({
  status: -1,
  lookme: false,
  classes: -1,
  classesList: [{ id: 1 }],
  liveTime: ref<RangeValue>(),
  dataSource: []
});

onMounted(async () => {
  const res = await getCurriculumList();
  state.dataSource = res.results;
  // console.log();
});

const handletapDetail = (type, id = 1) => {
  router.push({
    name: 'curriculum_detail',
    params: { id },
    query: { type }
  });
};

const columns = [
  {
    title: '课程名称',
    dataIndex: 'curriculum_name',
    key: 'curriculum_name'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: '直播时间',
    dataIndex: 'live_time',
    sorter: true,
    width: 160,
    key: 'live_time'
  },
  {
    title: '直播教师',
    dataIndex: 'live_teacher',
    key: 'live_teacher'
  },
  {
    title: '班级',
    dataIndex: 'classes',
    key: 'classes'
  },
  {
    title: '班主任',
    dataIndex: 'headmaster',
    key: 'headmaster'
  },
  {
    title: '直播时间',
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
  margin-bottom: 35px;
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
.header_classes {
  margin-right: 80px;
}
</style>

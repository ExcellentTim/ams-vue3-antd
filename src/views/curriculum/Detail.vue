<template>
  <page-container :title="comTitle">
    <main class="container">
      <div class="form_box">
        <a-form
          :model="state.formState"
          name="curriculum_detail"
          @finish="onFinish"
          :hideRequiredMark="hideMark"
          v-bind="{ labelCol: { span: 2 } }"
          autocomplete="off"
        >
          <a-form-item
            label="课程名称"
            name="curriculum_name"
            :rules="[{ required: true, message: '请输入课程名称' }]"
            :extra="!hideMark && '20 个字以内，支持中英文、数字'"
          >
            <span v-if="hideMark">{{
              state.formState['curriculum_name']
            }}</span>
            <a-input
              v-else
              v-model:value="state.formState['curriculum_name']"
              placeholder="请输入课程名称"
              class="item_wrapper_input"
              :maxlength="20"
            ></a-input>
          </a-form-item>

          <a-form-item
            label="开始时间"
            name="star_time"
            :rules="[{ required: true, message: '请选择开始时间' }]"
          >
            <span v-if="hideMark">{{ state.formState['star_time'] }}</span>
            <a-date-picker
              v-else
              v-model:value="state.formState['star_time']"
              show-time
              format="YYYY-MM-DD HH:mm"
              value-format="YYYY-MM-DD HH:mm"
              class="item_wrapper_col"
            />
          </a-form-item>
          <a-form-item
            label="结束时间"
            name="end_time"
            :rules="[{ required: true, message: '请选择结束时间' }]"
            :wrapperCol="{ span: 5 }"
          >
            <span v-if="hideMark">{{ state.formState['end_time'] }}</span>
            <a-date-picker
              v-else
              v-model:value="state.formState['end_time']"
              show-time
              format="YYYY-MM-DD HH:mm"
              value-format="YYYY-MM-DD HH:mm"
              class="item_wrapper_col"
            />
          </a-form-item>
          <a-form-item
            label="班级"
            name="classes"
            :rules="[{ required: true, message: '请选择参加课程的班级' }]"
            :extra="!hideMark && '参加课程的班级'"
          >
            <span v-if="hideMark">{{ state.formState['classes'] }}</span>
            <a-select
              v-else
              v-model:value="state.formState['classes']"
              placeholder="请选择班级"
              class="item_wrapper_col"
            >
              <a-select-option value="china">China</a-select-option>
              <a-select-option value="usa">U.S.A</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            label="直播教师"
            name="teacher"
            :rules="[{ required: true, message: '请选择参加课程的直播教师' }]"
            :extra="!hideMark && '需要先选择班级后，再选择直播教师'"
          >
            <span v-if="hideMark">{{ state.formState['teacher'] }}</span>
            <a-select
              v-else
              v-model:value="state.formState['teacher']"
              placeholder="请选直播老师"
              class="item_wrapper_col"
              :disabled="!state.formState['classes']"
            >
              <a-select-option value="china">China</a-select-option>
              <a-select-option value="usa">U.S.A</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item :wrapper-col="{ offset: 2 }">
            <div v-if="state.type === 'info'">
              <a-button
                class="ams-btn"
                :disabled="infoBtnDisabled"
                type="primary"
                @click="handleEditBtn"
              >
                编辑
              </a-button>
            </div>
            <div v-else>
              <a-space size="middle">
                <a-button
                  class="ams-btn"
                  :disabled="editBtnDisabled"
                  type="primary"
                  html-type="submit"
                >
                  保存
                </a-button>
                <a-button class="ams-btn" @click="handleCancel">取消</a-button>
              </a-space>
            </div>
          </a-form-item>
        </a-form>
      </div>
    </main>
  </page-container>
</template>

<script lang="ts" setup>
import { getCurriculumDetail } from '@/api/curriculum/list';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const typeTitle = {
  add: '新增课程',
  info: '课程详情',
  edit: '编辑课程'
};
let oldFormState = {};
const state = reactive({
  formState: {},
  type: route.query.type.toString()
});
onMounted(async () => {
  // id = route.params.id
  if (state.type !== 'add') {
    const { data } = await getCurriculumDetail(route.params.id);
    oldFormState = { ...data };
    state.formState = data;
  }
});

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const handleCancel = () => {
  if (state.type === 'add') {
    router.push({
      name: 'curriculum_list'
    });
  } else {
    state.formState = { ...oldFormState };
    state.type = 'info';
    router.push({
      name: 'curriculum_detail',
      params: { id: route.params.id },
      query: { type: 'info' }
    });
  }
};
const handleEditBtn = () => {
  state.type = 'edit';
  router.push({
    name: 'curriculum_detail',
    params: { id: route.params.id },
    query: { type: 'edit' }
  });
};
const hideMark = computed(() => {
  return state.type === 'info';
});
const infoBtnDisabled = computed(() => {
  return false;
});

const comTitle = computed(() => {
  return typeTitle[state.type];
});
const editBtnDisabled = computed(() => {
  return !(
    state.formState['curriculum_name'] &&
    state.formState['star_time'] &&
    state.formState['end_time'] &&
    state.formState['star_time'] &&
    state.formState['classes'] &&
    state.formState['teacher']
  );
});
</script>

<style lang="less" scoped>
.form_box {
  padding: 20px;
  .item_wrapper_input {
    width: 306px;
  }
  .item_wrapper_col {
    width: 224px;
  }
}
</style>

<template>
  <page-container :title="comTitle">
    <main class="container">
      <div class="form_box">
        <a-form
          name="classes_detail"
          :hideRequiredMark="hideMark"
          v-bind="{ labelCol: { span: 2 }, wrapperCol: { span: 20 } }"
          autocomplete="off"
        >
          <a-form-item
            label="班级名称"
            v-bind="validateInfos.name"
            :extra="!hideMark && '20 个字以内，支持中英文、数字'"
          >
            <span v-if="hideMark">{{ formState['name'] }}</span>
            <a-input
              v-else
              v-model:value="formState['name']"
              placeholder="请输入班级名称"
              class="item_wrapper_input"
            />
          </a-form-item>

          <a-form-item label="状态">
            <span v-if="hideMark">
              {{
                statusList.filter(el => el.id === formState['status'])[0].title
              }}
            </span>
            <a-select
              v-else
              v-model:value="formState['status']"
              class="item_wrapper_input"
            >
              <a-select-option v-for="item in statusList" :value="item.id">
                {{ item.title }}
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="班主任">
            <div>
              <a-space>
                <span>{{ formState['headmaster'] }}</span>
                <a-popover v-if="!hideMark" placement="right" trigger="hover">
                  <template #content>
                    如需将班主任工作移交他人，请联系管理员。
                  </template>
                  <question-circle-filled
                    class="help_icon"
                    style="font-size: 18px; color: #d8d8d8; height: 100%"
                  />
                </a-popover>
              </a-space>
            </div>
          </a-form-item>

          <a-form-item label="任课教师">
            <div>
              <div v-if="!hideMark" class="add_btn_item">
                <a-space size="middle">
                  <a-button
                    :disabled="addBtnDisabled('teacher', 3)"
                    type="primary"
                    size="small"
                    >添加</a-button
                  >
                  <span class="light_color">任课教师最多 3 名</span>
                </a-space>
              </div>
              <div
                v-for="(item, index) in formState['teacher']"
                :key="item.id"
                :class="formState['teacher'].length > 1 && 'info_item'"
              >
                <span :class="`info_name ${!hideMark && 'info_name_edit'}`">
                  <a-space>
                    <span>{{ item.name }}</span>
                    <close-outlined
                      v-if="showDeleteIcon('teacher')"
                      class="info_delete_icon"
                      @click="handleDelete('teacher', index)"
                    />
                  </a-space>
                </span>
              </div>
            </div>
          </a-form-item>

          <a-form-item label="学生">
            <div v-if="!hideMark" class="add_btn_item">
              <a-space size="middle">
                <a-button
                  :disabled="addBtnDisabled('student', 30)"
                  type="primary"
                  size="small"
                  >添加</a-button
                >
                <span class="light_color">学生最多 30 名</span>
              </a-space>
            </div>
            <div class="student_info_box">
              <div
                v-for="(item, index) in formState['student']"
                :key="item.id"
                :class="formState['student'].length > 2 && 'info_item'"
              >
                <span :class="`info_name ${!hideMark && 'info_name_edit'}`">
                  <a-space>
                    <span>{{ item.name }}</span>
                    <close-outlined
                      v-if="showDeleteIcon('student')"
                      class="info_delete_icon"
                      @click="handleDelete('student', index)"
                    />
                  </a-space>
                </span>
              </div>
            </div>
          </a-form-item>

          <a-form-item :wrapper-col="{ offset: 2 }">
            <div v-if="hideMark">
              <a-button class="ams-btn" type="primary" @click="handleEditBtn">
                编辑
              </a-button>
            </div>
            <div v-else>
              <a-space size="middle">
                <a-button class="ams-btn" type="primary" @click="onSubmit">
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
import { useRoute, useRouter } from 'vue-router';
import { Form } from 'ant-design-vue';
import { QuestionCircleFilled, CloseOutlined } from '@ant-design/icons-vue';
import { getClassesDetail } from '@/api/classes/list';
import _ from 'lodash';
const route = useRoute();
const router = useRouter();

const statusList = [
  {
    id: 1,
    title: '未开班'
  },
  {
    id: 2,
    title: '开班中'
  },
  {
    id: 3,
    title: '已结束'
  }
];

const typeTitle = {
  info: '班级详情',
  edit: '班级编辑'
};

let oldFormState = {
  id: 1,
  name: '',
  status: 1,
  headmaster: '',
  teacher: [],
  student: []
};

const state = reactive({
  type: route.query.type.toString()
});

const formState = ref({
  id: 1,
  name: '',
  status: 1,
  headmaster: '',
  teacher: [],
  student: []
});
const handleEditBtn = () => {
  state.type = 'edit';
  router.push({
    name: 'classes_detail',
    params: { id: route.params.id },
    query: { type: 'edit' }
  });
};

onMounted(async () => {
  const { data } = await getClassesDetail(route.params.id);
  oldFormState = _.cloneDeep(data);
  formState.value = data;
});

const useForm = Form.useForm;

const rulesRef = reactive({
  name: [{ required: true, whitespace: true, message: '请输入班级名称' }]
});

const { validate, validateInfos, resetFields } = useForm(formState, rulesRef);

const handleDelete = (type, index) => {
  formState.value[type].splice(index, 1);
};
const onSubmit = async () => {
  try {
    const data = await validate();
    console.log('onSubmit', data);

    // const key = Object.keys(res)[0];
    const key = 'name';
    validateInfos[key].validateStatus = 'error';
    validateInfos[key].help = '班级名称已存在，请重新输入';
  } catch (error) {
    console.log(error);
  }
};
const handleCancel = () => {
  resetFields();
  formState.value = _.cloneDeep(oldFormState);
  state.type = 'info';
  router.push({
    name: 'classes_detail',
    params: { id: route.params.id },
    query: { type: 'info' }
  });
};

const hideMark = computed(() => {
  return state.type === 'info';
});

const showDeleteIcon = computed(() => type => {
  return state.type !== 'info' && formState.value[type].length > 1;
});
const addBtnDisabled = computed(() => (type, count) => {
  return formState.value[type].length >= count;
});

const comTitle = computed(() => {
  return typeTitle[state.type];
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
  .help_icon {
    font-size: 18px;
    color: #d8d8d8;
    margin-top: 3px;
  }
  .info_item {
    margin-top: 5px;
    margin-bottom: 10px;
  }
  .add_btn_item {
    margin-top: 5px;
    margin-bottom: 20px;
  }
  .info_name {
    padding: 2px 8px;
    border-radius: 4px;
  }
  .info_name_edit {
    background-color: #f5f5f5;
  }
  .info_delete_icon {
    color: #999999;
    font-size: 10px;
    cursor: pointer;
  }
  .student_info_box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    & > div {
      width: 49%;
    }
  }
}
</style>

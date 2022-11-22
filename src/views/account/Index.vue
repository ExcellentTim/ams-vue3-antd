<template>
  <div class="account_container" ref="accountContainer">
    <div class="basic_box">
      <div class="account_title">基础信息</div>
      <div>
        <a-form
          :model="state.basicData"
          name="basic_detail"
          @finish="onFinish"
          :hideRequiredMark="true"
          v-bind="formItemLayout"
          autocomplete="off"
        >
          <div class="avatar_form_item">
            <a-form-item label="头像">
              <a-upload
                name="avatar"
                :before-upload="beforeUpload"
                :showUploadList="false"
                accept=".jpg, .jpeg, .png"
                :action="`/api/v1/users/${userInfo.username}/`"
                :headers="headers"
                method="PATCH"
              >
                <a-avatar
                  class="upload_box"
                  :size="62"
                  :src="
                    userInfo.avatar_url ? userInfo.avatar_url : default_avatar
                  "
                >
                </a-avatar>
              </a-upload>
            </a-form-item>
          </div>

          <a-form-item
            v-if="state.nickNameOpen"
            label="昵称"
            name="nickName"
            :wrapperCol="{ span: 10 }"
            :rules="[{ required: true, message: '请输入昵称' }]"
            :extra="state.nickNameOpen && '20 个字以内，支持中英文、数字'"
          >
            <div class="label_box">
              <a-input
                class="nickname_input"
                v-model:value="state.basicData.nickName"
                placeholder="请输入昵称"
                :maxlength="20"
              ></a-input>
              <div>
                <a-space>
                  <a-button @click="cancelEditNickname">取消</a-button>
                  <a-button
                    :disabled="!state.basicData.nickName"
                    type="primary"
                    html-type="submit"
                    >保存</a-button
                  >
                </a-space>
              </div>
            </div>
          </a-form-item>
          <a-form-item label="昵称" v-else>
            <div class="label_box">
              <div>{{ state.basicData.nickName }}</div>
              <a @click="handleEditModal('nickNameOpen')">修改</a>
            </div>
          </a-form-item>
          <a-form-item label="性别">
            <span>{{ userInfo.name }}</span>
          </a-form-item>
          <a-form-item label="所属组织">
            <span>{{ userInfo.name }}</span>
          </a-form-item>
          <span class="basic_tip"
            >&emsp;&ensp;如「性别」「所属组织」信息有误，请联系管理员修改。</span
          >
        </a-form>
      </div>
    </div>
    <div class="security_box">
      <div class="account_title">账号安全</div>
      <div>
        <a-form
          name="security_detail"
          v-bind="formItemLayout"
          autocomplete="off"
        >
          <a-form-item label="手机号">
            <div class="label_box">
              <div>{{ userInfo.name }}</div>
              <a @click="handleEditModal('phone')">更换</a>
            </div>
          </a-form-item>
          <a-form-item label="登录密码">
            <div class="label_box">
              <div>已设置</div>
              <a @click="handleEditModal('password')">修改</a>
            </div>
          </a-form-item>
          <a-form-item label="邮箱">
            <div class="label_box">
              <div>{{ userInfo.name }}@163.com</div>
              <a @click="handleEditModal('email')">更换</a>
            </div>
          </a-form-item>
        </a-form>
      </div>
    </div>
    <a-modal
      :visible="state.phoneEmail"
      @ok="handleAccountform"
      :getContainer="() => accountContainer"
      :width="539"
      centered
      :closable="false"
      :destroyOnClose="true"
      @cancel="handleEditModal(state.editType)"
    >
      <div class="modal_box">
        <div class="modal_title">
          {{ phoneEmailMsg[state.editType].title }}
        </div>
        <a-form
          ref="formRef"
          :model="state.formState"
          name="form_phone_modal"
          autocomplete="off"
          :label-col="{ span: 5 }"
        >
          <a-form-item
            :name="state.editType"
            :label="phoneEmailMsg[state.editType].label"
            :rules="phoneEmailMsg[state.editType].rules"
          >
            <a-input
              v-model:value="state.formState[state.editType]"
              :placeholder="phoneEmailMsg[state.editType].placeholder"
            />
          </a-form-item>
          <a-form-item
            label="验证码"
            name="captcha"
            :rules="[{ required: true, message: '请输入验证码' }]"
          >
            <a-row :gutter="8">
              <a-col flex="3">
                <a-input
                  placeholder="请输入验证码"
                  v-model:value="state.formState['captcha']"
                />
              </a-col>
              <a-col flex="2">
                <a-button
                  :disabled="state.captchaData.disabled"
                  class="captcha_btn"
                  type="primary"
                  @click="handleCaptcha"
                >
                  {{ state.captchaData.text }}
                </a-button>
              </a-col>
            </a-row>
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
    <a-modal
      :visible="state.password"
      @ok="handleAccountform"
      :getContainer="() => accountContainer"
      :width="539"
      centered
      :closable="false"
      :destroyOnClose="true"
      @cancel="handleEditModal('password')"
    >
      <div class="modal_box">
        <div class="modal_title">您正在修改用于登录「ams」的密码</div>
        <a-form
          ref="formRef"
          :model="state.formState"
          name="form_password_modal"
          autocomplete="off"
          :label-col="{ span: 6 }"
        >
          <a-form-item
            name="oldPassword"
            label="原密码"
            :rules="[{ required: true, message: '请输入原密码' }]"
          >
            <a-input-password
              v-model:value="state.formState['oldPassword']"
              placeholder="请输入原密码"
            />
          </a-form-item>
          <a-form-item
            name="password"
            label="新密码"
            :rules="[{ required: true, message: '请输入新密码' }]"
          >
            <a-input-password
              v-model:value="state.formState['password']"
              placeholder="请输入新密码"
            />
          </a-form-item>
          <a-form-item
            name="passwordConfirm"
            label="确认密码"
            :rules="[{ required: true, message: '请输入确认密码' }]"
          >
            <a-input-password
              v-model:value="state.formState['passwordConfirm']"
              placeholder="请输入确认密码"
            />
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/store/modules/user';
import default_avatar from '@/assets/images/user/default_avatar.png';
import { message, UploadProps } from 'ant-design-vue';
import type { FormInstance } from 'ant-design-vue';
import { Storage, ACCESS_TOKEN } from '@/utils/Storage';
const userStore = useUserStore();
const userInfo = computed(() => userStore.getInfo);
const formItemLayout = { labelCol: { span: 2 }, wrapperCol: { span: 7 } };
const headers = {
  Authorization: `JWT ${Storage.get(ACCESS_TOKEN)}`
};
const phoneEmailMsg = {
  phone: {
    title: '您正在更换用于登录「ams」的手机号码',
    label: '新手机',
    url: '',
    rules: [{ required: true, message: '请输入手机号' }],
    placeholder: '请输入手机号'
  },
  email: {
    title: userStore.userInfo.username ? '您正在更换邮箱' : '您正在绑定邮箱',
    label: '新邮箱',
    url: '',
    rules: [{ required: true, message: '请输入邮箱' }],
    placeholder: '请输入邮箱'
  }
};

const accountContainer = ref();
const state = reactive({
  basicData: { nickName: userStore.userInfo.username },
  nickNameOpen: false,
  phoneEmail: false,
  password: false,
  editType: '',
  formState: {
    phone: '',
    email: '',
    oldPassword: '',
    password: '',
    passwordConfirm: '',
    captcha: ''
  },
  captchaData: {
    second: 0,
    disabled: false,
    text: '获取验证码'
  }
});

const formRef = ref<FormInstance>();
// 上传前检查资源
const beforeUpload = (file: UploadProps['fileList'][number]) => {
  const fileType = ['image/png', 'image/jpeg', 'image/bmp'];
  const type = file.type;
  if (fileType.indexOf(type) === -1) {
    message.error('请选择 .jpeg/.png/.bmp 格式的图片');
    return false;
  } else {
    const isLt20M = file.size / 1024 / 1024 > 100;
    if (isLt20M) {
      message.error('请选择小于 100 MB 的图片');
      return false;
    }
    return true;
  }
};

// 控制弹窗
const handleEditModal = type => {
  if (type === 'nickNameOpen') {
    state.basicData.nickName = userStore.userInfo.username;
  }

  if (type === 'phone' || type === 'email') {
    state.phoneEmail = !state.phoneEmail;
  } else {
    state[type] = !state[type];
  }

  state.editType = type;
  state.formState = {
    phone: '',
    email: '',
    oldPassword: '',
    password: '',
    passwordConfirm: '',
    captcha: ''
  };
  state.captchaData.second = 66;
};

const cancelEditNickname = () => {
  handleEditModal('nickNameOpen');
};

// 提交昵称
const onFinish = async (values: any) => {
  await userStore.updateUserInfo(values);
  handleEditModal('nickNameOpen');
};

watch(
  () => state.captchaData.second,
  (newValue, oldValue) => {
    if (newValue < 0) {
      state.captchaData.disabled = false;
      state.captchaData.text = '重新获取';
    } else if (newValue >= 60) {
      state.captchaData.disabled = false;
      state.captchaData.text = '获取验证码';
    } else {
      state.captchaData.disabled = true;
      state.captchaData.text = `${newValue}s 后重新获取`;
      setTimeout(() => {
        state.captchaData.second--;
      }, 1000);
    }
  }
);

// 获取验证码
const handleCaptcha = () => {
  state.captchaData.second = 59;
};

// 提交手机号或邮箱
const handleAccountform = async () => {
  try {
    const values = await formRef.value.validateFields();
    console.log('handlePhoneOk', values);
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="less" scoped>
.account_container {
  margin: 28px;
  background-color: #ffffff;
  padding: 48px;
  .account_title {
    border-left: 4px solid #0084ff;
    padding-left: 5px;
    line-height: 1;
    font-size: 22px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #2e313c;
    margin-bottom: 30px;
  }
  .label_box {
    display: flex;
    justify-content: space-between;
    .nickname_input {
      width: 306px;
    }
  }
  .basic_box {
    margin-bottom: 40px;
    .basic_tip {
      color: #999999;
    }
    .upload_box {
      cursor: pointer;
      &:hover::before {
        content: '更换头像';
        position: absolute;
        background-color: rgba(0, 0, 0, 0.3);
        width: 100%;
        height: 100%;
        left: 0;
        font-size: 14px;
        color: #ffffff;
      }
    }
    .avatar_form_item {
      :deep(.ant-form-item-label) {
        display: flex;
        align-items: center;
        justify-content: end;
      }
    }
  }
  .modal_box {
    padding: 30px 46px 0;
    .modal_title {
      text-align: center;
      font-size: 22px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #2e313c;
      margin-bottom: 40px;
    }
    .captcha_btn {
      width: 123px;
    }
  }
}
</style>

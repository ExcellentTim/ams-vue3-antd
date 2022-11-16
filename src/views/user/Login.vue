<template>
  <div class="container">
    <div class="content">
      <div><img src="~@/assets/logo.png" width="200" /></div>
      <div class="title">AI 魔法家管理平台</div>
      <div class="form_box">
        <a-form
          name="basic"
          autocomplete="off"
        >
          <a-form-item v-bind="validateInfos.phone">
            <a-input v-model:value="modelRef.phone" size="large" placeholder="请输入 11 位手机号" />
          </a-form-item>

          <a-form-item v-bind="validateInfos.password">
            <a-input v-model:value="modelRef.password" size="large" placeholder="请输入密码" />
          </a-form-item>

          <a-button block type="primary" size="large" @click="onSubmit">登录</a-button>
        </a-form>
      </div>
      <div class="tip">没有账号或忘记密码？请联系管理员</div>  
    </div>
  </div>
</template>

<script lang="ts" setup>
import { userLogin } from "@/api/user";
import { Storage, ACCESS_TOKEN } from '@/utils/Storage';
import { Form } from 'ant-design-vue';
const useForm = Form.useForm;
const modelRef = reactive({
  phone: '',
  password: ''
});
const rulesRef = reactive({
  phone: [
    { required: true, whitespace:true, message: '请输入 11 位手机号' },
    { pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, message: '请输入正确格式的手机号' }
  ],
  password: [{ required: true, whitespace:true, message: '请输入密码' }]
});

const { validate, validateInfos } = useForm(modelRef, rulesRef);

const onSubmit = async () => {
  try {
    const data = await validate()
    const res = await userLogin(data)
    console.log('res',res);
    if (res.token){
      Storage.set(ACCESS_TOKEN,res.token)
      location.href = '/'
    } else {
      const key = Object.keys(res)[0]
      validateInfos[key].validateStatus = 'error'
      validateInfos[key].help = Object.values(res) 
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="less" scoped>
.container{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.content{
  flex-shrink: 0;
  width: 446px;
  background: #FFFFFF;
  box-shadow: 0px 2px 50px 0px #F0F4F9;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 40px 60px;
  .title{
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #2E313C;
    margin: 22px 0 36px;
  }
  .form_box{
    width: 100%;
  }
  .tip{
    color: #999999;
    margin-top: 36px;
  }
}
</style>
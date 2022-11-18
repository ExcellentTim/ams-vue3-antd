<template>
  <div style="margin-right: 12px">
    <a-space>
      <!-- <a
        style="padding: 0 12px; display: inline-block; user-select: none"
        @click="handleClick"
        ><BgColorsOutlined
      /></a> -->
      <a-dropdown>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <!-- <template #icon>
                <SettingOutlined />
              </template> -->
              <router-link :to="{ path: '/account' }"
                >&#x3000;账号信息&#x3000;</router-link
              >
            </a-menu-item>
            <a-menu-item>
              <!-- <template #icon>
                <LogoutOutlined />
              </template> -->
              <span @click="handleLogout">&#x3000;安全退出&#x3000;</span>
            </a-menu-item>
          </a-menu>
        </template>
        <div>
          <a-avatar shape="square" size="small">
            <template #icon>
              <UserOutlined />
            </template>
          </a-avatar>
          {{ currentUser.name }}
        </div>
      </a-dropdown>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import { createVNode } from 'vue';
import { UserOutlined, ExclamationCircleFilled } from '@ant-design/icons-vue';
// import { apply, randomTheme } from '@/hooks/useTheme';
import { useUserStore } from '@/store/modules/user';
import { RouterLink } from 'vue-router';
import { Modal } from 'ant-design-vue';

defineProps<{
  currentUser: API.AdminUserInfo;
}>();

const store = useUserStore();

const handleLogout = () => {
  Modal.confirm({
    title: '确定要退出登录吗？',
    icon: createVNode(ExclamationCircleFilled),
    cancelText: '再看看',
    okText: '确定',
    centered: true,
    onOk() {
      store.logout();
    }
  });
};
// const handleClick = () => {
//   apply(randomTheme());
// };
</script>

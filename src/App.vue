<template>
  <ConfigProvider :locale="zhCN">
    <router-view />
  </ConfigProvider>
</template>

<script setup lang="ts">
import { ConfigProvider } from 'ant-design-vue';
import { useUserTheme } from './hooks/useTheme';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import 'dayjs/locale/zh-cn';
useUserTheme();
</script>

<style lang="less">
#app {
  height: 100%;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  word-break: break-all;
}

// antd ------

.ant-pro-sider {
  z-index: 20;
}

.ant-btn {
  border-radius: 4px;
}

.ant-menu-sub.ant-menu-inline {
  background-color: #ffffff;
}
.ant-menu-item .ant-menu-item-icon,
.ant-menu-item .anticon,
.ant-menu-submenu-title .ant-menu-item-icon,
.ant-menu-submenu-title .anticon {
  font-size: 18px;
}

.ant-modal-content {
  border-radius: 8px;
}
// 收缩导航菜单栏按钮隐藏
.ant-menu-inline.ant-menu-root .ant-pro-sider-collapsed-button {
  display: none;
}
// ------

// 自定义------
.container {
  background-color: #ffffff;
  padding: 24px;
}

.ams-btn {
  width: 118px;
  height: 40px;
}

.light_color {
  color: #999999;
}

.move_active {
  cursor: pointer;
  &:hover {
    color: #0084ff;
  }
}
.empty_img {
  padding: 125px 0;
  & > img {
    width: 131px;
    height: 100px;
  }
}
// ------

// .slide-left-enter-active,
// .slide-left-leave-active,
// .slide-right-enter-active,
// .slide-right-leave-active {
//   transition-duration: 0.5s;
//   transition-property: height, opacity, transform;
//   transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
//   overflow: hidden;
// }

// .slide-left-enter,
// .slide-right-leave-active {
//   opacity: 0;
//   transform: translate(2em, 0);
// }

// .slide-left-leave-active,
// .slide-right-enter {
//   opacity: 0;
//   transform: translate(-2em, 0);
// }

// .zoom-enter-active,
// .zoom-leave-active {
//   animation-duration: 0.3s;
//   animation-fill-mode: both;
//   animation-name: zoomIn;
// }

// .zoom-leave-active {
//   // animation-direction: reverse;
// }

// @keyframes zoomIn {
//   from {
//     opacity: 0;
//     transform: scale3d(0.95, 0.95, 0.95);
//   }

//   100% {
//     opacity: 1;
//   }
// }
// @keyframes zoomOut {
//   0% {
//     opacity: 1;
//   }

//   to {
//     opacity: 0;
//     transform: scale3d(0.95, 0.95, 0.95);
//   }
// }
</style>

/// <reference types="vite/client" />

declare module '*.vue' {
  import { ComponentOptions } from 'vue';
  const componentOptions: ComponentOptions;
  export default componentOptions;
}

interface Window {
  readonly PKG: Record<string, string>;
}

declare module 'lodash-es';

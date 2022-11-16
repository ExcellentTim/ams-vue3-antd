/// <reference types="vite/client" />

declare module '*.vue' {
  import { ComponentOptions } from 'vue';
  const componentOptions: ComponentOptions;
  export default componentOptions;
}

interface Window {
  readonly PKG: Record<string, string>;
  process: any;
}

declare module 'lodash-es';

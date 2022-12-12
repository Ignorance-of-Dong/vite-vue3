import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// Element
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      // scss: {
      //   additionalData: '@import "./src/styles/var.scss";',
      // },
    },
  },
  server: {
    host: "0.0.0.0",
  },

  plugins: [
    vue({
      reactivityTransform: false, // 开启ref转换
    }),
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: [
        "vue",
        "pinia",
        "vue-router",
        // {
        //   "@/utils/request": ["requestControl"],
        // },
      ],
      eslintrc: {
        enabled: true, // Default `false`
        filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
      vueTemplate: true,
      dts: true, //auto generation auto-imports.d.ts file
    }),
    Components({
      resolvers: [
        // 自动导入 Element Plus 组件
        ElementPlusResolver({
          importStyle: "sass",
        }),
      ],
      dts: true,
    }),
  ],
});

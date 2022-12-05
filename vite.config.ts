/*
 * @Author: zhangzheng
 * @Date: 2022-12-05 16:12:41
 * @LastEditors: zhangzheng
 * @LastEditTime: 2022-12-05 17:15:20
 * @Descripttion:
 */
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});

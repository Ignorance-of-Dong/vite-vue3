import { createApp } from "vue";
import { createPinia } from "pinia";
import { i18n } from "@/locales/index";

import App from "./App.vue";
import router from "./router";
import "./styles/layout.scss";

// 全局组件
import globalComponent from "@/components";

// Element Plus Icon
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);

app.use(createPinia());

// 注册全局组件
app.use(globalComponent);

// 注册Element Icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(router);
app.use(i18n);

app.mount("#app");

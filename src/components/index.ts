import type { Component, App } from "vue";
import FishIcon from "./icon/FishIcon.vue";
import FishButtonIcon from "./icon/FishButtonIcon.vue";

const components: {
  [propName: string]: Component;
} = {
  FishIcon,
  FishButtonIcon,
};

export default {
  install(app: App) {
    for (const key in components) {
      app.component(key, components[key]);
    }
  },
};

import type { Component, App } from "vue";
import FishIcon from "./icon/FishIcon.vue";
import FishButtonIcon from "./icon/FishButtonIcon.vue";
import FishDialog from "./dialog/FishDialog.vue";

const components: {
  [propName: string]: Component;
} = {
  FishIcon,
  FishButtonIcon,
  FishDialog,
};

export default {
  install(app: App) {
    for (const key in components) {
      app.component(key, components[key]);
    }
  },
};

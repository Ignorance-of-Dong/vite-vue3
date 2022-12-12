import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/layout/Layout.vue";
const modules = import.meta.glob("../views/**/*.vue");
const _import_ = (file: string) => modules["../" + file + ".vue"];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Layout,
      children: [
        {
          path: "",
          component: _import_("views/dashboard/Dashboard"),
        },
      ],
    },
  ],
});

export default router;

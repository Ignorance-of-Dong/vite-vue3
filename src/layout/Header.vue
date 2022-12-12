<template>
  <el-header class="flex-center flex">
    <fish-button-icon
      elementIcon="Expand"
      :size="24"
      v-if="asideStore.isCollapse"
      @click="handleToggleAside"
    ></fish-button-icon>
    <fish-button-icon
      elementIcon="Fold"
      :size="24"
      v-else
      @click="handleToggleAside"
    ></fish-button-icon>
  </el-header>
</template>

<script setup lang="ts">
import { useAsideStore } from "@/stores/aside";

const asideStore = useAsideStore();
const handleToggleAside = () => {
  asideStore.asideToggle();
};
</script>

<style lang="scss" scoped></style>

<template>
  <el-icon :size="size" v-if="elementIcon">
    <component :is="elementIcon"></component>
  </el-icon>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    iconfont?: string;
    size?: string | number;
    elementIcon: string;
  }>(),
  {
    size: "18",
  }
);
</script>

<style lang="scss" scoped></style>

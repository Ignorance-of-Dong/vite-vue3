<template>
  <el-aside
    :width="
      asideStore.isCollapse
        ? 'calc( var(--el-menu-icon-width) + var(--el-menu-base-level-padding) * 2 )'
        : '300px'
    "
  >
    <div class="aside-header">Fish Admin</div>

    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="asideStore.isCollapse"
      active-text-color="red"
      background-color="#293042"
      text-color="#fff"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>Navigator One</span>
        </template>
        <el-menu-item-group>
          <template #title><span>Group One</span></template>
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item two</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="1-4">
          <template #title><span>item four</span></template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        <template #title>Navigator Two</template>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <el-icon><document /></el-icon>
        <template #title>Navigator Three</template>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><setting /></el-icon>
        <template #title>Navigator Four</template>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script setup lang="ts">
import { useAsideStore } from "@/stores/aside";

const asideStore = useAsideStore();
</script>

<style lang="scss">
.aside-header {
  height: 60px;
  padding: 0 20px;
  text-align: center;
  line-height: 60px;
  color: #fff;
}
</style>

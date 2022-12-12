<template>
  <div class="main-container">
    <el-container>
      <Aside />
      <el-container>
        <Header />
        <el-main>
          <RouterView />
        </el-main>
        <el-footer>Footer </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Aside from "@/layout/Aside.vue";
import Header from "@/layout/Header.vue";
</script>

<style lang="scss" scoped></style>

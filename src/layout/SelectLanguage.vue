<!--
 * @Author: xiaowei
 * @Date: 2022-08-25 18:34:16
 * @LastEditors: xiaowei
 * @LastEditTime: 2022-12-01 11:44:52
 * @Description: 
-->
<template>
  <el-dropdown
    trigger="click"
    class="margin-horizontal-16 margin-vertical-8"
    @command="handleSwitchLanguage"
  >
    <span class="el-dropdown-link">
      <el-image :src="flags[locale]" class="flag-img" fit="cover" />
    </span>
    <template #dropdown>
      <el-dropdown-menu class="language-dropdown-menu">
        <el-dropdown-item command="zh-cn">
          <el-image :src="flags['zh-cn']" class="flag-img" fit="cover" />
          {{ LANGUAGE_TEXT["zh-cn"] }}
        </el-dropdown-item>
        <el-dropdown-item command="en">
          <el-image :src="flags['en']" class="flag-img" fit="cover" />
          {{ LANGUAGE_TEXT["en"] }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script lang="ts" setup>
import { LANGUAGE_KEY, LANGUAGE_TEXT } from "@/config";
import { i18n } from "@/locales";
import { setCookie } from "tiny-cookie";
import { useI18n } from "vue-i18n";

// flags
import cn from "@/assets/flags/cn.png";
import en from "@/assets/flags/us.png";
const flags = reactive({
  "zh-cn": cn,
  en,
});

const { locale } = useI18n();
const handleSwitchLanguage = (lang) => {
  if (i18n.mode === "legacy") {
    i18n.global.locale = lang;
  } else {
    i18n.global.locale.value = lang;
  }
  setCookie(LANGUAGE_KEY, unref(locale));
};
</script>
<style lang="scss" scoped>
.el-dropdown-menu {
  :deep(.el-dropdown-menu__item) {
    &.language-dropdown-active:not(.is-disabled) {
      background-color: var(--el-dropdown-menuItem-hover-fill);
      color: var(--el-dropdown-menuItem-hover-color);
    }
    .flag-img {
      width: 26px;
      height: 18px;
    }
  }
}
.flag-img {
  // border-radius: 50%;
  width: 29px;
  height: 20px;
  border: 1px #ddd solid;
}
</style>

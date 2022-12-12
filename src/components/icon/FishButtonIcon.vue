<!--
 * @Author: xiaowei
 * @Date: 2022-08-12 11:38:20
 * @LastEditors: xiaowei
 * @LastEditTime: 2022-12-05 11:49:46
 * @Description: Icon按钮
-->
<template>
  <el-button link @click="handleClick" :disabled="disabled" :type="color">
    <el-tooltip
      :content="text"
      :disabled="!tooltip || !text"
      :placement="placement"
      :show-after="1000"
    >
      <fish-icon
        :iconfont="iconfont ? iconfont : ''"
        :element-icon="elementIcon ? elementIcon : ''"
        :size="size"
      ></fish-icon>
    </el-tooltip>
  </el-button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    tooltip?: boolean;
    iconfont?: string;
    elementIcon?: string;
    placement?: string;
    disabled?: boolean;
    text?: string;
    color?: string;
    size?: string | number;
  }>(),
  {
    feather: "",
    iconfont: "",
    elementIcon: "",
    placement: "bottom",
    text: "",
    color: "",
    size: "18",
    tooltip: true,
  }
);

// 点击事件
const emit = defineEmits(["click"]);
const handleClick = () => {
  emit("click");
};
</script>

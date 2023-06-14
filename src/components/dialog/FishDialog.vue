<template>
  <el-dialog
    id="dtcs-dialog"
    ref="dtcsDialog"
    :title="title"
    v-model="dialog"
    :width="width"
    :before-close="beforeClose"
    :show-close="false"
    :custom-class="customClass"
    :append-to-body="appendToBody"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape"
    :modal="modal"
  >
    <template #title>
      <div class="dtcs-dialog-title flex">
        <div class="title-text">{{ title }}</div>
        <div class="spacer"></div>
        <i
          class="el-icon-close pointer"
          v-if="showClose"
          @click="handleCancel"
        ></i>
      </div>
    </template>
    <div v-loading="loading">
      <div
        class="dtcs-dialog-container"
        :style="{
          height: height,
        }"
      >
        <slot></slot>
      </div>
      <div class="dtcs-dialog-footer text-right" ref="dialogBottom">
        <slot name="operationAreaStart"></slot>
        <el-button v-if="isCancelButton" @click="handleCancel">
          {{ cancelButtonText ? cancelButtonText : $t("common.button.cancel") }}
        </el-button>
        <el-button
          type="primary"
          v-if="isConfirmButton"
          @click="handleSubmit"
          :disabled="confirmDisabled"
        >
          {{
            confirmButtonText ? confirmButtonText : $t("common.button.confirm")
          }}
        </el-button>
        <slot name="operationArea"></slot>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    modal: boolean;
    confirmButtonText: string;
    cancelButtonText: string;
    isConfirmButton: boolean;
    closeOnPressEscape: boolean;
    confirmDisabled: boolean;
    isCancelButton: boolean;
    width: string;
    customClass: string;
    showClose: boolean;
    title: string;
    appendToBody: boolean;
    loading: boolean;
    closeOnClickModal: boolean;
  }>(),
  {
    modelValue: false,
    modal: true,
    isConfirmButton: true,
    closeOnPressEscape: false,
    confirmDisabled: false,
    isCancelButton: true,
    width: "500px",
    customClass: "",
    showClose: true,
    title: "",
    appendToBody: false,
  }
);

// v-model
const dialog = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

let height = ref<string | number>("auto");

onMounted(() => {
  calcDialogHeight();
});

let dialogBottom: any = ref();
let dtcsDialog: any = ref();
const calcDialogHeight = () => {
  nextTick(() => {
    setTimeout(() => {
      let documentHeight = document.documentElement.clientHeight;
      let dialogRef = dialogBottom.value;
      if (!dialogRef) return;
      let bottom = dialogRef.clientHeight;
      console.log(dtcsDialog.value.dialogContentRef.$el.lastElementChild);
      console.log(dtcsDialog.value);

      let dialogRect = dtcsDialog.value.dialogContentRef.$el.lastElementChild;
      let { top, height } = dialogRect.getBoundingClientRect();
      console.log(height, top * 2, documentHeight);
      console.log(height + top * 2 > documentHeight);
      console.log(documentHeight - top * 2 - 48 - bottom + "px");

      if (height + top * 2 > documentHeight) {
        height = documentHeight - top * 2 - 48 - bottom + "px";
      } else {
        height = "auto";
      }
    }, 100);
  });
};

const emit = defineEmits<{
  (e: "handleCancel"): void;
  (e: "handleSubmit"): void;
  (e: "update:modelValue", v): void;
}>();
const beforeClose = () => {
  emit("handleCancel");
};
const handleCancel = () => {
  emit("handleCancel");
};
const handleSubmit = () => {
  emit("handleSubmit");
};
</script>
<style lang="scss" scoped>
:deep(.el-dialog) {
  .el-dialog__header {
    width: 100%;
    padding: 0;
  }
  .dtcs-dialog-title {
    height: 48px;
    padding: 0 24px;
    border-bottom: 1px solid #d8d8d8;
    font-size: 16px;
    display: flex;
    align-items: center;
  }
  .el-dialog__body {
    padding: 0px;
    overflow-y: auto;
    .dtcs-dialog-container {
      overflow-y: auto;
      padding: 16px 24px;
      .el-form--label-top {
        .el-form-item {
          margin-bottom: 16px;
          .el-form-item__label {
            line-height: 21px;
            padding-bottom: 8px;
          }
          .el-form-item__error {
            position: relative;
            padding: 2px 0;
          }
          &:last-child {
            margin-bottom: 0;
          }
        }
        .is-error {
          margin-bottom: 0px;
        }
      }
      .pagination-container {
        padding-bottom: 0 !important;
      }
    }
  }
  .dtcs-dialog-footer {
    border-top: 1px solid #d8d8d8;
    padding: 8px 24px;
  }
}
</style>

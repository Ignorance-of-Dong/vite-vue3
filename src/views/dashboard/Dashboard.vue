<template>
  <div>{{ $t("dashboard") }}</div>
  111
  <!-- <fish-dialog v-model="s">
    <p>11</p>
    <p>11</p>
    <p>11</p>
    <p>11</p>
    <p>11</p>
    <p>11</p>
    <p>11</p>
    <p>11</p>
    <p>11</p>
    <p>11</p>
    <p>11</p>
    <p>11</p>
    <p>11</p>
    <p>11</p>
    <p>11</p>
    <p>11</p>
    <p>11</p>
    <p>11</p>
    <p>11</p>
    <p>11</p>
  </fish-dialog> -->
  <div>{{ number }}</div>
  <div>{{ msg }}</div>
  <button @click="handleClick">click</button>
</template>

<script setup lang="ts">
const number = ref(0);
const msg = ref("init");
function handleClick() {
  for (let i = 0; i < 1000; i++) {
    number.value++;
  }
  msg.value = "hello world";
}

watch(
  () => number.value,
  (val) => {
    console.log(val);
  }
);
</script>

<style lang="scss" scoped></style>

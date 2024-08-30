<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue';
onMounted(() => {
  if (!localStorage.getItem('BotRes')) {
    localStorage.setItem('BotRes', JSON.stringify([{
      my: false,
      msg: '您好,我是Chart Gpt OpenAI机器人,请问有什么问题可以帮助您?'
    }]))
  }
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>

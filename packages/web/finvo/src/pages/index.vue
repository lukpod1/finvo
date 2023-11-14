<template>
  <Loading />
</template>

<script setup lang="ts">
import Loading from "@/components/Loading.vue";
import { router } from "@/main";

const token = localStorage.getItem('session');
setInterval(() => {
  if (token) {
    router.push('/dashboard');
  } else {
    router.push('/login')
  }
}, 1000);
</script>

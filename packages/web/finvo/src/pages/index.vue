<template>
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-80 w-80 border-t-2 border-b-2 border-white"></div>
  </div>
</template>

<script lang="ts">
import Loading from "@/components/Loading.vue";

export default {
  // mounted() {
  //   const token = localStorage.getItem("session");
  //   if (token) {
  //     this.$router.push("/dashboard");
  //   } else {
  //     this.$router.push("/login");
  //   }
  // }
}
</script>

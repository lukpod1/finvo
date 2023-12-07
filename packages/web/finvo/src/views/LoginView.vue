<template>
  <div className="bg-black h-screen flex flex-col justify-center items-center">
    <div className="bg-white h-3/4 w-4/5 rounded-lg shadow-lg flex flex-col justify-center items-center animate-fade-in">
      <div className="w-full">
        <h1 className="text-black text-center text-2xl md:text-4xl font-bold mb-6">
          Finvo
        </h1>
      </div>
      <div className="w-full self-center flex flex-col justify-center items-center">
        <a :href="API_URL">
          <button
            className="bg-black text-white rounded-md px-8 py-4 text-sm sm:text-lg md:text-xl lg:text-2xl hover:bg-white hover:text-black hover:border-black border-2 border-black transition duration-300 ease-in-out">
            Continue with Google
          </button>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRoute, useRouter } from "vue-router";
import { useCookies } from "vue3-cookies"

const API_URL = ref(`${import.meta.env.VITE_APP_API_URL}/auth/google/authorize`)
const route = useRoute()
const router = useRouter()
const { cookies } = useCookies()

const token = ref(route.query.token)

if (token.value) {
  cookies.set('session', token.value.toString())
  router.push('/dashboard')
}
</script>

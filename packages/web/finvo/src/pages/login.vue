
<template>
    <div class="bg-black h-screen flex flex-col justify-center items-center">
        <div class="bg-white h-3/4 w-4/5 rounded-lg shadow-lg flex flex-col justify-center items-center animate-fade-in">
            <div class="w-full">
                <h1 class="text-black text-center text-2xl md:text-4xl font-bold mb-6">
                    Finvo
                </h1>
            </div>
            <div class="w-full self-center flex flex-col justify-center items-center">
                <RouterLink :to="SESSION_API_URL">
                    <button
                        class="bg-black text-white rounded-md px-8 py-4 text-sm sm:text-lg md:text-xl lg:text-2xl hover:bg-white hover:text-black hover:border-black border-2 border-black transition duration-300 ease-in-out">
                        Continue with Google
                    </button>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router/auto';

const SESSION_API_URL = `${import.meta.env.VITE_SESSION_API_URL}/auth/google/authorize`;
console.log(SESSION_API_URL)
</script>
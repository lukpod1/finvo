<template>
    <div className="bg-black flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-80 w-80 border-t-2 border-b-2 border-white"></div>
    </div>
</template>

<style>
@keyframes fade-in {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.animate-fade-in {
    animation: fade-in 1s ease-out;
}
</style>
<script setup>
const { locale } = useI18n()
</script>

<template >
    <!-- Sidebar -->
    <div class="bg-white dark:bg-slate-800 border-r-8 border-black dark:border-blue-800 h-screen w-64">
        <h1 class="text-black dark:text-white"> {{ $t('home') }} </h1>
    </div>
</template>
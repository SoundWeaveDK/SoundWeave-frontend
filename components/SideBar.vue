<script setup>
const { locale } = useI18n()
</script>

<template >
    <!-- Sidebar -->
    <div class="bg-white  border-r-4 border-black min-h-screen w-64 flex flex-row">
        <h1> {{ $t('home') }} </h1>
    </div>
</template>
<script setup>
const { locale } = useI18n()
</script>

<template>
    <div class=" h-screen p-4">
        <h1 class="lg:pl-28 mobile:text-center text-xl text-black dark:text-white">{{ $t('yourFeed') }}</h1>
        <PodcastBox />
    </div>
</template>

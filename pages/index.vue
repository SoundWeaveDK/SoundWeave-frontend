<script setup>
const { locale } = useI18n()
</script>

<template>
    <div class="w-full">
        <div>
            <p>{{ $t('welcome') }}</p>
        </div>
        <div>
            <PodcastBox />
        </div>
    </div>
</template>

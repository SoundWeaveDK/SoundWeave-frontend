<script setup lang="ts">
const blob = await GetSingleBlob("dddd.JPG");
</script>

<template>
  <div>
    <h1 style="color: white">{{ blob }}</h1>
    <img :src="blob" />
  </div>
</template>

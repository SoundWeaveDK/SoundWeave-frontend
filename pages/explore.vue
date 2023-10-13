<template>
    <PodcastBox :podcastData="podcastData" />
</template>
<script>
import axios from '@/utils/axiosInstance.ts'

export default {
    data() {
        return {
            podcastData: [],
        };
    },
    created() {
        this.getUserPodcasts();
    },
    methods: {
        async getUserPodcasts() {
            await axios.get('/api/podcast/read-preview-podcasts', {
            }).then((response) => {
                this.podcastData = response.data;
            }).catch((error) => {
                if (error) {
                    alert((error));
                }
            });
        },
    },
};
</script>

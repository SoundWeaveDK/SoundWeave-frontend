<template>
    <PodcastBox :podcastData="podcastData" />
</template>
<script>
import axios from '@/utils/axiosInstance.ts'
import { useUserStore } from "../stores/login"
import { mapStores } from "pinia";

export default {
    computed: {
        ...mapStores(useUserStore)
    },
    created() {
        if (this.userStore.getUser.id) {
            this.getLoggedInPreviewPodcasts();
        }
        else {
            this.getPreviewPodcasts();
        }
    },
    data() {
        return {
            podcastData: [],
        };
    },
    methods: {
        async getLoggedInPreviewPodcasts() {
            await axios.get('/api/podcast/read-explore-podcast', {
                headers: {
                    Authorization: `Bearer ${this.userStore.getAccessToken}`,
                }
            }).then((response) => {
                this.podcastData = response.data;
            }).catch((error) => {
                if (error) {
                    alert((error));
                }
            });
        },
        async getPreviewPodcasts() {
            await axios.get('/api/podcast/read-preview-podcast').then((response) => {
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

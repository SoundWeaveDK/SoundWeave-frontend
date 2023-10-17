<template>
    <PodcastBox :podcastData="podcastStore.getPodcasts" />
</template>
<script>
import axios from '@/utils/axiosInstance.ts'
import { useUserStore } from "../stores/login"
import { mapStores } from "pinia";
import { usePodcastStore } from '~/stores/podcast';

export default {
    computed: {
        ...mapStores(useUserStore, usePodcastStore)
    },
    created() {
        if (this.userStore.getUser.id) {
            this.getLoggedInPreviewPodcasts();
        }
        else {
            this.getPreviewPodcasts();
        }
    },
    methods: {
        async getLoggedInPreviewPodcasts() {
            await axios.get('/api/podcast/read-explore-podcast', {
                headers: {
                    Authorization: `Bearer ${this.userStore.getAccessToken}`,
                }
            }).then((response) => {
                this.podcastStore.setPodcasts(response.data);
            }).catch((error) => {
                if (error) {
                    alert((error));
                }
            });
        },
        async getPreviewPodcasts() {
            await axios.get('/api/podcast/read-preview-podcast').then((response) => {
                this.podcastStore.setPodcasts(response.data);
            }).catch((error) => {
                if (error) {
                    alert((error));
                }
            });
        },
    },
};
</script>

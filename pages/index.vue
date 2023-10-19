<template>
    <div class="px-24 py-12">
        <div class="mb-8 ml-2">
            <h1 class=" mobile:text-center text-2xl text-black dark:text-white">{{ $t('recomended') }}</h1>
        </div>
        <div>
            <PodcastBox :podcastData="podcastStore.getPodcasts" />
        </div>
    </div>
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
                    console.log(error);
                }
            });
        },
        async getPreviewPodcasts() {
            await axios.get('/api/podcast/read-preview-podcast').then((response) => {
                this.podcastStore.setPodcasts(response.data);
            }).catch((error) => {
                if (error) {
                    console.log(error);
                }
            });
        },
    },
};
</script>

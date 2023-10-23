<template>
    <div v-if="loaded" class=" px-24 py-12">
        <div class="mb-8 ml-2">
            <h1 class=" mobile:text-center text-2xl text-black dark:text-white">{{ $t('recomended') }}</h1>
        </div>
        <div>
            <PodcastBox v-if="podcastStore.getPodcasts[0]" :podcastData="podcastStore.getPodcasts" />
            <div v-else class="flex justify-center items-center">
                <h1 class="text-2xl text-black dark:text-white">{{ $t('noPodcasts') }}</h1>
            </div>
        </div>
    </div>
    <div v-else class="flex justify-center items-center h-full">
        <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
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
    data() {
        return {
            loaded: false,
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
                this.loaded = true;
            }).catch((error) => {
                if (error) {
                    console.log(error);
                }
            });
        },
        async getPreviewPodcasts() {
            await axios.get('/api/podcast/read-preview-podcast').then((response) => {
                this.podcastStore.setPodcasts(response.data);
                this.loaded = true;
            }).catch((error) => {
                if (error) {
                    console.log(error);
                }
            });
        },
    },
};
</script>

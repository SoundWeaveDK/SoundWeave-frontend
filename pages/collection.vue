<template>
    <div class="w-full h-full p-8">
        <h1 class="text-black dark:text-white text-2xl font-bold">{{ $t('yourCollection') }}</h1>

        <div class="mt-8">
            <div class="p-4 border-solid border-2 border-blue-950 m-4">
                <div class="p-4">
                    <p class="text-black dark:text-white text-xl font-bold">{{ $t('listenLater') }}</p>
                </div>
                <div>
                    {{ console.log(watchLaterStore.getWatchLater) }}
                    <!-- {{ console.log(watchLaterStore.getWatchLater.map(item => item.fk_podcast_id)) }} -->
                    <PodcastBox v-if="watchLaterStore.getWatchLater[0]"
                        :podcastData="watchLaterStore.getWatchLater.map(item => item.fk_podcast_id)" />
                    <p v-else class="p-4 text-black dark:text-white text-md font-bold">{{ $t('noWatchLater') }}</p>
                </div>
            </div>

            <div class="p-4 border-solid border-2 border-blue-950 m-4">
                <div class="p-4">
                    <p class="text-black dark:text-white text-xl font-bold">{{ $t('history') }}</p>
                </div>
                <div>
                    <PodcastBox v-if="false" />
                    <p v-else class="p-4 text-black dark:text-white text-md font-bold">{{ $t('noHistory') }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>

definePageMeta({
    middleware: ["auth"]
})
</script>

<script>
import axios from '@/utils/axiosInstance.ts'
import { mapStores } from 'pinia'
import { useUserStore } from '~/stores/login';
import { usePodcastStore } from '~/stores/podcast'
import { useWatchLaterStore } from '~/stores/watchLater'

export default {
    name: "Collection",
    computed: {
        ...mapStores(useUserStore, usePodcastStore, useWatchLaterStore),
    },
    created() {
        this.getWatchLater();
        this.getHistory();
    },
    methods: {
        async getWatchLater() {
            await axios.get('/api/watchlater/read-users-watch-later/' + this.userStore.getUser.id, {
                headers: {
                    Authorization: `Bearer ${this.userStore.getAccessToken}`
                }
            }).then((response) => {
                console.log(response.data);
                this.watchLaterStore.setWatchLater(response.data);
            }).catch((error) => {
                if (error) {
                    console.log(error);
                }
            });
        },
        async getHistory() {
            await axios.get('/api/podcastviewed/read-users-podcast-viewed/' + this.userStore.getUser.id, {
                headers: {
                    Authorization: `Bearer ${this.userStore.getAccessToken}`
                }
            }).then((response) => {
                console.log(response.data);
            }).catch((error) => {
                if (error) {
                    console.log(error);
                }
            });
        }
    }
}


</script>
<template>
    <div class="w-full h-full p-8">
        <h1 class="text-black dark:text-white text-2xl font-bold">{{ $t('yourCollection') }}</h1>

        <div class="mt-8">
            <div class="p-4 border-solid border-2 border-blue-950 m-4">
                <div class="p-4">
                    <p class="text-black dark:text-white text-xl font-bold">
                        <Icon name="material-symbols:bookmark-add-outline" size="1.5em" />
                        {{ $t('listenLater') }}
                    </p>
                </div>
                <div>
                    <WatchLaterBox v-if="watchLaterStore.getWatchLater[0]" :podcastData="watchLaterStore.getWatchLater" />
                    <p v-else class="p-4 text-black dark:text-white text-md font-bold">{{ $t('noWatchLater') }}</p>
                </div>
            </div>

            <div class="p-4 border-solid border-2 border-blue-950 m-4">
                <div class="p-4 flex">
                    <p class="text-black dark:text-white text-xl font-bold">
                        <Icon name="material-symbols:history-rounded" size="1.5em" />
                        {{ $t('history') }}
                    </p>
                    <button class="text-black dark:text-white text-md font-bold hover:text-gray-400 ml-auto"
                        @click="deleteHistory">
                        <Icon name="mdi:close" size="1.5em" />
                    </button>
                </div>
                <div>
                    <HistoryBox v-if="viewedStore.getViewed[0]" :podcastData="viewedStore.getViewed" />
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
import { useViewedStore } from '~/stores/viewed';
import { useWatchLaterStore } from '~/stores/watchLater'

export default {
    name: "Collection",
    computed: {
        ...mapStores(useUserStore, usePodcastStore, useWatchLaterStore, useViewedStore),
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
                this.watchLaterStore.setWatchLater(response.data)
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
                const uniquePodcast = [...new Map(response.data.map(item => [item['podcastId'], item])).values()]
                this.viewedStore.setViewed(uniquePodcast)
            }).catch((error) => {
                if (error) {
                    console.log(error);
                }
            });
        },
        async deleteHistory() {
            await axios.delete('/api/podcastviewed/delete-all-viewed/' + this.userStore.getUser.id, {
                headers: {
                    Authorization: `Bearer ${this.userStore.getAccessToken}`
                }
            }).then((response) => {
                this.viewedStore.setViewed(response.data)
            }).catch((error) => {
                if (error) {
                    alert((error));
                }
            });
        },
    }
}
</script>
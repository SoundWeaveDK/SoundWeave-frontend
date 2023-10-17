<template>
    <div class="w-full h-full p-8">
        <h1 class="text-black dark:text-white text-2xl font-bold">Collection</h1>

        <div class="mt-8">
            <div>
                <p class="text-black dark:text-white text-xl font-bold">Watch Later</p>

                <div>
                    {{ console.log(watchLaterStore.getWatchLater.map(item => item.fk_podcast_id)) }}
                    <!-- <PodcastBox :podcastData="watchLaterStore.getWatchLater.map(item => item.fk_podcast_id)" /> -->
                </div>

            </div>

            <div>
                <p class="text-black dark:text-white text-xl font-bold">History</p>
                <div>
                    <PodcastBox />
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
                this.watchLaterStore.setWatchLater(response.data);
            }).catch((error) => {
                if (error) {
                    alert((error));
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
                    alert((error));
                }
            });
        }
    }
}


</script>
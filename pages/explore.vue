<template>
    <div v-if="loaded" class="px-24 py-12">
        <div class="mb-8 ml-2">
            <h1 class="mobile:text-center text-2xl text-black dark:text-white">{{ $t('yourFeed') }}</h1>
        </div>
        <div>
            <PodcastBox v-if="podcastData[0]" :podcastData="podcastData" />
            <div v-else class="flex justify-center items-center">
                <h1 class="text-2xl text-black dark:text-white">{{ $t('noPodcasts') }}</h1>
            </div>
        </div>
    </div>
    <div v-else class="flex justify-center items-center h-full">
        <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
    </div>
</template>

<script setup>

definePageMeta({
    middleware: ["auth"]
})
</script>

<script>
import axios from '@/utils/axiosInstance.ts'
import { useUserStore } from "../stores/login"
import { mapStores } from "pinia";

export default {
    name: 'Home',
    setup() {
        const { locale } = useI18n()
        return { locale }
    },
    computed: {
        ...mapStores(useUserStore)
    },
    created() {
        this.token = this.userStore.getAccessToken;
        this.loggedInUser = this.userStore.getUser;
        if (this.loggedInUser.id) {
            this.getFollowing();
            this.getPodcasts();
        }
    },
    data() {
        return {
            loaded: false,
            token: '',
            loggedInUser: [],
            followed: [],
            podcastData: [],
        }
    },
    methods: {
        async getFollowing() {
            // get the user's following
            await axios.get('/api/followuser/read-users-followers/' + this.loggedInUser.id, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            }).then((response) => {
                this.followed = [];
                for (let i = 0; i < response.data.length; i++) {
                    for (let j = 0; j < response.data[i].following.length; j++) {
                        this.followed.push(response.data[i].following[j]);
                    }
                }
            }).catch((error) => {
                if (error) {
                    console.log(error);
                }
            });
        },
        async getPodcasts() {
            // get the podcasts of the users the logged in user follows
            await axios.get('/api/podcast/read-following-podcast/' + this.loggedInUser.id, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            }).then((response) => {
                this.podcastData = response.data;
                this.loaded = true;
            }).catch((error) => {
                if (error) {
                    console.log(error);
                }
            });
        },
    },
}

</script>
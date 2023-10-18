<template>
    <div v-if="user" class="p-6">
        <div class="flex items-center space-x-4 ml-24">
            <div class="flex-shrink-0">
                <img src="https://via.placeholder.com/150" alt="Profile picture" class="rounded-full w-24 h-24">
            </div>
            <div>
                <h2 class="text-2xl font-medium text-black dark:text-white ">{{ user.username }}</h2>
                <div class="text-gray-600  dark:text-white">{{ user.email }}</div>
                <div class="text-gray-600 dark:text-white">{{ calculateAge(user.birthday) }} {{ $t('yearsOld') }}, {{
                    user.fk_gender_id.gender_name }}, {{
        $t('from') }} {{ user.fk_country_id.country_name }}</div>
            </div>
            <div class="flex-1 text-right">
                <div v-if="userStore.getUser.id !== user.id">
                    <button v-if="followedStore.getFollowed.some(data => data.id === user.id)" @click="unfollowUser"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-4">
                        {{ $t('unfollow') }}
                    </button>
                    <button v-else @click="followUser"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-4">
                        {{ $t('follow') }}
                    </button>
                </div>

            </div>
        </div>
        <div class="">
            <div class="float-right mr-16">
                <!-- manage page -->
                <div v-if="userStore.getUser.id == user.id" class="h-8">

                    <NuxtLink to="/manage"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-4">
                        {{ $t('manage') }}
                    </NuxtLink>
                </div>
            </div>
            <div class="inline-grid mt-4">
                <PodcastBox :podcastData="podcastData" />
            </div>
        </div>
    </div>
</template>
  
<script>
import { useUserStore } from "../stores/login"
import { useFollowedStore } from "@/stores/followed"
import { mapStores } from "pinia";
import axios from '@/utils/axiosInstance.ts'

export default {
    computed: {
        ...mapStores(useUserStore, useFollowedStore)
    },
    created() {
        this.getUserPodcasts();
        this.getUser();
        this.getFollowing();
    },
    data() {
        return {
            user: null,
            podcastData: [],
        };
    },
    methods: {
        calculateAge(birthday) {
            //birthday format YYYY-MM-DD
            var birthdayDate = new Date(birthday);
            var ageDifMs = Date.now() - birthdayDate.getTime();
            var ageDate = new Date(ageDifMs);
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        },
        async getUserPodcasts() {
            await axios.get('api/podcast/read-user-podcast/' + this.$route.params.id, {
                headers: {
                    Authorization: `Bearer ${this.userStore.getAccessToken}`
                }
            }).then((response) => {
                this.podcastData = response.data;
            }).catch((error) => {
                if (error) {
                    console.log(error);
                }
            });
        },
        async getFollowing() {
            // get the user's following
            await axios.get('/api/followuser/read-users-followers/' + this.userStore.getUser.id, {
                headers: {
                    Authorization: `Bearer ${this.userStore.getAccessToken}`
                }
            }).then((response) => {
                this.followedStore.clearFollowed();
                for (let i = 0; i < response.data.length; i++) {
                    for (let j = 0; j < response.data[i].following.length; j++) {
                        this.followedStore.addFollowed(response.data[i].following[j]);
                    }
                }
            }).catch((error) => {
                if (error) {
                    console.log(error);
                }
            });
            this.loaded = true;
        },
        async followUser() {
            // follow user
            await axios.put('/api/followuser/follow-user', {
                followerId: this.userStore.getUser.id,
                followingId: this.user.id
            }, {
                headers: {
                    Authorization: `Bearer ${this.userStore.getAccessToken}`
                }
            }).then((response) => {
                if (response.status == 200) {
                    this.getFollowing();
                }
            }).catch((error) => {
                if (error) {
                    console.log(error);
                }
            });
        },
        async unfollowUser() {
            await axios.put('/api/followuser/unfollow-user', {
                followerId: this.userStore.getUser.id,
                followingId: this.user.id
            }, {
                headers: {
                    Authorization: `Bearer ${this.userStore.getAccessToken}`
                }
            }).then((response) => {
                if (response.status == 200) {
                    this.getFollowing();
                }
            }).catch((error) => {
                if (error) {
                    console.log(error);
                }
            });
        },
        async getUser() {
            await axios.get('/api/user/read-single-user/' + this.$route.params.id, {
                headers: {
                    Authorization: `Bearer ${this.userStore.getAccessToken}`
                }
            }).then((response) => {
                this.user = response.data;
            }).catch((error) => {
                if (error) {
                    console.log(error);
                }
            });
        },
    },
};
</script>
<template >
    <div
        class="flex overflow-y-auto flex-col h-screen p-3 text-black dark:text-white  bg-white dark:bg-slate-900 w-full border-solid border-2 border-blue-950 ">
        <div class="space-y-3">
            <div>
                <!-- logo -->
                <a href="/">
                    <img src="../assets/images/icon.png" class="w-20 m-auto" />
                </a>
            </div>

            <div class="flex items-center">
                <h2 class="text-xl font-bold">Soundweave</h2>
            </div>
            <div class="flex-1">
                <ul class="pt-2 pb-4 space-y-1 text-sm">
                    <li class="rounded-sm">
                        <NuxtLink to="/"
                            class="md:flex block mx-auto md:mx-0 items-center p-2 md:space-x-3 rounded-md hover:text-gray-400">
                            <Icon name="humbleicons:home" size="2em" />
                            <h1 class="text-xl">{{ $t('home') }}</h1>
                        </NuxtLink>
                    </li>
                    <li v-if="userStore.getUser.id" class="rounded-sm">
                        <NuxtLink to="/explore"
                            class="md:flex block mx-auto md:mx-0 items-center p-2 md:space-x-3 rounded-md hover:text-gray-400">
                            <Icon name="material-symbols:explore-outline-rounded" size="2em" />
                            <h1 class="text-xl">{{ $t('feed') }}</h1>
                        </NuxtLink>
                    </li>
                    <li>
                        <!-- Collection page -->
                        <NuxtLink v-if="userStore.getUser.id" to="/collection"
                            class="md:flex block mx-auto md:mx-0 items-center p-2 md:space-x-3 rounded-md hover:text-gray-400">
                            <Icon name="material-symbols:collections-bookmark" size="2em" />
                            <h1 class="text-xl">{{ $t('yourCollection') }}</h1>
                        </NuxtLink>
                    </li>
                    <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
                    <li class="rounded-sm">
                        <p class="flex items-center p-2 space-x-3 rounded-md">
                            {{ $t('following') }}
                        </p>
                    </li>
                    <!-- followed creators -->
                    <li>
                        <p v-if="!userStore.getUser.id" class="flex items-center p-2 space-x-3 rounded-md">
                            {{ $t('loginFollowed') }}
                        </p>
                        <p v-else-if="followedStore.getFollowed.length == 0"
                            class="flex items-center p-2 space-x-3 rounded-md">
                            {{ $t('noFollowed') }}
                        </p>
                        <div v-else v-for="(creators, index) in followedStore.getFollowed">
                            <div v-if="index == followedStore.getFollowed.length - 1 && index > 4">
                                <NuxtLink v-if="followMore" :to="'/profile/' + creators.id" class="flex py-2">
                                    <img v-if="creators.creator_image == null" src="../assets/images/fishe.jpg"
                                        class="w-10 h-10 rounded-full" />
                                    <img v-else :src="creators.creator_image" class="w-10 h-10 rounded-full" />
                                    <p class="text-sm my-auto px-2 ">{{ creators.username }}</p>
                                </NuxtLink>
                                <button class="flex py-2" @click="toggleFollow()">
                                    <Icon v-if="followMore" name="ic:baseline-keyboard-arrow-up" />
                                    <Icon v-else name="ic:baseline-keyboard-arrow-down" />
                                    <p v-if="followMore" class="text-sm my-auto px-2 hover:text-gray-500 ">{{
                                        $t('showLess') }}</p>
                                    <p v-else class="text-sm my-auto px-2 hover:text-gray-500 ">{{ $t('showMore') }}</p>
                                </button>
                            </div>
                            <div v-else-if="index < 4">
                                <NuxtLink :to="'/profile/' + creators.id" class="flex py-2">
                                    <img v-if="creators.creator_image == null" src="../assets/images/fishe.jpg"
                                        class="w-10 h-10 rounded-full" />
                                    <img v-else :src="creators.creator_image" class="w-10 h-10 rounded-full" />
                                    <p class="text-sm my-auto px-2 ">{{ creators.username }}</p>
                                </NuxtLink>
                            </div>
                            <div v-else-if="followMore">
                                <NuxtLink :to="'/profile/' + creators.id" class="flex py-2">
                                    <img v-if="creators.creator_image == null" src="../assets/images/fishe.jpg"
                                        class="w-10 h-10 rounded-full" />
                                    <img v-else :src="creators.creator_image" class="w-10 h-10 rounded-full" />
                                    <p class="text-sm my-auto px-2 ">{{ creators.username }}</p>
                                </NuxtLink>
                            </div>
                        </div>
                    </li>
                    <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
                    <li class="rounded-sm">
                        <p class="flex items-center p-2 space-x-3 rounded-md">
                            {{ $t('favorites') }}
                        </p>
                    </li>
                    <li class="rounded-sm">
                        <p v-if="!userStore.getUser.id" class="flex items-center p-2 space-x-3 rounded-md">
                            {{ $t('loginFavorites') }}
                        </p>
                        <p v-else-if="favorites.length == 0" class="flex items-center p-2 space-x-3 rounded-md">
                            {{ $t('noFavorites') }}
                        </p>
                        <div v-else v-for="(lists, index) in likedStore.getLiked ">
                            <div v-if="index == likedStore.getLiked.length - 1 && index > 4">
                                <NuxtLink v-if="collectionMore" :to="'/podcast/' + lists.podcastId" class="flex py-2">
                                    <img v-if="lists.podcast_image == null" src="../assets/images/fishe.jpg"
                                        class="w-10 h-10 rounded-full" />
                                    <img v-else :src="lists.thumbnail" class="w-10 h-10 rounded-full" />
                                    {{ console.log(lists) }}
                                    <p class="text-xl my-auto px-2 hover:text-gray-500">{{ lists.podcast_name }}</p>
                                </NuxtLink>
                                <button class="flex py-2" @click="toggleCollection()">
                                    <Icon v-if="collectionMore" name="ic:baseline-keyboard-arrow-up" />
                                    <Icon v-else name="ic:baseline-keyboard-arrow-down" />
                                    <p v-if="collectionMore" class="text-sm my-auto px-2 hover:text-gray-500 ">{{
                                        $t('showLess') }}</p>
                                    <p v-else class="text-sm my-auto px-2 hover:text-gray-500 ">{{ $t('showMore') }}</p>
                                </button>
                            </div>
                            <div v-else-if="index < 4">
                                <NuxtLink :to="'/podcast/' + lists.podcastId" class="flex py-2">
                                    <img v-if="lists.podcast_image == null" src="../assets/images/fishe.jpg"
                                        class="w-10 h-10 rounded-full" />
                                    <img v-else :src="lists.thumbnail" class="w-10 h-10 rounded-full" />
                                    <p class="text-xl my-auto px-2 hover:text-gray-500">{{ lists.podcast_name }}</p>
                                </NuxtLink>
                            </div>
                            <div v-else-if="collectionMore">
                                <NuxtLink :to="'/podcast/' + lists.podcastId" class="flex py-2">
                                    <img v-if="lists.podcast_image == null" src="../assets/images/fishe.jpg"
                                        class="w-10 h-10 rounded-full" />
                                    <img v-else :src="lists.thumbnail" class="w-10 h-10 rounded-full" />
                                    <p class="text-xl my-auto px-2 hover:text-gray-500">{{ lists.podcast_name }}</p>
                                </NuxtLink>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/utils/axiosInstance.ts'
import { useUserStore } from "../stores/login"
import { mapStores } from "pinia";
import { useFollowedStore } from '~/stores/followed';
import { useLikedStore } from '~/stores/liked';

export default {
    name: 'SideBar',
    computed: {
        ...mapStores(useUserStore, useFollowedStore, useLikedStore)
    },
    created() {
        this.token = this.userStore.getAccessToken;
        if (this.userStore.getUser.id) {
            this.getFollowing();
            this.getFavorites();
        }

    },
    data() {
        return {
            token: '',
            followMore: false,
            collectionMore: false,
            // my lists
            favorites: [],
            loaded: false,
        };
    },
    methods: {
        toggleFollow() {
            this.followMore = !this.followMore;
        },
        toggleCollection() {
            this.collectionMore = !this.collectionMore;
        },
        async getFollowing() {
            // get the user's following
            await axios.get('/api/followuser/read-users-followers/' + this.userStore.getUser.id, {
                headers: {
                    Authorization: `Bearer ${this.token}`
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
        async getFavorites() {
            // get the user's favorites
            await axios.get('/api/podcastliked/read-users-podcast-liked/' + this.userStore.getUser.id, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            }).then((response) => {
                this.favorites = response.data;
            }).catch((error) => {
                if (error) {
                    console.log(error);
                }
            });
        },
    },
};
</script>
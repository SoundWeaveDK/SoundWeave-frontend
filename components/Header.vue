<template>
    <header
        class="my-auto h-full w-full text-black dark:text-white bg-white dark:bg-slate-900 border-solid border-b-2 border-blue-950 ">
        <nav class="mx-auto h-full flex items-center justify-between lg:px-8">
            <!-- searchbar -->
            <div class="relative ml-20 w-1/3" v-if="userStore.getUser.id">
                <div>
                    <input type="text" v-model="search" :placeholder="placeholderText" @click="getPodcasts"
                        class="text-black dark:text-white p-2 w-full outline-none border-b-2 border-gray-500 dark:border-white dark:bg-transparent" />
                    <div class="absolute right-0 top-0 mt-2 mr-2 text-gray-600 dark:text-white">
                        <Icon name="ph:magnifying-glass-bold" size="1.3em" />
                    </div>
                </div>
                <div id="searchDropdown"
                    class="fixed z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-2xl shadow-black w-44 dark:bg-gray-600 mt-1">
                    <ul v-if="search.length > 0">
                        <li v-for="podcast in filteredPodcasts" :key="podcast.id"
                            class="px-2 py-1 hover:bg-gray-300 dark:hover-bg-gray-500 rounded-lg">
                            <NuxtLink class="flex" :to="'/podcast/' + podcast.id">{{ podcast.podcast_name }}
                            </NuxtLink>
                        </li>
                        <li v-if="filteredPodcasts.length === 0" class="px-2 py-1">No results found</li>
                    </ul>
                </div>
            </div>
            <div v-if="userStore.getUser.id" class="mr-20 flex justify-between ml-auto">
                <!-- user settings button -->
                <div style="position: relative;">
                    <div @click="toggleDropdown" class="flex items-center">
                        <img id="drop"
                            :src="userStore.getUser.profile_picture ? userStore.getUser.profile_picture : 'https://cdn.vanderbilt.edu/vu-URL/wp-content/uploads/sites/288/2019/03/19223634/Image-Coming-Soon-Placeholder.png'"
                            class="rounded-full h-12 w-12 cursor-pointer">
                        <div ref="dropdown" v-if="showDropdown"
                            class="flex mt-1 p-2 shadow-2xl shadow-black divide-y divide-gray-100 dark:bg-gray-600 dark:text-white text-black absolute top-full left-0 bg-white border-gray-200 rounded-md ">
                            <ul>
                                <li v-if="userStore.getUser.id" class="mb-2 hover:bg-gray-300 dark:hover:bg-gray-500">
                                    <NuxtLink :to="linkto">{{ $t('profile') }}</NuxtLink>
                                </li>
                                <button class="mt-2 hover:bg-gray-300 dark:hover:bg-gray-500">
                                    <li class="">
                                        <NuxtLink @click="logout">{{ $t('logout') }}</NuxtLink>
                                    </li>
                                </button>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="ml-auto text-bold mobile:mr-4">
                <NuxtLink href="/login" class="text-black dark:text-white hover:text-gray-400">{{ $t('login') }}</NuxtLink>
            </div>
        </nav>
    </header>
</template>

<script>
import axios from '@/utils/axiosInstance.ts'
import { useUserStore } from "../stores/login"
import { mapStores } from "pinia";
import { usePodcastStore } from '~/stores/podcast';

export default {
    mounted() {
        if (localStorage.getItem("locale")) {
            this.$i18n.locale = localStorage.getItem("locale");
        } else {
            localStorage.setItem("locale", this.$i18n.locale);
        }
        document.addEventListener('click', this.clearSearch);
        document.addEventListener('click', this.closeDropdown);
    },
    beforeDestroy() {
        document.removeEventListener('click', this.closeDropdown);
    },
    computed: {
        ...mapStores(useUserStore, usePodcastStore),
        placeholderText() {
            return this.$t('search');
        },
        filteredPodcasts() {
            return this.podcastStore.getPodcasts.filter((podcast) => {
                return podcast.podcast_name.toLowerCase().includes(this.search.toLowerCase())
            })
        },
    },
    created() {
        this.linkto = "/profile/" + this.userStore.getUser.id;
    },
    data() {
        return {
            showDropdown: false,
            search: '',
            linkto: "",
            searchResultsTop: '0px',
        }
    },
    methods: {
        toggleDropdown() {
            this.showDropdown = !this.showDropdown
        },
        logout() {
            const userCookie = useCookie('user')
            const podcastCookie = useCookie('podcast')
            const watchLaterCookie = useCookie('watchLater')
            const commentCookie = useCookie('comment')
            const likeCookie = useCookie('liked')
            const followCookie = useCookie('followed')

            userCookie.value = null
            podcastCookie.value = null
            watchLaterCookie.value = null
            commentCookie.value = null
            likeCookie.value = null
            followCookie.value = null

            this.$router.push('/')
            location.reload()

        },
        async getPodcasts() {
            await axios.get('/api/podcast/read-preview-podcast', {
            }).then((response) => {
                this.podcastStore.setPodcasts(response.data);
            }).catch((error) => {
                if (error) {
                    console.log(error);
                }
            });
        },
        clearSearch(e) {
            if (e.target.id !== 'searchDropdown') {
                this.search = ''
            }
        },
        closeDropdown(event) {
            // if element is dropdown, do nothing
            if (event.target.id === 'drop') return;
            // if element is inside dropdown, do nothing
            if (event.target.closest('#drop')) return;
            // otherwise, close dropdown
            this.showDropdown = false;
        }
    },
};
</script>

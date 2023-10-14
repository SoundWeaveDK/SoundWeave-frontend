<template>
    <header
        class="my-auto h-full w-full text-black dark:text-white bg-white dark:bg-slate-900 border-solid border-b-2 border-blue-950 ">
        <nav class="mx-auto h-full flex items-center justify-between lg:px-8">
            <!-- searchbar -->
            <div class="relative ml-20 w-1/3">
                <div>
                    <input type="text" v-model="search" :placeholder="placeholderText"
                        class="text-black dark:text-white p-2 w-full outline-none border-b-2 border-gray-500 dark:border-white dark:bg-transparent" />
                    <div class="absolute right-0 top-0 mt-2 mr-2 text-gray-600 dark:text-white">
                        <button>
                            <Icon name="ph:magnifying-glass-bold" size="1.3em" />
                        </button>
                    </div>
                </div>
                <div id="searchDropdown"
                    class="fixed z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-2xl shadow-black w-44 dark:bg-gray-600 mt-1"
                    :style="{ top: searchResultsTop }">
                    <ul v-if="search.length > 0">
                        <li v-for="podcast in filteredPodcasts" :key="podcast.id"
                            class="px-2 py-1 hover:bg-gray-300 dark:hover:bg-gray-500 cursor-pointer">
                            <NuxtLink :to="podcast.link">{{ podcast.title }}</NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="mr-20 flex justify-between ">
                <!-- user settings button -->
                <div style="position: relative;">
                    <div @click="toggleDropdown" class="flex items-center">
                        <!-- <img :src="tempUser[0].user_image" class="rounded-full h-12 w-12"> -->
                        <img :src="loggedInUser.imageURL ? loggedInUser.imageURL : 'https://cdn.vanderbilt.edu/vu-URL/wp-content/uploads/sites/288/2019/03/19223634/Image-Coming-Soon-Placeholder.png'"
                            class="rounded-full h-12 w-12 cursor-pointer">
                        <div ref="dropdown" v-if="showDropdown"
                            class="flex mt-1 p-2 shadow-2xl shadow-black divide-y divide-gray-100 dark:bg-gray-600 dark:text-white text-black absolute top-full left-0 bg-white border-gray-200 rounded-md shadow-md p-1"
                            @click.stop>
                            <ul>
                                <li v-if="loggedInUser.id" class="mb-2 hover:bg-gray-300 dark:hover:bg-gray-500">
                                    <NuxtLink :to="linkto">{{ $t('profile') }}</NuxtLink>
                                </li>
                                <li>
                                    <div id="languageSelector" class="my-auto grow">
                                        <form>
                                            <label class="flex" for="locale-select">{{ $t('language') }}:
                                                <Icon class="self-center" :name="'circle-flags:' + $i18n.locale" />
                                            </label>
                                            <select id="locale-select" v-model="$i18n.locale"
                                                class="text-black dark:text-white rounded p-2 bg-gray-400">
                                                <option v-for="locale in $i18n.availableLocales" :key="locale"
                                                    :value="locale" class="text-black">
                                                    {{ $t(locale) }}
                                                </option>
                                            </select>
                                        </form>
                                    </div>
                                </li>
                                <button v-if="loggedInUser.id" class="mt-2 hover:bg-gray-300 dark:hover:bg-gray-500">
                                    <li class=""><a @click="logout">{{ $t('logout') }}</a>
                                    </li>
                                </button>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
import { useUserStore } from "../stores/login"
import { mapStores } from "pinia";

export default {
    computed: {
        ...mapStores(useUserStore),
        placeholderText() {
            return this.$t('search');
        },
        filteredPodcasts() {
            const filtered = this.podcasts.filter(podcast => {
                return podcast.title.toLowerCase().includes(this.search.toLowerCase()) && this.search.length > 0
            });
            if (filtered.length === 0) {
                return [{ id: 0, title: 'No podcasts found' }];
            }
            return filtered;
        },
    },
    created() {
        this.loggedInUser = this.userStore.getUser;
        this.linkto = "/profile/" + this.loggedInUser.id;
    },
    data() {
        return {
            showDropdown: false,
            loggedInUser: [],
            search: '',
            podcasts: [
                { id: 1, title: 'The Joe Rogan Experience', link: '/podcast/1' },
                { id: 2, title: 'The Daily', link: '/podcast/2' },
            ],
            loggedInUser: {},
            linkto: "",
            searchResultsTop: '0px',
            isLoggedIn: false,
        }
    },
    methods: {
        toggleDropdown() {
            this.showDropdown = !this.showDropdown;
        },
        logout() {
            const userCookie = useCookie('user')
            userCookie.value = null
            this.$router.push('/login')
        },
    },
};
</script>
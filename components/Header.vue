<template>
    <header
        class="my-auto h-full w-full text-black dark:text-white  bg-white dark:bg-slate-900 border-solid border-b-2 border-blue-950 ">
        <nav class="mx-auto h-full flex items-center justify-between lg:px-8">
            <!-- searchbar -->
            <input type="text" :placeholder="placeholderText" class="ml-20 rounded-full p-2 w-1/3">


            <div class="mr-20 flex justify-between ">
                <!-- user settings button -->
                <div style="position: relative;">
                    <div @click="toggleDropdown" class="flex items-center">
                        <!-- <img :src="tempUser[0].user_image" class="rounded-full h-12 w-12"> -->
                        <img :src="loggedInUser.imageURL ? loggedInUser.imageURL : 'https://cdn.vanderbilt.edu/vu-URL/wp-content/uploads/sites/288/2019/03/19223634/Image-Coming-Soon-Placeholder.png'"
                            class="rounded-full h-12 w-12 cursor-pointer">
                        <div ref="dropdown" v-if="showDropdown"
                            class="text-black absolute top-full left-0 bg-white border border-gray-300 rounded-md shadow-md p-1"
                            @click.stop>
                            <ul>
                                <li class="mb-2">
                                    <NuxtLink to="profile" :loggedInUser="loggedInUser">Profile</NuxtLink>
                                </li>
                                <li>
                                    <div id="languageSelector" class="my-auto">
                                        <form>
                                            <label for="locale-select">{{ $t('language') }}:
                                                <Icon :name="'circle-flags:' + $i18n.locale" />
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
                                <li class="mt-2"><a @click="logout">Logout</a></li>
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
    },
    created() {
        this.loggedInUser = this.userStore.getUser;
    },
    data() {
        return {
            showDropdown: false,
            loggedInUser: [],
        }
    },
    methods: {
        toggleDropdown() {
            this.showDropdown = !this.showDropdown;
        },
    },
};
</script>
<template>
    <div class="p-6">
        <div class="flex items-center space-x-4 ml-24">
            <div class="flex-shrink-0">
                <img src="https://via.placeholder.com/150" alt="Profile picture" class="rounded-full w-24 h-24">
            </div>
            <div>
                <h2 class="text-2xl font-medium text-black dark:text-white ">{{ user.username }}</h2>
                <div class="text-gray-600  dark:text-white">{{ user.email }}</div>
                <div class="text-gray-600 dark:text-white">{{ user.age }} {{ $t('yearsOld') }}, {{ user.gender }}, {{
                    $t('from') }} {{ user.country }}</div>
            </div>
            <div class="flex-1 text-right">
                <button v-if="loggedInUser.id !== user.id"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-24">
                    {{ $t('follow') }}
                </button>
            </div>
        </div>
        <div class="">
            <div class="float-right mr-16">
                <!-- manage page -->
                <NuxtLink v-if="loggedInUser.email === user.email" to="/manage"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-4">
                    {{ $t('manage') }}
                </NuxtLink>
            </div>
            <div class="inline-grid mt-4">
                <PodcastBox />
            </div>
        </div>
    </div>
</template>
  
<script>
import { useUserStore } from "../stores/login"
import { mapStores } from "pinia";

export default {
    computed: {
        ...mapStores(useUserStore)
    },
    data() {
        return {
            user: null,
            loggedInUser: [],
        };
    },
    created() {
        this.loggedInUser = this.userStore.getUser;
        this.user = {
            id: 1,
            email: 'joeBiden@usgov.com',
            username: 'Joe Biden',
            created_at: '2021-01-01',
            gender: 'Male',
            age: 80,
            country: 'USA',
        };
    },
};
</script>
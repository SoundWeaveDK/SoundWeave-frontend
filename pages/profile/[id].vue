<template>
    <div class="p-6">
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
                <button v-if="loggedInUser.id !== user.id"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-24">
                    {{ $t('follow') }}
                </button>
            </div>
        </div>
        <div class="">
            <div class="float-right mr-16">
                <!-- manage page -->
                <div v-if="loggedInUser" class="h-8">

                    <NuxtLink to="/manage"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-4">
                        {{ $t('manage') }}
                    </NuxtLink>
                </div>
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
    created() {
        this.loggedInUser = this.userStore.getUser;
        console.log(this.loggedInUser);
        if (this.$route.params.id == this.loggedInUser.id) {
            this.user = this.loggedInUser;
        } else {
            this.user = {
                birthday: "1942-11-20",
                countryId: 1,
                createdAt: "2021-05-04T14:00:00.000Z",
                email: "JoeBiden@USGOV.com",
                fk_country_id: {
                    country_name: "USA",
                },
                fk_gender_id: {
                    gender_name: "Male"
                },
                genderId: 1,
                id: 0,
            };
        }
    },
    data() {
        return {
            user: null,
            loggedInUser: [],
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
    },
};
</script>
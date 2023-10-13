<template>
    <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img class="" style="height: 100px;" :src="icon" alt="logo">
            </a>
            <div
                class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <div class="flex items-center justify-center">
                        <h1
                            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            SoundWeave
                        </h1>
                        &nbsp;
                        <h1
                            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            {{ $t('login') }}
                        </h1>
                    </div>
                    <form class="space-y-4 md:space-y-6" @submit.prevent="verifyLogin">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Email
                            </label>
                            <input type="text" v-model="email" name="email" id="email"
                                class="mb-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                autocomplete="email" placeholder="your@email.com" required>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{
                                $t('password') }}</label>
                            <input type="password" v-model="password" name="password" id="password"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                autocomplete="current-password" placeholder="••••••••" required>
                        </div>
                        <button type="submit" :disabled="isLoading"
                            class="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <span v-if="isLoading">
                                <div role="status">
                                    <svg aria-hidden="true"
                                        class="inline w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-500 dark:fill-white"
                                        viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="currentColor" />
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentFill" />
                                    </svg>
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </span>
                            <span v-else>
                                {{ $t('login') }}
                            </span>
                        </button>
                        <button type="button" @click="$router.push('/register')"
                            class="w-full text-white bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
                            {{ $t('register') }}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
definePageMeta({
    layout: false,
});
</script>

<script>
import icon from '@/assets/images/icon.png'
import axios from '@/utils/axiosInstance.ts'
import { useUserStore } from '@/stores/login.ts'
import { mapStores } from 'pinia'

export default {
    computed: {
        ...mapStores(useUserStore)
    },
    data() {
        return {
            icon: icon,

            email: '',
            password: '',
            isLoading: false,
        }
    },
    beforeMount() {
        if (localStorage.getItem('user')) {
            alert(this.$t('alreadyLoggedIn'));
            this.$router.push('/');
        }
    },
    methods: {
        async verifyLogin() {
            this.isLoading = true;
            await axios.post('/api/user/login', {
                email: this.email.toLowerCase(),
                password: this.password
            }).then((response) => {
                this.userStore.setUser(response.data.user);
                console.log(this.userStore.getUser);
                if (response.status == 200) {

                    this.$router.push('/');
                }
            }).catch((error) => {
                if (error) {
                    //alert(this.$t(error));
                    console.log(error);
                }
            }).finally(() => {
                this.isLoading = false;
            })
        },
    }
}    
</script>

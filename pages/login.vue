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
                    <form class="space-y-4 md:space-y-6" @submit.prevent="verifyLogin"
                        onkeydown="return event.key != 'Enter';">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                {{ $t('email') }}
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
                        <button type="submit"
                            class="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            {{ $t('login') }}
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

export default {
    data() {
        return {
            icon: icon,

            email: '',
            password: '',
        }
    },
    methods: {
        verifyLogin() {
            axios.post('/api/users/login', {
                email: this.email.toLowerCase(),
                password: this.password
            }).then((response) => {
                if (response.status == 200) {
                    localStorage.setItem('accessToken', response.data.accessToken);
                    localStorage.setItem('username', response.data.user.username);
                    this.$router.push('/');
                }
            }).catch((error) => {
                if (error) {
                    alert(this.$t('loginError'));
                }
            })
        },
    }
}    
</script>


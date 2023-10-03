<template>
    <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img class="" style="height: 100px;" :src="icon" alt="logo">
            </a>
            <div
                class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <div class="flex items-center">
                        <h1
                            class="center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            SoundWeave
                        </h1>
                        &nbsp;
                        <h1
                            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            {{ $t('register') }}</h1>
                    </div>
                    <form class="space-y-4 md:space-y-6" @submit.prevent="verifyRegister"
                        onkeydown="return event.key != 'Enter';">
                        <div>
                            <div class="flex flex-wrap">
                                <div class="w-full md:w-1/2 pr-2">
                                    <label for="email" class="mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                        Email
                                    </label>
                                    <input type="text" v-model="email" name="email" id="email"
                                        class="mt-1 mb-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        autocomplete="email" placeholder="your@email.com" required>
                                </div>
                                <div class="w-full md:w-1/2">
                                    <label for="username" class="mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                        {{ $t('username') }}
                                    </label>
                                    <input type="text" v-model="username" name="username" id="username"
                                        class="mt-1 mb-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        autocomplete="username" placeholder="Joe Mama" required>
                                </div>
                            </div>
                            <div class="flex flex-wrap">
                                <div class="w-full md:w-1/2 pr-2">
                                    <label for="country" class="mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                        {{ $t('country') }}
                                    </label>
                                    <select v-model="country" name="country" id="country"
                                        class="mt-1 mb-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value="Indonesia">Indonesia</option>
                                        <option value="Malaysia">Malaysia</option>
                                        <option value="Singapore">Singapore</option>
                                        <option value="Thailand">Thailand</option>
                                        <option value="Vietnam">Vietnam</option>
                                    </select>
                                </div>
                                <div class="w-full md:w-1/2 pr-2">
                                    <label for="gender"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        {{ $t('gender') }}
                                    </label>
                                    <select v-model="gender" name="gender" id="gender"
                                        class="mt-1 mb-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value="1">{{ $t('man') }}</option>
                                        <option value="2">{{ $t('woman') }}</option>
                                        <option value="3">{{ $t('other') }}</option>
                                    </select>
                                </div>
                            </div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{
                                $t('password') }}</label>
                            <input type="password" v-model="password" name="password" id="password"
                                class="mb-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                autocomplete="new-password" placeholder="••••••••" required>
                            <label for="rePassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{
                                $t('rePassword') }}</label>
                            <input type="password" v-model="rePassword" name="rePassword" id="rePassword"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                autocomplete="new-password" placeholder="••••••••" required>
                        </div>
                        <button type="submit" @click="registerModal"
                            class="w-full text-white bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
                            {{ $t('register') }}
                        </button>
                    </form>
                    <button>
                        <Icon name=" material-symbols:arrow-circle-left-outline-rounded" size="2.5em" />
                    </button>
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
import axios from '@/utils/axiosInstance.js'

export default {
    data() {
        return {
            icon: icon,

            email: '',
            username: '',
            password: '',
            rePassword: '',
        }
    },
    methods: {
        comparePass() {
            if (this.password != this.rePassword) {
                alert('Password not match')
            }
        },
        verifyRegister() {
            axios.post('auth/register', {
                email: this.email.toLowerCase(),
                password: parseInt(this.password),
                name: this.name
            }).then((res) => {
                if (res.data.status == 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Register success',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.$router.push('/login')
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: res.data.message,
                    })
                }
            }).catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err,
                })
            })
        },
    }
}

</script>


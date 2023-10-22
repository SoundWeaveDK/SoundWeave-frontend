<template>
    <section v-if="podcastData"
        class="text-gray-600 body-font flex flex-wrap overscroll-auto items-start mobile:justify-center">
        {{ console.log(podcastData) }}
        <div v-if="isLoading"
            class="flex-shrink-0 w-2/3 sm:w-2/5 md:w-2/5 lg:w-1/5 p-4 m-2 bg-gray-200 dark:bg-gray-700 rounded-lg overscroll-y-auto">
            <div class="h-full">
                <div class="h-full flex flex-col items-center">
                    <div class="bounding-box w-full mb-4">
                        <div class="animate-pulse flex-shrink-0 rounded-lg w-full mobile:w-full h-40 bg-gray-400"></div>
                    </div>
                    <div class="w-full">
                        <div class="animate-pulse h-4 bg-gray-400 rounded w-3/4 mb-2"></div>
                        <div class="animate-pulse h-4 bg-gray-400 rounded w-1/2"></div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else v-for="item in podcastData" :key="item.id"
            class="p-4 m-2  bg-gray-200 dark:bg-gray-700 rounded-lg w-11/12 sm:w-2/5 md:w-2/6 lg:w-1/5 xl:w-1/6">
            <div class="h-full w-full">
                <div class="h-full w-full flex flex-col items-center">
                    <NuxtLink class="w-full" :to="'/podcast/' + item.id" @click.prevent="storePodcastData(item)">
                        <div class="bounding-box ">
                            <img alt="thumbnail"
                                class="flex-shrink-0 rounded-lg w-full object-cover object-center mb-4 mobile:mb-2"
                                :src="item.thumbnail ? item.thumbnail : 'https://cdn.vanderbilt.edu/vu-URL/wp-content/uploads/sites/288/2019/03/19223634/Image-Coming-Soon-Placeholder.png'">
                        </div>
                    </NuxtLink>
                    <div class="w-full mobile:pl-3">
                        <NuxtLink :to="'/podcast/' + item.id" @click.prevent="storePodcastData(item)">
                            <h2
                                class="title-font font-semibold text-lg text-gray-900 dark:text-neutral-100 hover:text-gray-400">
                                {{ item.podcast_name }}</h2>
                        </NuxtLink>
                        <NuxtLink :to="'/profile/' + item.userId">
                            <h3 class="text-black dark:text-white mb- hover:text-gray-400">
                                {{ item.fk_user_id.username }}
                            </h3>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import { usePodcastStore } from '~/stores/podcast'
import { useUserStore } from "../stores/login"
import Swal from 'sweetalert2'

export default defineComponent({
    props: {
        podcastData: {
            type: Array,
        },
    },
    setup() {
        const podcastStore = usePodcastStore()
        const userStore = useUserStore()
        const isLoading = ref(true)

        const storePodcastData = (podcast) => {
            if (userStore.user.id) {
                podcastStore.setSelectedPodcast(podcast)
            } else {
                Swal.fire({
                    title: 'You need to be logged in to view this podcast',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Login',
                    cancelButtonText: 'Cancel',
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '/login'
                    }
                })
            }
        }

        onMounted(() => {
            setTimeout(() => {
                isLoading.value = false
            },)
        })
        //check if user is logged in if not don't redirect to podcast page

        return {
            storePodcastData,
            isLoading,
        }
    },
})
</script>

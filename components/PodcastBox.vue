<template>
    <section class="text-gray-600 body-font flex flex-wrap overscroll-auto items-start">
        <div v-if="isLoading"
            class="flex-shrink-0 w-2/3 sm:w-1/4 md:w-1/4 lg:w-1/6 p-4 m-2 bg-gray-200 dark:bg-gray-700 rounded-lg overscroll-y-auto">
            <div class="h-full">
                <div class="h-full flex mobile:flex-row flex-col items-center">
                    <div class="bounding-box">
                        <div class="animate-pulse flex-shrink-0 rounded-lg w-full mobile:w-40 h-40 bg-gray-400"></div>
                    </div>
                    <div class="w-full mobile:pl-3">
                        <div class="animate-pulse h-4 bg-gray-400 rounded w-3/4 mb-2"></div>
                        <div class="animate-pulse h-4 bg-gray-400 rounded w-1/2"></div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else v-for="item in podcastData" :key="item.id"
            class="flex-shrink-0 w-2/3 sm:w-1/4 md:w-1/4 lg:w-1/6 p-4 m-2 bg-gray-200 dark:bg-gray-700 rounded-lg overscroll-y-auto">
            <div class="h-full">
                <div class="h-full flex mobile:flex-row flex-col items-center">
                    <NuxtLink :to="'/podcast/' + item.id" @click="storePodcastData(item)">
                        <div class="bounding-box">
                            <img alt="thumbnail"
                                class="flex-shrink-0 rounded-lg w-full mobile:w-40 object-cover object-center mb-4 mobile:mb-0"
                                :src="item.thumbnail ? item.thumbnail : 'https://cdn.vanderbilt.edu/vu-URL/wp-content/uploads/sites/288/2019/03/19223634/Image-Coming-Soon-Placeholder.png'">
                        </div>
                    </NuxtLink>
                    <div class="w-full mobile:pl-3">
                        <NuxtLink :to="'/podcast/' + item.id" @click="storePodcastData(item)">
                            <h2
                                class="title-font font-semibold text-lg text-gray-900 dark:text-neutral-100 hover:text-gray-400">
                                {{ item.podcast_name }}</h2>
                        </NuxtLink>
                        <NuxtLink :to="'/profile/' + item.userId" @click="storePodcastData(item)">
                            <h3 class="text-black dark:text-white mb- hover:text-gray-400">{{ item.fk_user_id.username
                            }}</h3>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { defineComponent } from 'vue'
import { usePodcastStore } from '~/stores/podcast'
import { useUserStore } from "../stores/login"

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
            podcastStore.setSelectedPodcast(podcast)
        }

        const updatePodcastData = (newData) => {

        }

        onMounted(() => {
            setTimeout(() => {
                isLoading.value = false
            },)
        })

        return {
            storePodcastData,
            isLoading,
        }
    },
})
</script>
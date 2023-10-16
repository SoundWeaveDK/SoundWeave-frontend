<template>
    <div class="grid grid-cols-6 h-full">
        <div class="col-span-4 h-full">
            <div class="h-3/6 p-8">
                <h1 class="text-4xl font-bold text-black dark:text-white pb-4 w-fit mx-auto">
                    {{ podcast.podcast_name }}
                </h1>
                <img :src="podcast.thumbnail" alt="Podcast Image" class="w-72 h-72 m-auto" />
            </div>
            <div class="p-8">
                <div class="flex justify-between w-full">
                    <div class="flex">
                        <!-- Creator -->
                        <NuxtLink :to="`/profile/${podcast.userId}`" class="flex">
                            <img v-if="podcast.creator_image" :src="podcast.creator_image"
                                class="w-10 h-10 mr-4 rounded-full float-left" />
                            <img v-else src="../../assets/images/fishe.jpg" class="h-10 w-10 rounded mr-4"
                                alt="Creator Image">
                            <!-- <p class="text-black dark:text-white font-bold text-xl">{{ podcast.fk_user_id.username }}</p> -->
                        </NuxtLink>
                        <!-- listens -->
                        <p class="text-black dark:text-white text-2xl font-bold ml-auto">
                            {{ podcast.views }}
                            <Icon name="fluent:headphones-sound-wave-20-filled" class="mr-2 h-full my-auto" />
                        </p>
                    </div>
                </div>

                <!-- description -->
                <div v-if="podcast.created" class="text-black dark:text-white text-xl font-bold mr-2 float-right">
                    <!-- upload date -->
                    <p>{{ podcast.created }}</p>
                </div>
                <div v-else>
                    <p class="text-black dark:text-white text-xl font-bold mr-2 float-right">
                        Nigga didnt make timeStamp yet
                    </p>
                </div>

                <div class=" text-black h-max-64 overflow-y-auto dark:text-white text-xl font-bold inline-block">
                    <!-- description -->
                    <p>{{ podcast.description }}</p>
                </div>
            </div>
        </div>
        <div class="col-span-2">
            <!-- comment box -->
            <div class=" p-8 h-full">
                <div class="rounded border-solid border-2 h-full">
                    <div class="h-1/6">
                        <div class="flex">
                            <textarea type="text"
                                class="w-full m-4 mb-0 border-solid border-b-2 bg-transparent text-black dark:text-white "
                                :placeholder="placeholderText" />
                        </div>
                        <div>
                            <button
                                class="bg-black dark:bg-white text-white dark:text-black rounded-full w-24 h-8 m-4 float-right">
                                <p class="text-sm">{{ $t('comment') }}</p>
                            </button>
                        </div>
                    </div>
                    <div class="h-96 w-full overflow-y-auto">
                        <!-- comments -->
                        <div v-if="podcast.comments" v-for="message in podcast.comments" class="w-full p-2">
                            <div>
                                <img src="../assets/images/fishe.jpg" class="w-10 h-10 mr-4 rounded-full float-left" />
                                <p class="text-black dark:text-white font-bold">{{ message.name }}</p>
                                <p class="text-black dark:text-white"> {{ message.comment }} </p>
                                <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
                            </div>
                        </div>
                        <div>
                            <p class="text-black dark:text-white font-bold">Nigga didnt make comments yet</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

definePageMeta({
    middleware: ["auth"]
})
</script>
  
<script>
import axios from '@/utils/axiosInstance.ts'
import { useUserStore } from "../stores/login"
import { usePodcastStore } from '~/stores/podcast'
import { mapStores } from "pinia";


export default {
    name: "Podcast",
    setup() {
        const podcastStore = usePodcastStore()

        const SelectedPodcast = podcastStore.getSelectedPodcast

        return {
            SelectedPodcast
        }
    },
    computed: {
        ...mapStores(useUserStore),
        placeholderText() {
            return this.$t('comment');
        },
    },
    created() {
        this.token = this.userStore.getAccessToken;
        if (this.SelectedPodcast.id) {
            this.getSinglePodcasts();
        }
    },
    data() {
        return {
            token: '',
            userImage: "../assets/images/fishe.jpg",
            isPlaying: false,
            currentTime: "0:00",
            duration: "0:00",
            progress: 0,
            volume: 1,
            podcast: [],
        };
    },
    methods: {
        async getSinglePodcasts() {
            await axios.get('api/podcast/read-single-podcast/' + this.$route.params.id, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            }).then((response) => {
                console.log(response.data);
                this.podcast = response.data;
            }).catch((error) => {
                if (error) {
                    alert((error));
                }
            });
        },
    }
};
</script>
  
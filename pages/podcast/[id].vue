<template>
    <div class="grid grid-cols-6 h-full">
        <div class="col-span-4 h-full">
            <div class="h-3/6 p-8">
                <h1 class="text-4xl font-bold text-black dark:text-white pb-4 w-fit mx-auto">
                    {{ podcastStore.getSelectedPodcast.podcast_name }}
                </h1>
                <img :src="podcastStore.getSelectedPodcast.thumbnail" alt="Podcast Image" class="w-72 h-72 m-auto" />
                <div class="flex justify-center mt-2">
                    <div class="text-xs  mr-4">{{ currentTime }}</div>
                    <div class="w-64 h-2 bg-gray-300 rounded-full cursor-pointer mobile:hidden" @click="seek">
                        <div class="h-full bg-blue-500 rounded-full" :style="{ width: progress + '%' }"></div>
                    </div>
                    <p class="text-lg font-semibold md:hidden">-</p>
                    <div class="text-xs  ml-4">{{ duration }}</div>
                </div>
            </div>
            <div class="p-8">
                <div class="flex justify-between w-full">
                    <div class="flex">
                        <!-- Creator -->
                        <NuxtLink :to="`/profile/${podcastStore.getSelectedPodcast.userId}`" class="flex">
                            <img v-if="podcastStore.getSelectedPodcast.creator_image"
                                :src="podcastStore.getSelectedPodcast.creator_image"
                                class="w-10 h-10 mr-4 rounded-full float-left" />
                            <img v-else src="../../assets/images/fishe.jpg" class="h-10 w-10 rounded mr-4"
                                alt="Creator Image">
                            <!-- <p class="text-black dark:text-white font-bold text-xl my-auto">{{ podcast.fk_user_id.username
                            }}</p> -->
                        </NuxtLink>
                        <!-- listens -->
                        <p class="text-black dark:text-white text-2xl font-bold ml-auto my-auto">
                            {{ podcastStore.getSelectedPodcast.views }}
                            <Icon name="fluent:headphones-sound-wave-20-filled" class="mr-2 h-full my-auto" />
                        </p>
                    </div>
                </div>

                <!-- description -->
                <div v-if="podcastStore.getSelectedPodcast.created"
                    class="text-black dark:text-white text-xl font-bold mr-2 float-right">
                    <!-- upload date -->
                    <p>{{ podcastStore.getSelectedPodcast.created }}</p>
                </div>
                <div v-else>
                    <p class="text-black dark:text-white text-xl font-bold mr-2 float-right">
                        Nigga didnt make timeStamp yet
                    </p>
                </div>

                <div class=" text-black h-max-64 overflow-y-auto dark:text-white text-xl font-bold inline-block">
                    <!-- description -->
                    <p>{{ podcastStore.getSelectedPodcast.description }}</p>
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
                        <div v-if="podcastStore.getSelectedPodcast.comments"
                            v-for="message in podcastStore.getSelectedPodcast.comments" class="w-full p-2">
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
        <audio ref="audioPlayer" :src="podcastStore.getSelectedPodcast.podcast_file" @timeupdate="onTimeUpdate"></audio>
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
    computed: {
        ...mapStores(useUserStore, usePodcastStore),
        placeholderText() {
            return this.$t('comment');
        },
    },
    created() {
        if (this.podcastStore.getSelectedPodcast) {
            this.getSinglePodcasts();
        }
    },
    data() {
        return {
            isPlaying: false,
            currentTime: "0:00",
            duration: "0:00",
            progress: 0,
            volume: 1,
        };
    },
    methods: {
        async getSinglePodcasts() {
            await axios.get('/api/podcast/read-single-podcast/' + this.$route.params.id, {
                headers: {
                    Authorization: `Bearer ${this.userStore.getAccessToken}`
                }
            }).then((response) => {
                if (response.data.status === 200) {
                    this.podcastStore.setSelectedPodcast(response.data.podcast);
                }
            }).catch((error) => {
                if (error) {
                    console.log(error);
                }
            });
        },
        togglePlayback() {
            const audio = this.$refs.audioPlayer;
            if (this.isPlaying) {
                this.isPlaying = false;
                audio.pause();
            } else {
                this.isPlaying = true;
                audio.play();
            }
        },
        onTimeUpdate() {
            const audio = this.$refs.audioPlayer;
            const duration = audio.duration;
            const currentTime = audio.currentTime;
            const progress = (currentTime / duration) * 100;
            this.currentTime = this.formatTime(currentTime);
            this.duration = this.formatTime(duration);
            this.progress = progress;
        },
        formatTime(time) {
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60);
            return `${minutes}:${seconds.toString().padStart(2, '0')}`;
        },
        seek(event) {
            const audio = this.$refs.audioPlayer;
            const progressElement = event.target;
            const progressRect = progressElement.getBoundingClientRect();
            const clickX = event.clientX - progressRect.left;
            const duration = audio.duration;
            const progress = clickX / duration;
            const newTime = duration * progress;
            audio.currentTime = newTime;
        },
    }
};
</script>
  
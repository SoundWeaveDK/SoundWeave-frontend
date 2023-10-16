<template>
    <div class="h-full text-black dark:text-white dark:bg-slate-800 border-solid border-t-2 border-blue-950 rounded-t-lg">
        <div v-if="!userStore.getUser.id">
            <!-- you havent selected a podcast yet -->
            <p class="text-center text-sm font-medium my-auto">Login to listen to podcasts</p>
        </div>
        <div v-else-if="!podcastStore.getSelectedPodcast.id">
            <!-- you havent selected a podcast yet -->
            <p class="text-center text-sm font-medium my-auto">Select a podcast to play</p>
        </div>
        <div v-else class="w-full h-full m-auto flex pl-4 pr-4">
            <div class="my-auto rounded">
                <img :src="podcastStore.getSelectedPodcast.thumbnail" alt="Podcast Image"
                    class="w-16 h-16 m-1 rounded-sm mobile:h-12 mobile:w-12">
            </div>
            <div class=" h-full w-full ">
                <div class="flex items-center justify-between h-full mx-4 my-auto ">
                    <div class="flex items-center my-auto">
                        <button class="mr-4" @click="togglePlayback">
                            <Icon v-if="isPlaying" name="fa6-solid:pause" size="2em" />
                            <Icon v-else name="fa6-solid:play" size="2em" />
                        </button>
                        <div class="flex flex-col">
                            <div class="text-sm font-medium ">{{ podcastStore.getSelectedPodcast.podcast_name }}</div>
                        </div>
                    </div>
                    <div class="h-full">
                        <!-- line -->
                        <div class="flex justify-center h-0 mobile:hidden">
                            <!-- if on bigfooter.vue then return to index -->
                            <NuxtLink :to="destination">
                                <div class="mx-auto m-1 w-64 h-1 bg-gray-400 rounded-full"></div>
                                <div class="mx-auto w-44 h-1 bg-gray-400 rounded-full"></div>
                            </NuxtLink>
                        </div>
                        <div class="flex items-center h-full">
                            <div class="text-xs  mr-4">{{ currentTime }}</div>
                            <div class="w-64 h-2 bg-gray-300 rounded-full cursor-pointer mobile:hidden" @click="seek">
                                <div class="h-full bg-blue-500 rounded-full" :style="{ width: progress + '%' }"></div>
                            </div>
                            <p class="text-lg font-semibold md:hidden">-</p>
                            <div class="text-xs  ml-4">{{ duration }}</div>
                        </div>
                    </div>
                    <div class="h-full flex mobile:hidden">
                        <!-- Add podcast to watch later -->
                        <button
                            v-if="!watchLaterStore.getWatchLater.find(watchLater => watchLater.podcastId == podcastStore.getSelectedPodcast.id)"
                            @click="addWatchLater" class="mr-8">
                            <Icon name="material-symbols:bookmark-add-outline" size="1.5em" />
                        </button>
                        <button v-else @click="deleteWatchLater" class="mr-8">
                            <Icon name="material-symbols:bookmark" size="1.5em" />
                        </button>

                        <!-- Like podcast -->
                        <button class="mr-8">
                            <Icon v-if="!isLiked" name="icon-park-outline:like" size="1.5em" />
                            <Icon v-else name="icon-park-solid:like" size="1.5em" />
                        </button>
                        <!-- volume -->
                        <div class="volume block h-full my-auto">
                            <Icon name="fa6-solid:volume-high" class="mr-3 h-full my-auto mb-1" size="1em" />
                            <input class="my-auto" type="range" min="0" max="1" step="0.1" v-model="volume"
                                @change="updateVolume">
                        </div>
                    </div>
                </div>
                <audio ref="audioPlayer" :src="podcastStore.getSelectedPodcast.podcast_file"
                    @timeupdate="onTimeUpdate"></audio>
            </div>
        </div>
    </div>
</template>


<script>
import axios from '@/utils/axiosInstance.ts'
import { useUserStore } from "../stores/login"
import { usePodcastStore } from '~/stores/podcast'
import { useWatchLaterStore } from '~/stores/watchLater'
import { mapStores } from "pinia";

export default {
    computed: {
        ...mapStores(useUserStore, usePodcastStore, useWatchLaterStore),
        destination() {
            if (this.$route.path == "/podcast/" + this.podcastStore.getSelectedPodcast.id) {
                return "/";
            } else {
                return "/podcast/" + this.podcastStore.getSelectedPodcast.id;
            }
        },
    },
    created() {
        this.token = this.userStore.getAccessToken;
        this.loggedinUser = this.userStore.getUser;
        if (this.loggedinUser.id) {
            this.getWatchLater();
        }
    },
    data() {
        return {
            loggedinUser: "",
            storedPodcast: "",
            token: '',
            isPlaying: false,
            currentTime: '0:00',
            duration: '0:00',
            progress: 0,
            volume: 1,
            isLiked: false,
        };
    },
    methods: {
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
        updateVolume(event) {
            const audio = this.$refs.audioPlayer;
            audio.volume = event.target.value;
        },
        async getWatchLater() {
            await axios.get('/api/watchlater/read-users-watch-later/' + this.loggedinUser.id, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            }).then((response) => {
                this.watchLaterStore.setWatchLater(response.data);
            }).catch((error) => {
                if (error) {
                    alert((error));
                }
            });
        },
        async addWatchLater() {
            await axios.post('/api/watchlater/add-watch-later', {
                userId: this.loggedinUser.id,
                podcastId: this.podcastStore.getSelectedPodcast.id,
            }, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            }).then((response) => {
                this.watchLaterStore.addWatchLater(response.data);
            }).catch((error) => {
                if (error) {
                    alert((error));
                }
            });
        },
        async deleteWatchLater() {
            await axios.delete('/api/watchlater/delete-single-watch-later/' + this.watchLaterStore.getWatchLater.find(watchLater => watchLater.podcastId == this.podcastStore.getSelectedPodcast.id).id, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            }).then((response) => {
                this.watchLaterStore.deleteWatchLater(response.data.id);
            }).catch((error) => {
                if (error) {
                    alert((error));
                }
            });
        },
    },
};
</script>
<template>
    <div v-if="podcastLoaded" class="grid grid-cols-6">
        <div class="col-span-6">
            <div class="p-8">
                <h1 class="text-4xl font-bold text-black dark:text-white pb-4 w-fit mx-auto">
                    {{ podcastStore.getSelectedPodcast.podcast_name }}
                </h1>
                <img :src="podcastStore.getSelectedPodcast.thumbnail" alt="Podcast Image"
                    class="w-72 h-72 mobile:w-52 mobile:h-52 m-auto" />
                <!-- <div class="flex justify-center mt-2">
                    <div class="text-xs mr-4 dark:text-white">{{ currentTime }}</div>
                    <div class="w-64 h-2 bg-gray-300 rounded-full cursor-pointer mobile:hidden" @click="seek">
                        <div class="h-full bg-blue-500 rounded-full" :style="{ width: progress + '%' }"></div>
                    </div>
                    <p class="text-lg font-semibold md:hidden">-</p>
                    <div class="text-xs dark:text-white ml-4">{{ duration }}</div>
                </div> -->
                <div>
                    <div class="flex justify-between w-full">
                        <div class="flex pb-3">
                            <!-- Creator -->
                            <NuxtLink :to="`/profile/${podcastStore.getSelectedPodcast.userId}`" class="flex">
                                <img :src="podcastStore.getSelectedPodcast.fk_user_id.profile_picture ? podcastStore.getSelectedPodcast.fk_user_id.profile_picture : '/blank-profile-pict.png'"
                                    class=" w-10 h-10 mr-4 rounded-full float-left" />
                                <p class="text-black dark:text-white font-bold text-xl my-auto">{{
                                    podcastStore.getSelectedPodcast.fk_user_id.username
                                }}</p>
                            </NuxtLink>
                        </div>
                        <!-- upload date -->
                        <div v-if="podcastStore.getSelectedPodcast.createdAt"
                            class="flex text-black dark:text-white text-xl font-bold ml-auto items-center ">
                            <p>{{ podcastStore.getSelectedPodcast.createdAt.split('T')[0] }}</p>
                        </div>
                    </div>
                    <div class="flex justify-end w-full">
                        <!-- listens -->
                        <p class="flex text-black dark:text-white text-2xl font-bold ml-4 my-auto">
                            {{ podcastStore.getSelectedPodcast.views }}
                            <Icon name="fluent:headphones-sound-wave-20-filled" size="1.3em" />
                        </p>
                        <!-- likes -->
                        <p class="flex text-black dark:text-white text-2xl font-bold ml-4 my-auto">
                            {{ podcastStore.getSelectedPodcast.likes }}
                            <Icon name="icon-park-outline:like" size="1.3em" />
                        </p>
                    </div>
                    <!-- Description box -->
                    <div class="pt-4 h-full">
                        <div class="h-full">
                            <div class="flex">
                                <div class=" text-white text-xl font-semibold bg-gray-500 dark:bg-gray-700 overflow-hidden p-4 rounded-xl w-full"
                                    :class="{ 'max-h-40': !isExpanded }">
                                    <p class="whitespace-pre-wrap break-words">{{
                                        podcastStore.getSelectedPodcast.description }}</p>
                                </div>
                            </div>
                            <button v-if="showSeeMoreButton"
                                class="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                @click="toggleExpanded">
                                {{ isExpanded ? $t('seeLess') : $t('seeMore') }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-span-6">
        <!-- comment box -->
        <div class="p-8 h-full">
            <div class="rounded border-solid border-2 h-full">
                <div class="h-1/6">
                    <div class="flex">
                        <textarea v-model="newComment" type="text"
                            class="w-full m-4 mb-0 border-solid border-b-2 bg-transparent text-black dark:text-white "
                            :placeholder="placeholderText" />
                    </div>
                    <div>
                        <button @click="postComment"
                            class="bg-black dark:bg-white text-white dark:text-black rounded-full w-24 h-8 m-4 float-right">
                            <p class="text-sm">{{ $t('comment') }}</p>
                        </button>
                    </div>
                </div>
                <div class="h-96 w-full overflow-y-auto">
                    <!-- comments -->
                    <div v-if="commentStore" v-for="comment in commentStore.getComments" :key="comment.id"
                        class="w-full p-2" :id="comment.id">
                        <div>
                            <div class="inline-flex">
                                <p class="text-black dark:text-white font-bold pr-2 pointer">{{
                                    comment.fk_user_id.username }}
                                </p>
                                <Icon v-if="comment.userId === userStore.getUser.id" @click="deleteComment(comment.id)"
                                    name="mdi:comment-remove" class="cursor-pointer text-black dark:text-white"
                                    size="1.2em" />
                            </div>
                            <p class="text-black dark:text-white">{{ comment.comment }}</p>
                            <button v-if="isLiked" @click="removeCommentLike(comment.id)">
                                <Icon name="carbon:thumbs-up-filled" class="text-black dark:text-white" size="1.3em" />
                            </button>
                            <button v-else @click="likeComment(comment.id)">
                                <Icon name="carbon:thumbs-up" class="text-black dark:text-white" size="1.3em" />
                            </button>
                            <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
                        </div>
                    </div>
                    <div v-else>
                        <p class="text-black dark:text-white font-bold">No comments yet</p>
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
import { useCommentStore } from '~/stores/comments'
import { useCommentLikeStore } from '~/stores/commentLike'
import { mapStores } from "pinia";

export default {
    name: "Podcast",
    computed: {
        ...mapStores(useUserStore, usePodcastStore, useCommentStore, useCommentLikeStore),
        placeholderText() {
            return this.$t('comment');
        },
        showSeeMoreButton() {
            return this.podcastStore.getSelectedPodcast.description.length > 500;
        },
    },
    created() {
        if (this.podcastStore.getSelectedPodcast) {
            this.getSinglePodcasts();
        }
        this.fetchComments();
    },
    data() {
        return {
            podcastLoaded: false,
            newComment: "",
            isLiked: false,
            isExpanded: false,
        };
    },
    methods: {
        async getSinglePodcasts() {
            await axios.get('/api/podcast/read-single-podcast/ ' + this.$route.params.id, {
                headers: {
                    Authorization: `Bearer ${this.userStore.getAccessToken}`
                }
            }).then((response) => {
                if (response.status === 200) {
                    this.podcastStore.setSelectedPodcast(response.data);
                    this.podcastLoaded = true;
                }
            }).catch((error) => {
                if (error) {
                    console.log(error);
                }
            });
        },
        async fetchComments() {
            await axios.get('/api/podcastcomments/read-single-podcast-comments/' + this.podcastStore.getSelectedPodcast.id, {
                headers: {
                    Authorization: `Bearer ${this.userStore.getAccessToken}`
                }
            }).then((response) => {
                if (response.status === 200) {
                    this.commentStore.setComments(response.data);
                }
            }).catch((error) => {
                if (error) {
                    console.log((error));
                }
            });
        },
        async postComment() {
            await axios.post('/api/podcastcomments/add-comment', {
                comment: this.newComment,
                userId: this.userStore.getUser.id,
                podcastId: this.podcastStore.getSelectedPodcast.id,
            }, {
                headers: {
                    Authorization: `Bearer ${this.userStore.getAccessToken}`
                }
            }).then((response) => {
                if (response.status === 201) {
                    this.newComment = "";
                    this.commentStore.addComment(response.data);
                }
            }).catch((error) => {
                if (error) {
                    alert((error));
                }
            });
        },
        async deleteComment(commentId) {
            await axios.delete('/api/podcastcomments/delete-comment/' + commentId, {
                headers: {
                    Authorization: `Bearer ${this.userStore.getAccessToken}`
                }
            }).then((response) => {
                if (response.status === 200) {
                    this.commentStore.deleteComment(commentId);
                }
            }).catch((error) => {
                if (error) {
                    console.log((error));
                }
            });
        },
        async likeComment(commentId) {
            await axios.post('/api/commentlike/add-comment-like', {
                userId: this.userStore.getUser.id,
                commentId: commentId,
            }, {
                headers: {
                    Authorization: `Bearer ${this.userStore.getAccessToken}`
                }
            }).then((response) => {
                if (response.status === 201) {
                    this.isLiked = true;
                }
            }).catch((error) => {
                if (error) {
                    alert((error));
                }
            });
        },
        async removeCommentLike(commentId) {
            await axios.delete('/api/commentlike/delete-comment-like/' + commentId, {
                headers: {
                    Authorization: `Bearer ${this.userStore.getAccessToken}`
                }
            }).then((response) => {
                if (response.status === 200) {
                    this.isLiked = false;
                }
            }).catch((error) => {
                if (error) {
                    console.log((error));
                }
            });
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
        toggleExpanded() {
            this.isExpanded = !this.isExpanded;
        },
    }
};
</script>
  

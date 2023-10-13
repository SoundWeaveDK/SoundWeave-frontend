<template>
    {{ console.log("hello") }}
    <div class="max-w-7xl h-full mx-auto py-6 sm:px-6 lg:px-8">
        <div class="flex justify-between" style="height: 10%;">
            <h2 class="text-2xl font-bold text-black dark:text-white">{{ $t('managePodcasts') }}</h2>
            <button @click="createPodcast" class="bg-blue-500 hover:bg-blue-700 text-white font-bold h-10 px-4 rounded">
                {{ $t('uploadPodcast') }}
            </button>
        </div>
        <div class="text-black dark:text-white overflow-auto " style="height: 90%;">
            <div v-for="podcast in podcastStore.getPodcasts">
                <div class="flex rounded my-4 p-4 border-solid border-2 border-blue-950 ">
                    <img :src="podcast.thumbnail" class="h-20 w-20 rounded">
                    <div class="block h-full mx-4 my-auto">
                        <p class="text-xl font-bold">{{ podcast.podcast_name }}</p>
                        <p class="text-sm">
                            <Icon name="ph:vinyl-record" size="2em" />
                            {{ podcast.views }}
                        </p>
                    </div>
                    <div class="flex float-right h-full my-auto ml-auto">
                        <button @click="editPodcast(podcast.id, podcast.podcast_name, podcast.description)"
                            class="px-4 hover:text-gray-400">
                            {{ $t('edit') }}
                        </button>
                        <button @click="deletePodcast(podcast.id)" class="pr-4 hover:text-gray-400 ">
                            {{ $t('delete') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>

import { mapStores } from 'pinia'
import { usePodcastStore } from '~/stores/podcast';
import { useUserStore } from '~/stores/login';
import Swal from 'sweetalert2';
import axios from '@/utils/axiosInstance.ts'

export default {
    computed: {
        ...mapStores(usePodcastStore, useUserStore),
    },
    created() {
        this.user = this.userStore.getUser;
        this.token = this.userStore.getAccessToken;
        this.getPodcasts(this.user.id);
    },
    data() {
        return {
            token: "",
            user: {},
        };
    },
    methods: {
        async getPodcasts(id) {
            await axios.get(`/api/podcast/read-user-podcast/${id}`, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                }
            }).then((response) => {
                if (response.status == 200) {
                    // console.log(response.data);
                    this.podcastStore.setPodcasts(response.data);
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Podcast retrieval failed!',
                        icon: 'error',
                        confirmButtonText: 'OK',
                    });
                }
            });
        },

        async createPodcast() {
            // TODO: Implement create functionality

            const { value: formValues } = await Swal.fire({
                title: 'Upload podcast',
                html:
                    '<div class="space-y-4">' +
                    '<div>' +
                    '<label for="title" class="block text-gray-700 font-bold mb-2">Title</label>' +
                    '<input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="title" name="title"/> ' +
                    '</div>' +
                    '<div>' +
                    '<label for="image" class="block text-gray-700 font-bold mb-2">Thumbnail</label>' +
                    '<input type="file" id="image" name="image" accept="image/*" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">' +
                    '</div>' +
                    '<div>' +
                    '<label for="mp3" class="block text-gray-700 font-bold mb-2">Podcast</label>' +
                    '<input type="file" id="mp3" name="mp3" accept="audio/*" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">' +
                    '</div>' +
                    '<div>' +
                    '<label for="description" class="block text-gray-700 font-bold mb-2">Description</label>' +
                    '<textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" name="description"></textarea>' +
                    '</div>' +
                    '</div>',
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: 'Upload',
                cancelButtonText: 'Cancel',
                preConfirm: () => {
                    return [
                        document.getElementById('title').value,
                        document.getElementById('image').files[0],
                        document.getElementById('mp3').files[0],
                        document.getElementById('description').value,
                    ];
                },
            });

            if (formValues) {
                const [title, image, mp3, description] = formValues;
                // Upload the podcast...
                // make image into file type
                const tempimage = new File([image], image.name, { type: image.type });
                const imageResponse = await UploadFile(tempimage, "images");
                // log the file name
                if (imageResponse.status == 201) {
                    //make mp3 into file type
                    const tempmp3 = new File([mp3], mp3.name, { type: mp3.type });
                    const mp3Response = await UploadFile(tempmp3, "podcasts");
                    // log the file name
                    if (mp3Response.status == 201) {
                        // upload podcast to database
                        await axios.post('/api/podcast/create-podcast', {
                            userId: this.user.id,
                            podcast_name: title,
                            podcast_file: mp3Response.fileName,
                            description: description,
                            thumbnail: imageResponse.fileName,
                        },
                            {
                                headers: {
                                    Authorization: `Bearer ${this.token}`,
                                }
                            }

                        ).then((response) => {
                            if (response.status == 201) {
                                this.podcastStore.addPodcast(response.data);
                                Swal.fire({
                                    title: 'Success!',
                                    text: 'Podcast uploaded successfully!',
                                    icon: 'success',
                                    confirmButtonText: 'OK',
                                });
                            } else {
                                Swal.fire({
                                    title: 'Error!',
                                    text: 'Podcast upload failed!',
                                    icon: 'error',
                                    confirmButtonText: 'OK',
                                });
                            }
                        });

                    }
                }
            }
        },

        async editPodcast(id, title, description) {
            const { value: formValues } = await Swal.fire({
                title: 'Edit podcast',
                html:

                    '<div class="space-y-4">' +
                    '<div>' +
                    '<label for="title" class="block text-gray-700 font-bold mb-2">Title</label>' +
                    '<input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="title" name="title" value="' + title + '"  /> ' +
                    '</div>' +
                    '<div>' +
                    '<label for="description" class="block text-gray-700 font-bold mb-2">Description</label>' +
                    '<textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" name="description" >' + description + '</textarea>' +
                    '</div>' +
                    '</div>',
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: 'Upload',
                cancelButtonText: 'Cancel',
                preConfirm: () => {
                    return [
                        document.getElementById('title').value,
                        document.getElementById('description').value,
                    ];
                },
            });
            if (formValues) {
                const [title, description] = formValues;
                // Upload the podcast...
                // upload podcast to database
                await axios.patch(`/api/podcast/update-podcast/${id}`, {
                    podcast_name: title,
                    description: description,
                },
                    {
                        headers: {
                            Authorization: `Bearer ${this.token}`,
                        }
                    }

                ).then((response) => {
                    console.log(response);
                    if (response.status == 201) {
                        Swal.fire({
                            title: 'Success!',
                            text: 'Podcast updated successfully!',
                            icon: 'success',
                            confirmButtonText: 'OK',
                        });
                        this.podcastStore.updatePodcast(response.data);
                    } else {
                        Swal.fire({
                            title: 'Error!',
                            text: 'Podcast update failed!',
                            icon: 'error',
                            confirmButtonText: 'OK',
                        });
                    }
                });

            }
        },

        async deletePodcast(id) {
            await axios.delete(`/api/podcast/delete-podcast/${id}`, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                }
            }).then((response) => {
                if (response.status == 200) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Podcast deleted successfully!',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });
                    this.podcastStore.deletePodcast(id);
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Podcast deletion failed!',
                        icon: 'error',
                        confirmButtonText: 'OK',
                    });
                }
            });

        },
    },
};
</script>
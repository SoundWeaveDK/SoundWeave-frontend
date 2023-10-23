<template>
    <div v-if="podcastsLoaded" class="max-w-7xl h-full mx-auto py-6 sm:px-6 lg:px-8">
        <div v-if="loading">
            <div role="status" style="display: flex; align-items: center; justify-content: center;">
                <svg aria-hidden=" true"
                    class="inline w-24 h-24 mr-24 text-gray-200 animate-spin dark:text-gray-600 fill-green-500 dark:fill-white"
                    viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor" />
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill" />
                </svg>
                <span class="sr-only"> {{ $t('scanningForViruses') }} </span>
            </div>
            <p class="text-black dark:text-white text-center text-xl mr-20">{{ $t('scanningForViruses') }}</p>
        </div>
        <div v-else>
            <div class="flex justify-between" style="height: 10%;">
                <h2 class="text-2xl font-bold text-black dark:text-white">{{ $t('managePodcasts') }}</h2>
                <button @click="createPodcast" class="bg-blue-500 hover:bg-blue-700 text-white font-bold h-10 px-4 rounded">
                    {{ $t('uploadPodcast') }}
                </button>
            </div>
            <div>
                <div class="text-black dark:text-white overflow-auto " style="height: 90%;">
                    <div v-if="podcastStore.getPodcasts[0]" v-for="podcast in podcastStore.getPodcasts">
                        <div class="flex rounded my-4 p-4 border-solid border-2 border-blue-950 ">
                            <img :src="podcast.thumbnail" class="h-20 w-20 rounded">
                            <div class="block h-full mx-4 my-auto">
                                <p class="text-xl font-bold">{{ podcast.podcast_name }}</p>
                                <div>
                                    <p class="text-sm">
                                        <Icon name="ph:vinyl-record" size="2em" />
                                        {{ podcast.views }}
                                    </p>
                                    <p class="text-sm">
                                        <Icon name="ph:currency-circle-dollar-bold" size="2em" />
                                        {{ podcast.views / 2 }}kr
                                    </p>
                                </div>
                            </div>

                            <div class="flex float-right h-full my-auto ml-auto">
                                <NuxtLink :to="`/analytics/${podcast.id}`" class=" hover:text-gray-400">
                                    {{ $t('analytics') }}
                                </NuxtLink>

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
                    <div v-else class="flex justify-center items-center">
                        <h1 class="text-2xl text-black dark:text-white pt-24">{{ $t('noUploads') }}</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="flex justify-center items-center h-full">
        <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
    </div>
</template>

<script setup>

definePageMeta({
    middleware: ["auth"]
})
</script>
  
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
            podcastsLoaded: false,
            token: "",
            user: {},
            loading: false
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
                    this.podcastStore.setPodcasts(response.data);
                    this.podcastsLoaded = true;
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
                this.loading = true;
                const [title, image, mp3, description] = formValues;

                // Check aspect ratio of thumbnail image
                try {
                    await this.checkAspectRatio(image);
                }
                catch (error) {
                    console.log(error);
                    Swal.fire({
                        title: 'Error!',
                        text: error.message,
                        icon: 'error',
                        confirmButtonText: 'OK',
                    });
                    this.loading = false;
                    return;
                }

                // Resize image
                try {
                    var resizedImage = await this.resizeImage(image);
                }
                catch (error) {
                    console.log(error);
                    Swal.fire({
                        title: 'Error!',
                        text: error.message,
                        icon: 'error',
                        confirmButtonText: 'OK',
                    });
                    this.loading = false;
                    return;
                }

                const tempimage = new File([resizedImage], image.name, { type: resizedImage.type });
                const imageResponse = await UploadFile(tempimage, "images");
                if (imageResponse.status == 201) {
                    const tempmp3 = new File([mp3], mp3.name, { type: mp3.type });
                    const mp3Response = await UploadFile(tempmp3, "podcasts");
                    if (mp3Response.status == 201) {
                        await new Promise(r => setTimeout(r, 5000));
                        try {
                            await axios.post('api/azurestorage/getimage', {
                                fileName: imageResponse.fileName,
                            },
                                {
                                    headers: {
                                        Authorization: `Bearer ${this.token}`,
                                    }
                                });
                        } catch (error) {
                            Swal.fire({
                                title: 'Error!',
                                text: 'Virus detected in image. Upload failed!',
                                icon: 'error',
                                confirmButtonText: 'OK',
                            });
                            this.loading = false;
                            return;
                        }

                        try {
                            await axios.post('api/azurestorage/getpodcast', {
                                fileName: mp3Response.fileName,
                            },
                                {
                                    headers: {
                                        Authorization: `Bearer ${this.token}`,
                                    }
                                });
                        }
                        catch (error) {
                            Swal.fire({
                                title: 'Error!',
                                text: 'Virus detected in podcast. Upload failed!',
                                icon: 'error',
                                confirmButtonText: 'OK',
                            });
                            this.loading = false;
                            return;
                        }

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
            this.loading = false;
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
        // returns true if aspect ratio is 1:1
        async checkAspectRatio(image) {
            const img = new Image();
            img.src = URL.createObjectURL(image);

            return new Promise(async (resolve, reject) => {
                img.onload = () => {
                    const { width, height } = img;
                    if (width === height) {
                        resolve(true);
                    } else {
                        reject(new Error("Aspect ratio is not 1:1"));
                    }
                };
                img.onerror = () => {
                    reject(new Error("Failed to load the image"));
                };
            });
        },
        // returns a resized image blob for thumbnail
        async resizeImage(image) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const MAX_WIDTH = 300;
            const MAX_HEIGHT = 300;

            return new Promise(async (resolve, reject) => {
                const img = new Image();
                img.src = URL.createObjectURL(image);

                img.onload = () => {
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);
                    canvas.toBlob((blob) => {
                        resolve(blob);
                    }, 'image/jpeg', 1);
                };

                img.onerror = () => {
                    reject(new Error("Failed to load the image"));
                };
            });
        },
    }
};
</script>
<template>
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
        <div v-if="user" class="p-6">
            <div class="flex items-center space-x-4 ml-4">
                <div class="flex-shrink-0">
                    <img :src="user.profile_picture ? user.profile_picture : 'https://cdn.vanderbilt.edu/vu-URL/wp-content/uploads/sites/288/2019/03/19223634/Image-Coming-Soon-Placeholder.png'"
                        alt="Profile picture" class="rounded-full w-24 h-24 mt-8">>
                </div>
                <div>
                    <h2 class="text-2xl font-medium text-black dark:text-white ">{{ user.username }}</h2>
                    <div class="text-gray-600  dark:text-white">{{ user.email }}</div>
                    <div class="text-gray-600 dark:text-white">{{ calculateAge(user.birthday) }} {{ $t('yearsOld') }}, {{
                        user.fk_gender_id.gender_name }}, {{
        $t('from') }} {{ user.fk_country_id.country_name }}</div>
                </div>
                <div class="flex-1 text-right">
                    <div v-if="userStore.getUser.id !== user.id">
                        <button v-if="followedStore.getFollowed.some(data => data.id === user.id)" @click="unfollowUser"
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-4">
                            {{ $t('unfollow') }}
                        </button>
                        <button v-else @click="followUser"
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-4">
                            {{ $t('follow') }}
                        </button>
                    </div>
                </div>
            </div>
            <div class="flex items-center space-x-4 ml-4">
                <div>
                    <!-- edit profile box -->
                    <div v-if="userStore.getUser.id == user.id" class="h-8">

                        <button @click="editProfile"
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-4">
                            {{ $t('editProfile') }}
                        </button>

                    </div>
                </div>
                <div class="mt-3">
                    <!-- manage page -->
                    <div v-if="userStore.getUser.id == user.id" class="h-8">

                        <NuxtLink to="/manage"
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-4">
                            {{ $t('managePodcasts') }}
                        </NuxtLink>
                    </div>
                </div>
                <div id="languageSelector" class="my-auto grow">
                    <form class="mb-4">
                        <label class="flex text-dark dark:text-white" for="locale-select">{{ $t('language') }}&nbsp;
                            <Icon class="self-center" :name="'circle-flags:' + $i18n.locale" />
                        </label>
                        <select id="locale-select" v-model="$i18n.locale" @change="updateLanguage"
                            class="text-dark dark:text-white rounded p-2 bg-blue-500">
                            <option v-for="locale in $i18n.availableLocales" :key="locale" :value="locale"
                                class="text-black">
                                {{ $t(locale) }}
                            </option>
                        </select>
                    </form>
                </div>
            </div>

            <div class="mt-8">
                <PodcastBox :podcastData="podcastData" />
            </div>
        </div>
    </div>
</template>
  
<script>
import { useUserStore } from "../stores/login"
import { useFollowedStore } from "@/stores/followed"
import { mapStores } from "pinia";
import axios from '@/utils/axiosInstance.ts'
import Swal from 'sweetalert2';

export default {
    computed: {
        ...mapStores(useUserStore, useFollowedStore)
    },
    created() {
        this.getUserPodcasts();
        this.getUser();
        this.getFollowing();
    },
    data() {
        return {
            user: null,
            podcastData: [],
            loading: false
        };
    },
    methods: {
        calculateAge(birthday) {
            //birthday format YYYY-MM-DD
            var birthdayDate = new Date(birthday);
            var ageDifMs = Date.now() - birthdayDate.getTime();
            var ageDate = new Date(ageDifMs);
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        },
        async getUserPodcasts() {
            await axios.get('api/podcast/read-user-podcast/' + this.$route.params.id, {
                headers: {
                    Authorization: `Bearer ${this.userStore.getAccessToken}`
                }
            }).then((response) => {
                this.podcastData = response.data;
            }).catch((error) => {
                if (error) {
                    console.log(error);
                }
            });
        },
        async getFollowing() {
            // get the user's following
            await axios.get('/api/followuser/read-users-followers/' + this.userStore.getUser.id, {
                headers: {
                    Authorization: `Bearer ${this.userStore.getAccessToken}`
                }
            }).then((response) => {
                this.followedStore.clearFollowed();
                for (let i = 0; i < response.data.length; i++) {
                    for (let j = 0; j < response.data[i].following.length; j++) {
                        this.followedStore.addFollowed(response.data[i].following[j]);
                    }
                }
            }).catch((error) => {
                if (error) {
                    console.log(error);
                }
            });
            this.loaded = true;
        },
        async followUser() {
            // follow user
            await axios.put('/api/followuser/follow-user', {
                followerId: this.userStore.getUser.id,
                followingId: this.user.id
            }, {
                headers: {
                    Authorization: `Bearer ${this.userStore.getAccessToken}`
                }
            }).then((response) => {
                if (response.status == 200) {
                    this.getFollowing();
                }
            }).catch((error) => {
                if (error) {
                    console.log(error);
                }
            });
        },
        async unfollowUser() {
            await axios.put('/api/followuser/unfollow-user', {
                followerId: this.userStore.getUser.id,
                followingId: this.user.id
            }, {
                headers: {
                    Authorization: `Bearer ${this.userStore.getAccessToken}`
                }
            }).then((response) => {
                if (response.status == 200) {
                    this.getFollowing();
                }
            }).catch((error) => {
                if (error) {
                    console.log(error);
                }
            });
        },
        async getUser() {
            await axios.get('/api/user/read-single-user/' + this.$route.params.id, {
                headers: {
                    Authorization: `Bearer ${this.userStore.getAccessToken}`
                }
            }).then((response) => {
                this.user = response.data;
            }).catch((error) => {
                if (error) {
                    console.log(error);
                }
            });
        },
        updateLanguage() {
            localStorage.setItem('locale', this.$i18n.locale)
        },
        async editProfile() {
            const { value: formValues } = await Swal.fire({
                title: 'Edit profile',
                html: '<div class="space-y-4">' +
                    '<div>' +
                    '<label for="password" class="block text-gray-700 font-bold mb-2">Password</label>' +
                    '<input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" id="password" name="password"/> ' +
                    '</div>' +
                    '<label for="confirmPassword" class="block text-gray-700 font-bold mb-2">Confirm Password</label>' +
                    '<input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" id="confirmPassword" name="confirmPassword"/> ' +
                    '</div>' +
                    '<div>' +
                    '<label for="birthday" class="block text-gray-700 font-bold mb-2">Birthday</label>' +
                    '<input type="date" id="birthday" name="birthday" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder-gray-400" value="' + this.user.birthday + '"/>' +
                    '</div>' +
                    '<label for"profilePicture" class="block text-gray-700 font-bold mb-2">Profile picture</label>' +
                    '<input type="file" id="profilePicture" name="profilePicture" accept="image/png, image/jpeg" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">' +
                    '</div>',
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                preConfirm: () => {
                    return [
                        document.getElementById('password').value,
                        document.getElementById('confirmPassword').value,
                        document.getElementById('birthday').value,
                        document.getElementById('profilePicture').files[0]
                    ];
                },
            });
            if (formValues) {
                this.loading = true;
                const [password, confirmPassword, birthday, profilePicture] = formValues;

                if (password != confirmPassword) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Passwords do not match!',
                    });
                    this.loading = false;
                    return;
                }
                var imageResponse = null;
                if (profilePicture) {
                    try {
                        await this.checkAspectRatio(profilePicture);
                        var resizedImage = await this.resizeImage(profilePicture);
                    }
                    catch (error) {
                        Swal.fire({
                            title: 'Error!',
                            text: error.message,
                            icon: 'error',
                            confirmButtonText: 'OK',
                        });
                        this.loading = false;
                        return;
                    }

                    const tempimage = new File([resizedImage], profilePicture.name, { type: resizedImage.type });
                    imageResponse = await UploadFile(tempimage, "images");

                    if (imageResponse.status == 201) {
                        await new Promise(r => setTimeout(r, 5000));

                        try {
                            await axios.post('api/azurestorage/getimage', {
                                fileName: imageResponse.fileName,
                            },
                                {
                                    headers: {
                                        Authorization: `Bearer ${this.userStore.getAccessToken}`,
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
                    }
                    else {
                        Swal.fire({
                            title: 'Error!',
                            text: 'Upload failed!',
                            icon: 'error',
                            confirmButtonText: 'OK',
                        });
                        this.loading = false;
                        return;
                    }
                }
                try {
                    await axios.put('/api/user/update-user', {
                        userId: this.user.id,
                        email: this.user.email,
                        ...(password ? { password: password } : {}),
                        username: this.user.username,
                        birthday: birthday,
                        countryId: this.user.fk_country_id.id,
                        genderId: this.user.fk_gender_id.id,
                        ...(imageResponse ? { profilePicture: imageResponse.fileName } : {})
                    },
                        {
                            headers: {
                                Authorization: `Bearer ${this.userStore.getAccessToken}`,
                            }
                        }
                    ).then((response) => {
                        if (response.status == 200) {
                            Swal.fire({
                                title: 'Success!',
                                text: 'Updated profile successfully!',
                                icon: 'success',
                                confirmButtonText: 'OK',
                            });
                        } else {
                            Swal.fire({
                                title: 'Error!',
                                text: response.data,
                                icon: 'error',
                                confirmButtonText: 'OK',
                            });
                            this.loading = false;
                            return;
                        }
                        this.userStore.setUser(response.data);
                        this.loading = false;
                        location.reload();
                    })
                }
                catch (error) {
                    Swal.fire({
                        title: 'Error!',
                        text: error,
                        icon: 'error',
                        confirmButtonText: 'OK',
                    });
                    this.loading = false;
                    return;
                }
            }
            this.loading = false;
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
    },
};
</script>
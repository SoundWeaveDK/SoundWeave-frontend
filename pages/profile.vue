<template>
    <div class="p-6">
        <div class="flex items-center space-x-4 ml-16">
            <div class="flex-shrink-0">
                <img src="https://via.placeholder.com/150" alt="Profile picture" class="rounded-full w-24 h-24">
            </div>
            <div>
                <h2 class="text-2xl font-medium text-black dark:text-white ">{{ user.username }}</h2>
                <div class="text-gray-600  dark:text-white">{{ user.email }}</div>
                <div class="text-gray-600 dark:text-white">{{ user.age }} {{ $t('yearsOld') }}, {{ user.gender }}, {{
                    $t('from') }} {{ user.country
    }}</div>
            </div>
            <div class="flex-1 text-right mr-16">
                <button v-if="loggedInUser.id !== user.id"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    {{ $t('follow') }}
                </button>
            </div>
        </div>
        <div class="">
            <div class="float-right mr-16">
                <!-- analytics page -->
                <NuxtLink v-if="loggedInUser.id === user.id" to="/analytics"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-4">
                    {{ $t('analytics') }}
                </NuxtLink>
                <!-- upload -->
                <button v-if="loggedInUser.id === user.id" @click="upload"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    {{ $t('upload') }}
                </button>
            </div>
            <div class="inline-grid mt-4">
                <PodcastBox />
            </div>
        </div>
    </div>
</template>
  
<script>
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            user: null,
            loggedInUser: {
                id: 1,
                username: 'Joe Biden',
                email: 'joeBiden@usgov.com'
            },
            userPodcasts: [
                {
                    id: 1,
                    title: 'Test podcast',
                    description: 'This is a test podcast',
                    image: 'https://via.placeholder.com/150',
                    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
                    created_at: '2021-01-01',
                    user_id: 1,
                },
            ],
        };
    },
    created() {
        this.user = {
            id: 1,
            email: 'joeBiden@usgov.com',
            username: 'Joe Biden',
            created_at: '2021-01-01',
            gender: 'Male',
            age: 78,
            country: 'USA',
        };
    },
    methods: {
        async upload() {
            const { value: formValues } = await Swal.fire({
                title: 'Upload podcast',
                html:
                    '<div class="space-y-4">' +
                    '<div>' +
                    '<label for="title" class="block text-gray-700 font-bold mb-2">Title</label>' +
                    '<input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="title" name="title"/> ' +
                    '</div>' +
                    '<div>' +
                    '<label for="file" class="block text-gray-700 font-bold mb-2">File</label>' +
                    '<input type="file" id="file" name="file" accept="audio/*" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">' +
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
                        document.getElementById('file').files[0],
                        document.getElementById('description').value,
                    ];
                },
            });

            if (formValues) {
                const [title, file, description] = formValues;
                console.log(title, file, description);
                // Upload the podcast...
            }
        },
    }
};
</script>
<template>
    <div>

    </div>
</template>

<!-- <script>
import { useUserStore } from "../stores/login"
import { mapStores } from "pinia";

export default {
    data() {
        return {
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
    methods: {
        async upload() {
            console.log(this.userStore.getUser);
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
}

</script> -->
<template>
    <PodcastBox :podcastData="podcastData" />
</template>

<script>
import axios from '@/utils/axiosInstance.ts'

export default {
    data() {
        return {
            podcastData: [
                //[{"id":0,"userId":0,"podcast_name":"string","podcast_file":"string","description":"string","thumbnail":"string","views":0,"likes":0,"money":0,"fk_user_id":{"username":"string"}}]

                {
                    id: 1,
                    userId: 1,
                    podcast_name: "Podcast 1",
                    podcast_file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                    description: "This is a podcast",
                    thumbnail: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/1f2b5e119743765.60a406c890f14.png",
                    views: 0,
                    likes: 0,
                    money: 0,
                    fk_user_id: {
                        username: 1,
                    }
                },
                {
                    id: 2,
                    userId: 2,
                    podcast_name: "Podcast 2",
                    podcast_file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                    description: "This is a podcast",
                    thumbnail: "https://cdn.vanderbilt.edu/vu-URL/wp-content/uploads/sites/288/2019/03/19223634/Image-Coming-Soon-Placeholder.png",
                    views: 0,
                    likes: 0,
                    money: 0,
                    fk_user_id: {
                        username: 2,
                    }
                },
                {
                    id: 3,
                    userId: 3,
                    podcast_name: "Podcast 3",
                    podcast_file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                    description: "This is a podcast",
                    thumbnail: "https://dummyimage.com/200x200",
                    views: 0,
                    likes: 0,
                    money: 0,
                    fk_user_id: {
                        username: 3,
                    }
                },
                {
                    id: 4,
                    userId: 4,
                    podcast_name: "Podcast 4",
                    podcast_file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                    description: "This is a podcast",
                    thumbnail: "https://dummyimage.com/200x200",
                    views: 0,
                    likes: 0,
                    money: 0,
                    fk_user_id: {
                        username: 4,
                    }
                },
                {
                    id: 5,
                    userId: 5,
                    podcast_name: "Podcast 5",
                    podcast_file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                    description: "This is a podcast",
                    thumbnail: "https://dummyimage.com/200x200",
                    views: 0,
                    likes: 0,
                    money: 0,
                    fk_user_id: {
                        username: 5,
                    }
                },
            ],
        };
    },

};
</script>
<template>
    <section class="text-gray-600 body-font flex flex-wrap justify-center overscroll-auto">
        <div v-for="item in podcastData" :key="item.id"
            class="flex-shrink-0 w-2/3 sm:w-1/4 md:w-1/4 lg:w-1/6 p-4 m-2 bg-gray-200 dark:bg-gray-700 rounded-lg overscroll-y-auto">
            <div class="h-full">
                <div class="h-full flex mobile:flex-row flex-col items-center">
                    <NuxtLink :to="'/podcast/' + item.id">
                        <img alt="thumbnail"
                            class="flex-shrink-0 rounded-lg w-full h-50 mobile:w-1/2 object-cover object-center mb-4 mobile:mb-0 mobile:mr-3"
                            :src="item.thumbnail ? item.thumbnail : 'https://cdn.vanderbilt.edu/vu-URL/wp-content/uploads/sites/288/2019/03/19223634/Image-Coming-Soon-Placeholder.png'">
                    </NuxtLink>
                    <div class="w-full">
                        <NuxtLink :to="'/podcast/' + item.id">
                            <h2 class="title-font font-semibold text-lg text-gray-900 dark:text-neutral-100">{{
                                item.podcast_name
                            }}
                            </h2>
                        </NuxtLink>
                        <NuxtLink :to="'/profile/' + item.userId">
                            <h3 class="text-gray-500 dark:text-gray-400 mb-">{{ item.fk_user_id.username }}</h3>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    props: {
        podcastData: {
            type: Array,
        },
    },
};
</script>

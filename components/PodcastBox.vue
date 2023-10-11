<template>
    <section class="text-gray-600 body-font flex flex-wrap justify-center overscroll-auto">
        <div v-for="item in testData" :key="item.id"
            class="flex-shrink-0 w-2/3 sm:w-1/4 md:w-1/4 lg:w-1/6 p-4 m-2 bg-gray-200 dark:bg-gray-700 rounded-lg overscroll-y-auto">
            <div class="h-full">
                <div class="h-full flex mobile:flex-row flex-col items-center">
                    <img alt="thumbnail"
                        class="flex-shrink-0 rounded-lg w-full h-50 mobile:w-1/2 object-cover object-center mb-4 mobile:mb-0 mobile:mr-3"
                        :src="item.picture ? item.picture : 'https://cdn.vanderbilt.edu/vu-URL/wp-content/uploads/sites/288/2019/03/19223634/Image-Coming-Soon-Placeholder.png'">
                    <div class="w-full">
                        <h2 class="title-font font-semibold text-lg text-gray-900 dark:text-neutral-100">{{ item.title }}
                        </h2>
                        <h3 class="text-gray-500 dark:text-gray-400 mb-">{{ item.creator }}</h3>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    data() {
        return {
            testData: [
                {
                    id: 1,
                    picture: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/1f2b5e119743765.60a406c890f14.png",
                    title: "Sample Title 1",
                    creator: "Sample Creator 1",
                },
                {
                    id: 2,
                    title: "Sample Title 2",
                    creator: "Sample Creator 2",
                },
                {
                    id: 3,
                    title: "Sample Title 3",
                    creator: "Sample Creator 3",
                },
                {
                    id: 4,
                    title: "Sample Title 1",
                    creator: "Sample Creator 1",
                },
                {
                    id: 5,
                    title: "Sample Title 2",
                    creator: "Sample Creator 2",
                },
                {
                    id: 6,
                    title: "Sample Title 3",
                    creator: "Sample Creator 3",
                },
                {
                    id: 7,
                    title: "Sample Title 1",
                    creator: "Sample Creator 1",
                },
                {
                    id: 8,
                    title: "Sample Title 2",
                    creator: "Sample Creator 2",
                },
                {
                    id: 9,
                    title: "Sample Title 3",
                    creator: "Sample Creator 3",
                },
                {
                    id: 10,
                    title: "Sample Title 3",
                    creator: "Sample Creator 3",
                },
                {
                    id: 11,
                    title: "Sample Title 4",
                    creator: "Sample Creator 4",
                },
                {
                    id: 12,
                    title: "Sample Title 5",
                    creator: "Sample Creator 5",
                },
                {
                    id: 13,
                    title: "Sample Title 6",
                    creator: "Sample Creator 6",
                },
                {
                    id: 14,
                    title: "Sample Title 7",
                    creator: "Sample Creator 7",
                },
                {
                    id: 15,
                    title: "Sample Title 8",
                    creator: "Sample Creator 8",
                },
                {
                    id: 16,
                    title: "Sample Title 9",
                    creator: "Sample Creator 9",
                },
                {
                    id: 17,
                    title: "Sample Title 10",
                    creator: "Sample Creator 10",
                },
                {
                    id: 18,
                    title: "Sample Title 11",
                    creator: "Sample Creator 11",
                },
                {
                    id: 19,
                    title: "Sample Title 12",
                    creator: "Sample Creator 12",
                },
                {
                    id: 20,
                    title: "Sample Title 13",
                    creator: "Sample Creator 13",
                }
            ],
        };
    },
};
</script>

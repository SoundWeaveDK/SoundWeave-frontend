<template>
    <section class="text-gray-600 body-font flex flex-wrap">
        <div v-for="item in testData" :key="item.id"
            class="flex-shrink-0 w-full lg:w-1/6 md:w-1/4 p-4 m-2 bg-slate-200 rounded">
            <div class="h-full">
                <div class="h-full flex flex-col items-center text-center">
                    <img alt="thumbnail" class="flex-shrink-0 rounded-lg w-full h-40 object-cover object-center mb-4"
                        src="https://dummyimage.com/200x200">
                    <div class="w-full">
                        <h2 class="title-font font-medium text-lg text-gray-900">{{ item.title }}</h2>
                        <h3 class="text-gray-500 mb-3">{{ item.creator }}</h3>
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
            ],
        };
    },
};
</script>

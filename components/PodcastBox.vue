<template>
    <section class="text-gray-600 body-font">
        <div v-for="item in testData" :key="item.id" class="">
            <div class="m-4">
                <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-4 bg-slate-200 rounded">
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
                // Add more test data items as needed
            ],
        };
    },
};
</script>

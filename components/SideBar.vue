<script setup>
const { locale } = useI18n()
</script>

<template >
    <div class="flex overflow-y-auto ">
        <div class="flex flex-col h-screen p-3 text-black dark:text-white  bg-white dark:bg-slate-900 w-60">
            <div class="space-y-3">
                <div>
                    <!-- logo -->
                    <img src="../assets/images/icon.png" class="w-20 m-auto" />
                </div>

                <div class="flex items-center">
                    <h2 class="text-xl font-bold">Soundweave</h2>
                </div>
                <div class="flex-1">
                    <ul class="pt-2 pb-4 space-y-1 text-sm">
                        <li class="rounded-sm">
                            <button class="flex items-center p-2 space-x-3 rounded-md">
                                <Icon name="humbleicons:home" size="2em" />
                                <h1 class="text-xl">{{ $t('home') }}</h1>
                            </button>
                        </li>
                        <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
                        <li class="rounded-sm">
                            <p class="flex items-center p-2 space-x-3 rounded-md">
                                {{ $t('following') }}
                            </p>
                        </li>
                        <!-- followed creators -->
                        <div v-for="(creators, index) in testCreators">
                            <div v-if="index == testCreators.length - 1">
                                <div v-if="followMore">
                                    <button class="flex py-2">
                                        <img :src="creators.creator_image" class="w-10 h-10 rounded-full" />
                                        <p class="text-sm my-auto px-2 ">{{ creators.creator_name }}</p>
                                    </button>
                                </div>
                                <button class="flex py-2" @click="toggleFollow()">
                                    <Icon v-if="followMore" name="ic:baseline-keyboard-arrow-up" />
                                    <Icon v-else name="ic:baseline-keyboard-arrow-down" />
                                    <p v-if="followMore" class="text-sm my-auto px-2 hover:text-gray-500 ">{{
                                        $t('showLess') }}</p>
                                    <p v-else class="text-sm my-auto px-2 hover:text-gray-500 ">{{ $t('showMore') }}</p>
                                </button>
                            </div>
                            <div v-else-if="index < 4">
                                <button class="flex py-2">
                                    <img :src="creators.creator_image" class="w-10 h-10 rounded-full" />
                                    <p class="text-sm my-auto px-2 ">{{ creators.creator_name }}</p>
                                </button>
                            </div>
                            <div v-else-if="followMore">
                                <button class="flex py-2">
                                    <img :src="creators.creator_image" class="w-10 h-10 rounded-full" />
                                    <p class="text-sm my-auto px-2 ">{{ creators.creator_name }}</p>
                                </button>
                            </div>
                        </div>
                        <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
                        <li class="rounded-sm">
                            <p class="flex items-center p-2 space-x-3 rounded-md">
                                {{ $t('yourCollection') }}
                            </p>
                        </li>
                        <li class="rounded-sm">
                            <a class="flex items-center p-2 space-x-3 rounded-md">
                                <button class="text-xl">
                                    <!-- clock svg -->
                                    <Icon name="grommet-icons:clock" />
                                    {{ $t('watchLater') }}
                                </button>
                            </a>
                            <div v-for="(lists, index) in testLists">
                                <div v-if="index == testLists.length - 1">
                                    <div v-if="collectionMore">
                                        <button class="flex py-2">
                                            <span class="text-sm my-auto px-2 hover:text-gray-500">{{ lists.list_name
                                            }}</span>
                                        </button>
                                    </div>
                                    <button class="flex py-2" @click="toggleCollection()">
                                        <Icon v-if="collectionMore" name="ic:baseline-keyboard-arrow-up" />
                                        <Icon v-else name="ic:baseline-keyboard-arrow-down" />
                                        <p v-if="collectionMore" class="text-sm my-auto px-2 hover:text-gray-500 ">{{
                                            $t('showLess') }}</p>
                                        <p v-else class="text-sm my-auto px-2 hover:text-gray-500 ">{{ $t('showMore') }}</p>
                                    </button>
                                </div>
                                <div v-else-if="index < 4">
                                    <button class="flex py-2">
                                        <span class="text-sm my-auto px-2 hover:text-gray-500">{{ lists.list_name }}</span>
                                    </button>
                                </div>
                                <div v-else-if="collectionMore">
                                    <button class="flex py-2">
                                        <span class="text-sm my-auto px-2 hover:text-gray-500">{{ lists.list_name }}</span>
                                    </button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'SideBar',
    data() {
        return {
            followMore: false,
            collectionMore: false,
            // my lists
            testLists: [
                {
                    id: 1,
                    list_name: "Sample List 1",
                },
                {
                    id: 2,
                    list_name: "Sample List 2",
                },
                {
                    id: 3,
                    list_name: "Sample List 3",
                },
                {
                    id: 4,
                    list_name: "Sample List 4",
                },
                {
                    id: 5,
                    list_name: "Sample List 5",
                },
                {
                    id: 6,
                    list_name: "Sample List 6",
                }
                // Add more test data items as needed
            ],
            // followed creators
            testCreators: [
                {
                    id: 1,
                    creator_name: "Sample Creator 1",
                    creator_image: "https://dummyimage.com/200x200",
                },
                {
                    id: 2,
                    creator_name: "Sample Creator 2",
                    creator_image: "https://dummyimage.com/200x200",
                },
                {
                    id: 3,
                    creator_name: "Sample Creator 3",
                    creator_image: "https://dummyimage.com/200x200",
                },
                {
                    id: 4,
                    creator_name: "Sample Creator 4",
                    creator_image: "https://dummyimage.com/200x200",
                },
                {
                    id: 5,
                    creator_name: "Sample Creator 5",
                    creator_image: "https://dummyimage.com/200x200",
                },
                {
                    id: 6,
                    creator_name: "Sample Creator 6",
                    creator_image: "https://dummyimage.com/200x200",
                }
                // Add more test data items as needed
            ],
        };
    },
    methods: {
        // toggle the show more button
        toggleFollow() {
            this.followMore = !this.followMore;
        },
        toggleCollection() {
            this.collectionMore = !this.collectionMore;
        },
    },
};
</script>
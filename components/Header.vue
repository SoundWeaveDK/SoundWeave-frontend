<template>
    <header
        class="p-6 w-full text-black dark:text-white  bg-white dark:bg-slate-900 border-solid border-b-2 border-blue-950 ">
        <nav class="mx-auto flex items-center justify-between lg:px-8">
            <!-- searchbar -->
            <input type="text" :placeholder="placeholderText" class="ml-20 rounded-full p-2 w-1/3">

            <div class="mr-20 flex justify-between ">

                <div class="my-auto m-5">
                    <form>
                        <label for="locale-select">{{ $t('language') }}:
                            <Icon :name="'circle-flags:' + $i18n.locale" />
                        </label>
                        <select id="locale-select" v-model="$i18n.locale"
                            class="text-black dark:text-white rounded p-2 bg-transparent">
                            <option v-for="locale in $i18n.availableLocales" :key="locale" :value="locale"
                                class="text-black">
                                {{ $t(locale) }}
                            </option>
                        </select>
                    </form>
                </div>

                <!-- user settings button -->
                <div>
                    <a href="/profile">
                        <img src="https://i.pravatar.cc/150?img=3" class="w-14 h-14 rounded-full" />
                    </a>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
export default {
    computed: {
        placeholderText() {
            return this.$t('search');
        },
    },
    data() {
        return {
            tempUser: [
                {
                    user_name: "test",
                    user_image: "https://i.pravatar.cc/150?img=3",
                    user_id: 1,
                },
            ],
        }
    }
};
</script>
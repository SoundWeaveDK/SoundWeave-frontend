<template>
    <div class="flex h-screen overflow-y-hidden">
        <div v-if="!isMobile" id="sideBar" class="md:w-1/5">
            <SideBar />
        </div>
        <div class="w-full h-screen bg-white dark:bg-slate-900 grid grid-rows-12 grid-flow-col">
            <div class="row-start-1 row-end-2">
                <Header />
            </div>

            <div class="row-start-2 row-end-11 md:row-end-12 overflow-y-auto">
                <slot />
            </div>
            <div class="row-start-11 row-end-12 md:row-end-13 md:row-start-12">
                <Footer />
            </div>
            <div v-if="isMobile" class="row-start-12 row-end-13 dark:bg-slate-800">
                <MobileNav />
            </div>
        </div>
    </div>
</template>

<script>
import { useUserStore } from "../stores/login"
import { mapStores } from "pinia";

export default {

    data() {
        return {
            isMobile: false,
        };
    },
    mounted() {
        this.checkIsMobile();
        window.addEventListener('resize', this.checkIsMobile);

    },
    beforeUnmount() {
        window.removeEventListener('resize', this.checkIsMobile);
    },
    methods: {
        checkIsMobile() {
            this.isMobile = window.innerWidth < 769;
        },

    },
};
</script>


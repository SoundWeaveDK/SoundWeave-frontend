<template>
    <div class="flex h-screen overflow-y-hidden">
        <div v-if="!isMobile" id="sideBar" class="md:w-1/5">
            <SideBar />
        </div>
        <div class="w-full h-screen bg-white dark:bg-slate-900 grid grid-rows-12 grid-flow-col">
            <div class="row-start-1 row-end-2">
                <Header />
            </div>
            <div v-if="!isSoundBarOpen" class="row-start-2 row-end-12">
                <slot />
            </div>
            <div v-if="isSoundBarOpen" class="row-start-2 row-end-12">
                <BigFooter />
            </div>
            <div class="row-start-12 row-end-12">
                <Footer v-if="!isMobile" @openSoundBar="handleOpenSoundBar" />
                <MobileNav v-else @openSoundBar="handleOpenSoundBar" />
            </div>
        </div>
    </div>
</template>

<script>
import SoundBar from '@/components/SoundBar.vue';

export default {
    components: {
        SoundBar,
    },
    data() {
        return {
            isSoundBarOpen: false,
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
        handleOpenSoundBar() {
            this.isSoundBarOpen = !this.isSoundBarOpen;
        },
        checkIsMobile() {
            this.isMobile = window.innerWidth < 769;
        },

    },
};
</script>


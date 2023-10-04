<template>
    <div class="h-full text-black dark:text-white dark:bg-slate-800 border-solid border-t-2 border-blue-950 rounded-t-lg">
        <div class="w-full h-full m-auto">
            <div class=" h-full  ">
                <!-- line -->
                <div class="flex h-1/6 justify-center">
                    <button @click="openSoundBar">
                        <div class="mx-auto m-1 w-64 h-1 bg-gray-400 rounded-full"></div>
                        <div class="mx-auto w-44 h-1 bg-gray-400 rounded-full"></div>
                    </button>
                </div>
                <div class="flex items-center justify-between h-5/6 mx-4 my-auto ">
                    <div class="flex items-center my-auto">
                        <button class="mr-4" @click="togglePlayback">
                            <Icon v-if="isPlaying" name="fa6-solid:pause" size="2em" />
                            <Icon v-else name="fa6-solid:play" size="2em" />
                        </button>
                        <div class="flex flex-col">
                            <div class="text-sm font-medium ">{{ podcast.title }}</div>
                            <div class="text-xs ">{{ podcast.artist }}</div>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <div class="text-xs  mr-4">{{ currentTime }}</div>
                        <div class="w-64 h-2 bg-gray-300 rounded-full cursor-pointer" @click="seek">
                            <div class="h-full bg-blue-500 rounded-full" :style="{ width: progress + '%' }"></div>
                        </div>
                        <div class="text-xs  ml-4">{{ duration }}</div>
                    </div>
                    <div class="h-full flex">
                        <!-- add to list -->
                        <button class="mr-8">
                            <Icon name="ic:round-playlist-add" size="2em" />
                        </button>
                        <!-- volume -->
                        <div class="volume block h-full my-auto">
                            <Icon name="fa6-solid:volume-high" class="mr-3 h-full my-auto mb-1" size="1em" />
                            <input class="my-auto" type="range" min="0" max="1" step="0.1" v-model="volume"
                                @change="updateVolume">
                        </div>

                    </div>
                </div>
                <audio ref="audioPlayer" :src="podcast.audioSrc" @timeupdate="onTimeUpdate"></audio>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            isPlaying: false,
            currentTime: '0:00',
            duration: '0:00',
            progress: 0,
            volume: 1,
            podcast: {
                title: 'Crown',
                artist: 'Kendrick Lamar',
                audioSrc: '/audio/crown.mp3',
            },
        };
    },
    methods: {
        togglePlayback() {
            const audio = this.$refs.audioPlayer;
            if (this.isPlaying) {
                this.isPlaying = false;
                audio.pause();
            } else {
                this.isPlaying = true;
                audio.play();
            }
        },
        onTimeUpdate() {
            const audio = this.$refs.audioPlayer;
            const duration = audio.duration;
            const currentTime = audio.currentTime;
            const progress = (currentTime / duration) * 100;
            this.currentTime = this.formatTime(currentTime);
            this.duration = this.formatTime(duration);
            this.progress = progress;
        },
        formatTime(time) {
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60);
            return `${minutes}:${seconds.toString().padStart(2, '0')}`;
        },
        seek(event) {
            const audio = this.$refs.audioPlayer;
            const progressElement = event.target;
            const progressRect = progressElement.getBoundingClientRect();
            const clickX = event.clientX - progressRect.left;
            const duration = audio.duration;
            const progress = clickX / duration;
            const newTime = duration * progress;
            audio.currentTime = newTime;
        },
        updateVolume(event) {
            const audio = this.$refs.audioPlayer;
            audio.volume = event.target.value;
        },
        openSoundBar() {
            this.$emit('openSoundBar');
        },
    },
};
</script>
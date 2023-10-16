// store/index.ts

import { defineStore } from 'pinia';
import type { Podcast } from '../interfaces/interfaces';

export const usePodcastStore = defineStore('podcast', {
    state: () => ({
        podcast: [] as Podcast[],
        selectedPodcast: {} as Podcast,
    }),
    getters: {
        getPodcasts(): Podcast[] {
            return this.podcast;
        },
        getSelectedPodcast(): Podcast {
            return this.selectedPodcast;
        }
    },
    actions: {
        setPodcasts(podcast: Podcast[]) {
            this.podcast = podcast;
        },
        addPodcast(podcast: Podcast) {
            this.podcast.push(podcast);
        },
        deletePodcast(id: number) {
            this.podcast = this.podcast.filter((t) => {
                return t.id !== id
            })
        },
        updatePodcast(podcast: Podcast) {
            this.podcast = this.podcast.map(podcastMap => {
                if (podcastMap.id === podcast.id) {
                    podcastMap = podcast;
                }
                return podcastMap;
            });
        },
        setSelectedPodcast(podcast: Podcast) {
            this.selectedPodcast = podcast;
        }
    },
    persist: true,
});
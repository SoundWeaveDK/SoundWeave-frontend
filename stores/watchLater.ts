import { defineStore } from 'pinia';
import type { WatchLater } from '../interfaces/interfaces';

export const useWatchLaterStore = defineStore('watchLater', {
    state: () => ({
        watchLater: [] as WatchLater[],
    }),
    getters: {
        getWatchLater(): WatchLater[] {
            return this.watchLater;
        }
    },
    actions: {
        setWatchLater(watchLater: WatchLater[]) {
            this.watchLater = watchLater;
        },
        addWatchLater(watchLater: WatchLater) {
            this.watchLater.push(watchLater);
        },
        deleteWatchLater(id: number) {
            this.watchLater = this.watchLater.filter((t) => {
                return t.id !== id
            })
        },
    },
    persist: true,
});
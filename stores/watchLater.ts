import { defineStore } from 'pinia';
import type { watchLater } from '../interfaces/interfaces';

export const useWatchLaterStore = defineStore('watchLater', {
    state: () => ({
        watchLater: [] as watchLater[],
    }),
    getters: {
        getWatchLater(): watchLater[] {
            return this.watchLater;
        }
    },
    actions: {
        setWatchLater(watchLater: watchLater[]) {
            this.watchLater = watchLater;
        },
        addWatchLater(watchLater: watchLater) {
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
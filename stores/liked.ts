import { defineStore } from 'pinia';
import type { Liked } from '../interfaces/interfaces';

export const useLikedStore = defineStore('liked', {
    state: () => ({
        liked: [] as Liked[],
    }),
    getters: {
        getLiked(): Liked[] {
            return this.liked;
        }
    },
    actions: {
        setLiked(liked: Liked[]) {
            this.liked = liked;
        },
        addLiked(liked: Liked) {
            this.liked.push(liked);
        },
        deleteLiked(id: number) {
            this.liked = this.liked.filter((t) => {
                return t.id !== id
            })
        },
    },
    persist: true,
});
import { defineStore } from "pinia";
import type { Followed } from "../interfaces/interfaces";

export const useFollowedStore = defineStore("followed", {
    state: () => ({
        followed: [] as Followed[],
    }),
    getters: {
        getFollowed(): Followed[] {
            return this.followed;
        },
    },
    actions: {
        setFollowed(followed: Followed[]) {
            this.followed = followed;
        },
    },
    persist: true,
});
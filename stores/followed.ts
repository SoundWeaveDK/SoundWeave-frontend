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
        addFollowed(followed: Followed) {
            this.followed.push(followed);
        },
        clearFollowed() {
            this.followed = [];
        },
    },
    persist: true,
});
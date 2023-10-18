import { defineStore } from "pinia";
import type { Viewed } from "../interfaces/interfaces";

export const useViewedStore = defineStore("viewed", {
    state: () => ({
        viewed: {} as Viewed,
    }),
    getters: {
        getViewed(): Viewed {
            return this.viewed;
        },
    },
    actions: {
        setViewed(viewed: Viewed) {
            this.viewed = viewed;
        },
    },
    persist: true,
});
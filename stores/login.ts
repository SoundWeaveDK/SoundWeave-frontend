// import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { User } from "../interfaces/interfaces";

export const useUserStore = defineStore("user", {
    state: () => ({
        user: {} as User,
    }),
    getters: {
        getUser(): User {
            return this.user;
        }
    },
    actions: {
        setUser(user: User) {
            this.user = user;
        },
    },
    persist: true,
});

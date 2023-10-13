// import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { User } from "../interfaces/interfaces";

export const useUserStore = defineStore("user", {
    state: () => ({
        user: {} as User,
        accessToken: "",
    }),
    getters: {
        getUser(): User {
            return this.user;
        },
        getAccessToken(): string {
            return this.accessToken;
        },
    },
    actions: {
        setUser(user: User) {
            this.user = user;
        },
        setAccessToken(token: string) {
            this.accessToken = token;
        },
    },
    persist: true,
});

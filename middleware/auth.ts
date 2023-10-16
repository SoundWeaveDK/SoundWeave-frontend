import { useUserStore } from "~/stores/login";

export default function () {
    if (!useUserStore().getAccessToken) {
        return navigateTo('/')
    }
}
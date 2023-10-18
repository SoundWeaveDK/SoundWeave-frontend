import { defineStore } from "pinia";
import type { Comment } from "../interfaces/interfaces";

export const useCommentStore = defineStore("comment", {
    state: () => ({
        comment: [] as Comment[],
    }),
    getters: {
        getComments(): Comment[] {
            return this.comment;
        },
    },
    actions: {
        setComments(comment: Comment[]) {
            this.comment = comment;
        },
        addComment(comment: Comment) {
            this.comment.push(comment);
        },
        deleteComment(id: number) {
            this.comment = this.comment.filter((t) => {
                return t.id !== id;
            });
        },
    },
    persist: true,
});
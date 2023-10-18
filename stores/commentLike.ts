import { defineStore } from "pinia";
import type { CommentLike } from "../interfaces/interfaces";

export const useCommentLikeStore = defineStore("commentLike", {
    state: () => ({
        commentLike: [] as CommentLike[],
    }),
    actions: {
        setCommentLikes(commentLike: CommentLike[]) {
            this.commentLike = commentLike;
        },
        addCommentLike(commentLike: CommentLike) {
            this.commentLike.push(commentLike);
        },
        deleteCommentLike(id: number) {
            this.commentLike = this.commentLike.filter((t) => {
                return t.commentId !== id;
            });
        },
    },
    persist: true,
});
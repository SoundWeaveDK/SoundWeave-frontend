export interface User {
    accessToken: string;
    id: number;
    username: string;
    email: string;
    birthday: string;
    created_at: string;
    country_name: string;
    gender_name: string;
}

export interface Podcast {
    id: number;
    userId: number;
    podcast_name: string;
    podcast_file: string;
    description: string;
    thumbnail: string;
    views: number;
    likes: number;
    money: number;
}

export interface Comment {
    comment: string;
    id: number;
    fk_user_id: {
        username: string;
    }
    _count: {
        Comments_liked: number;
    }
}

export interface CommentLike {
    userId: number;
    commentId: number;
}


export interface Followed {
    id: number;
    username: string;
}

export interface watchLater {
    id: number;
    userId: number;
    podcastId: number;
}
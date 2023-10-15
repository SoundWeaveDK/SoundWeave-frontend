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

export interface Followed {
    id: number;
    username: string;
}

export interface watchLater {
    id: number;
    userId: number;
    podcastId: number;
}
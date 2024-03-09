export interface GithubUser {
    avatar_url: string;
    login: string;
    items: any
}

export interface GithubUserResponse {
    items: GithubUser[];
}
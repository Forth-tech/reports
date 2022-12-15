export interface AccessTokenPayload {
    id: number;
    email: string;
    name: string;
}

export interface RefreshTokenPayload {
    user_id: number;
    user_email: string;
    user_name: string;
}
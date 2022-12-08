export interface UserResponse {
    email: string;
    username: string;
    is_active: string;
    created: Date;
    updated: Date;
    id: string;
}

export interface PasswordResponse {
    site: string;
    username: string;
    password: string;
    created: Date;
    updated: Date;
    id: string;
}
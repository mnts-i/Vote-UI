export interface User {
    id: number;
    token: string;
    isAdmin: boolean;
}

export interface Star {
    id: number;
    name: string;
    field?: string;
    color?: string;
}
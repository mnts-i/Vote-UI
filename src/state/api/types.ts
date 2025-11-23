import type { User } from 'src/types';

export type ValidateResponse = {
    valid: true;
    user: User;
} | {
    valid: false;
};

export type UploadStarImageArgs = {
    id: number;
    file: File;
};

export type VotePayload = {
    token: string;
    starId: number;
    score: number;
};

export type MyVotePayload = {
    token: string;
    starId: number;
};

export type MyVoteResponse = {
    vote: number | null;
    error?: string;
};
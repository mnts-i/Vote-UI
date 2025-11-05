import type { User } from 'src/types';

export type ValidateResponse = {
    valid: true;
    user: User;
} | {
    valid: false;
};
import { atom, createStore } from 'jotai';

// Types
import { type User } from './types';

export const store = createStore();
export const userAtom = atom<User | null>(null);
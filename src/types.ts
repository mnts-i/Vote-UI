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

export type StageName = 'IDLE' | 'PERFORMING' | 'VOTING' | 'RESULTS';

export interface BaseState { 
    stage: StageName;
};

export interface Idle extends BaseState {
    stage: 'IDLE';
};

export interface Performing extends BaseState {
    stage: 'PERFORMING';
    star: Star;
};

export interface Voting extends BaseState {
    stage: 'VOTING';
    star: Star;
    started: string;
    currentVotes: number;
};

export interface Results extends BaseState {
    stage: 'RESULTS';
    biggestScore: number;
    countDuration: number;
    stars: Array<
        Star & {
            state: 'WAITING' | 'COUNTING' | 'FINISHED';
            votes: number[];
            started: number | null;
        }
    >;
};

export type State = Idle | Performing | Voting | Results;
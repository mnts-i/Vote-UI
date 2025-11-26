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
    image?: string;
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
    biggestAvg: number;
    biggestScore: number;
    biggestShrunk: number;
    countDuration: number;
    stars: Array<
        Star & {
            state: 'WAITING' | 'COUNTING' | 'FINISHED';
            started: string | null;
            avg: number;
            totalScore: number;
            totalVotes: number;
            shrunkScore: number;
        }
    >;
};

export type State = Idle | Performing | Voting | Results;
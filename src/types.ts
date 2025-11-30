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
    started: string;
    progress: number;
    finished: boolean;
    biggestAvg: number;
    biggestScore: number;
    biggestShrunk: number;
    stars: Array<
        Star & {
            avg: number;
            animating: boolean;
            totalScore: number;
            totalVotes: number;
            shrunkScore: number;
            visibleScore: number;
        }
    >;
};

export type State = Idle | Performing | Voting | Results;
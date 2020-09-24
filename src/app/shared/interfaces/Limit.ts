interface Limit<T> {
    noEvent?: T;
    veryLow: T;
    low: T;
    medium: T;
    high: T;
    veryHigh?: T;
}

export interface ColorPair {
    score: number;
    color: string;
}

export type NumericLimit = Limit<number>;
export type StringLimit = Limit<string>;

export type CombinedLimit = Limit<ColorPair>;

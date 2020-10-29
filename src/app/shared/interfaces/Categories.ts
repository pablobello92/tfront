export interface SeverityCategories<T> {
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

export type RoadCategories = SeverityCategories<ColorPair>;

export interface SeverityCategories<T> {
    noEvent?: T;
    veryLow: T;
    low: T;
    medium: T;
    high: T;
    veryHigh?: T;
}

export interface PredictionCategoriesRoads<T> {
    asphalt: T;
    cobbles: T;
    earth: T;
    concrete: T;
}

export interface PredictionCategoriesAnomalies<T> {
    call: T;
    door: T;
    message: T;
    pothole: T;
    speedBump: T;
    streetGutter: T;
}

export interface ColorPair {
    score: number;
    color: string;
}

export type RoadCategories = SeverityCategories<ColorPair>;

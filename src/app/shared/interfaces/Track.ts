import {
    IRange
} from './Range';

export interface Track {
    city: String;
    startTime: number;
    ranges: IRange[];
}

export interface ISumarization {
    type?: number;
    cityId: number;
    date: number;
    ranges: IRange[];
}

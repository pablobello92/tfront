import {
    IRange
} from './Range';

export interface Track {
    city: String;
    startTime: number;
    ranges: IRange[];
}

export interface ISumarization {
    cityId: number;
    date: number;
    ranges: IRange[];
}

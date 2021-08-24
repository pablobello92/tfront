import {
    IRange,
    SumarizingSegment
} from './Range';

export interface Track {
    city: String;
    startTime: number;
    ranges: IRange[];
}

export interface SumarizingObject {
    city: string;
    date?: number;
    tracks: Track[];
}

export interface SumarizedObject {
    city: string;
    date: number;
    ranges: SumarizingSegment[];
}

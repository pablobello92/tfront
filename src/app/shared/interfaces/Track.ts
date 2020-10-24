import { Accelerometer } from './Accelerometer';
import { IRange, SumarizingSegment } from './Range';

export interface Track {
    id: number;
    startTime: number;
    city: String;
    ranges: IRange[];
    accelerometers: Accelerometer[];
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

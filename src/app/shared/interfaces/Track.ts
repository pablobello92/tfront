import { Accelerometer } from './Accelerometer';
import { IRange } from './Range';

export interface Track {
    id: number;
    startTime: number;
    city: String;
    ranges: IRange[];
    accelerometers: Accelerometer[];
}

export interface SumarizingObject {
    city: string;
    tracks: Track[];
}

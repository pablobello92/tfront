import { Accelerometer } from './Accelerometer';
import { Range } from './Range';

export interface Track {
    id: number;
    startTime: number;
    city: String;
    ranges: Range[];
    accelerometers: Accelerometer[];
}

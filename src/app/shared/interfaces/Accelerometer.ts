import {
    Axis
} from './Axis';

export interface Accelerometer {
    id: number;
    eventId: number;
    currentTime: number;
    x: Axis;
    y: Axis;
    z: Axis;
    axis: String;
}

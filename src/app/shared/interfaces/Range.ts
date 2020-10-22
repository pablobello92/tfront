import { Coordinate } from './Coordinate';
import { StabilityEvent } from './StabilityEvent';

export interface Segment {
    id: number;
    date: number;
    start: Coordinate;
    end: Coordinate;
    score: number;
    distance: number;
}

export interface IRange extends Segment {
    speed: number;
    stabilityEvents: StabilityEvent[];
    accuracy?: number;
    _id: string;
}

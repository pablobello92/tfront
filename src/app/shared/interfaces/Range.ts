import { Coordinate } from './Coordinate';
import { StabilityEvent } from './StabilityEvent';

export interface Range {
    id: number;
    date: number;
    start: Coordinate;
    end: Coordinate;
    speed: number;
    score: number;
    stabilityEvents: StabilityEvent[];
    distance: number;
}

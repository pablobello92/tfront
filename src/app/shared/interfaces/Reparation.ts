import {
    Coordinate
} from './Coordinate';

export interface Reparation {
    from: Coordinate;
    to: Coordinate;
    startTime: number;
    city: string;
}

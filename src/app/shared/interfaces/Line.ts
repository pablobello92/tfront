import { Coordinate } from './Coordinate';

export interface Line {
    path: Coordinate[];
    geodesic: boolean;
    strokeColor: string;
    strokeOpacity: number;
    strokeWeight: number;
}

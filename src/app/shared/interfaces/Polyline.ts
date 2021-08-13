import {
    Coordinate
} from './Coordinate';

export interface Polyline {
    path: Coordinate[];
    geodesic: boolean;
    strokeColor: string;
    strokeOpacity: number;
    strokeWeight: number;
}

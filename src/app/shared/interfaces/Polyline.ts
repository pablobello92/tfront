import {
    Coordinate
} from './Coordinate';

export interface Marker extends Coordinate {
    title?: string;
    date?: Date;
};

export interface Polyline {
    path: Coordinate[];
    geodesic?: boolean;
    strokeColor: string;
    strokeOpacity: number;
    strokeWeight: number;
}

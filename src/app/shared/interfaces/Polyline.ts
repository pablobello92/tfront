import {
    Coordinate
} from './Coordinate';

export interface Marker extends Coordinate {
    title?: string;
    date?: Date;
};

export interface Polyline {
    path: Coordinate[];
    strokeColor: string;
    strokeOpacity: number;
    strokeWeight: number;
    info?: any
}

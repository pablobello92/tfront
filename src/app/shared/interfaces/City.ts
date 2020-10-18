import { Coordinate } from './Coordinate';

export interface MapOptions {
    center: Coordinate;
    zoom?: number;
}

export interface City extends MapOptions {
    id: number;
    name: string;
}

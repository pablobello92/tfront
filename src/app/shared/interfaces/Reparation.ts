import {
    Coordinate
} from './Coordinate';
import {
    ISimpleRange
} from './ISimpleRange';

export interface Reparation extends ISimpleRange<Coordinate> {
    cityId: number;
    date: number;
}

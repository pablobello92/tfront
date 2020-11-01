import { IRange } from './Range';
import { SeverityCategories } from './Categories';

export interface RangesAndLimits {
    ranges: IRange[];
    limits: SeverityCategories<number>;
}

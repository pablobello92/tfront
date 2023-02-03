import {
    ISimpleRange
} from "./ISimpleRange";

export interface MapFilter {
    userId?: number;
    cityId?: number;
    startTime?: ISimpleRange<number>;
    pages?: number;
    offset?: number;
}

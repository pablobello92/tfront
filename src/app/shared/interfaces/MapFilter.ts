export interface MapFilter {
    userId?: number;
    cityId?: number;
    startTime?: {
        from: number,
        to?: number
    };
    pages?: number;
    offset?: number;
}

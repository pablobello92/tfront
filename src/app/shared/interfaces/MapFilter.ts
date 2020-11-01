export interface MapFilter {
    user: string;
    city: string;
    startTime?: {
        from: number,
        to: number
    };
    pages: number;
    offset: number;
}

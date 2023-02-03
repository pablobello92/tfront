
export interface User {
    _id?: string;
    level: number;
    username: string;
    password: string;
    nickname: string;
    email: string;
    sex: string;
    yearofbirth: number;
    car?: {
        brand: string,
        model: string,
        year: number
    };
    smartphone?: {
        brand: string,
        model: string
    };
}

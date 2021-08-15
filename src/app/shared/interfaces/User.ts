
export interface User {
    _id?: string;
    level: Number;
    username: String;
    password: String;
    nickname: String;
    email: String;
    sex: String;
    yearofbirth: Number;
    car: {
        brand: String,
        model: String,
        year: Number
    };
    smartphone: {
        brand: String,
        model: String
    };
}

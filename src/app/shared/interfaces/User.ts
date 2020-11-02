
export interface User {
    _id?: string;
    username: String;
    nickname: String;
    password: String;
    email: String;
    sex: String;
    yearofbirth: Number;
    userLevel: Number;
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

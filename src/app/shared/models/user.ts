export interface User {
    id: string;
    username: string;
    name: {
        firstname : string,
        lastname : string,
    };
    password: string;
    email: string;
    phone: string;
}

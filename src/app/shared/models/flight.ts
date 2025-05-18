export interface Flight {
    id: string;
    flightNo: string;
    departure: Date;
    arrival: Date;
    from: string;
    to: string;
    seatsAvailable: number;
    price: number;
}

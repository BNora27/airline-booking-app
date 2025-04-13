import { Passenger } from "./passenger";

export interface Booking {
    id: string;
    userId: string;
    flightId: string;
    bookingDate: string;
    passengers: Passenger[];
    totalPrice: number;
}

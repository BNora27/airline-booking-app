import { Flight } from "./flight";
import { User } from "./user";

export interface Booking {
    id: string;
    passengerId: string;
    flightId: string;
    seatNumber: number;
    bookingDate: Date;
}

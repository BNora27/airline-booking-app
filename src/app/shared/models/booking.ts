import { Flight } from "./flight";
import { User } from "./user";

export interface Booking {
    id: string;
    passenger: User;
    flight: Flight;
    seatNumber: number;
    bookingDate: Date;
}

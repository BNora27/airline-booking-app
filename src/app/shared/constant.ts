import { Booking } from "./models/booking";
import { Flight } from "./models/flight";
import { Passenger } from "./models/passenger";
import { User } from "./models/user";


export const DUMMY_USERS: User[] = [
  {
    id: 'u000',
    username: 'testElek',
    name: {
      firstname: 'Elek',
      lastname: 'Teszt'
    },
    password: 'testpw',
    email: 'elek.test@example.com',
    phone: '+36301234567'
  },
  {
    id: 'u001',
    username: 'alice_k',
    name: {
      firstname: 'Alice',
      lastname: 'Kovács'
    },
    password: 'securePass123',
    email: 'alice.k@example.com',
    phone: '+36123456789'
  },
  {
    id: 'u002',
    username: 'bence_s',
    name: {
      firstname: 'Bence',
      lastname: 'Szabó'
    },
    password: 'hunterX99',
    email: 'bence.s@example.com',
    phone: '+36201234567'
  }
];


export const DUMMY_FLIGHTS: Flight[] = [
  {
    id: 'f001',
    airline: 'Wizz Air',
    flightNo: 'W6 1234',
    from: 'Budapest',
    to: 'London',
    departure: '2025-05-10T08:00:00',
    return: '2025-05-15T18:30:00',
    price: 45000,
    seatsAvailable: 42
  },
  {
    id: 'f002',
    airline: 'Ryanair',
    flightNo: 'RY 5678',
    from: 'Debrecen',
    to: 'Barcelona',
    departure: '2025-06-01T10:00:00',
    return: '2025-06-07T21:00:00',
    price: 52000,
    seatsAvailable: 35
  }
];

export const DUMMY_PASSENGERS: Passenger[] = [
  {
    id: 'p001',
    fullName: 'László Horváth',
    age: 34,
    passportNumber: 'PA123456',
    nationality: 'Hungarian'
  },
  {
    id: 'p002',
    fullName: 'Emma Horváth',
    age: 6,
    passportNumber: 'PA123457',
    nationality: 'Hungarian'
  }
];

export const DUMMY_BOOKINGS: Booking[] = [
  {
    id: 'b001',
    userId: 'u001',
    flightId: 'f001',
    bookingDate: '2025-04-10T12:00:00',
    passengers: DUMMY_PASSENGERS,
    totalPrice: 90000
  },
  {
    id: 'b002',
    userId: 'u002',
    flightId: 'f002',
    bookingDate: '2025-04-12T14:45:00',
    passengers: [
      {
        id: 'u002',
        fullName: 'Bence Szabó',
        age: 29,
        passportNumber: 'PA765432',
        nationality: 'Hungarian'
      }
    ],
    totalPrice: 52000
  }
];

import { Injectable } from '@angular/core';
import { collection, Firestore, getDocs, query, where } from 'firebase/firestore';
import { Flight } from '../models/flight';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  constructor(private firestore: Firestore) {}

  async searchFlights(filters: {
    from?: string,
    to?: string,
    departure?: Date,
    arrival?: Date
  }): Promise<Flight[]> {
    const flightsRef = collection(this.firestore, 'Flights');

    let q = query(flightsRef); // Base query

    // Dynamically apply filters if they're defined
    const conditions = [];
    if (filters.from) {
      conditions.push(where('from', '==', filters.from));
    }
    if (filters.to) {
      conditions.push(where('to', '==', filters.to));
    }
    if (filters.departure) {
      conditions.push(where('departure', '==', filters.departure.toISOString().split('T')[0]));
    }
    if (filters.arrival) {
      conditions.push(where('arrival', '==', filters.arrival.toISOString().split('T')[0]));
    }

    if (conditions.length > 0) {
      // Compose query with conditions
      q = query(flightsRef, ...conditions);
    }

    const snapshot = await getDocs(q);
    const flights: Flight[] = [];

    snapshot.forEach(doc => {
      const data = doc.data();
      flights.push({
        ...data,
        id: doc.id,
        departure: new Date(data['departure']),
        arrival: new Date(data['arrival'])
      } as Flight);
    });

    return flights;
  }
}

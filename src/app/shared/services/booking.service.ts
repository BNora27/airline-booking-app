import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, deleteDoc, doc, collectionData, query, where, Timestamp } from '@angular/fire/firestore';
import { Booking } from '../models/booking';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private bookingsCollection;

  constructor(private firestore: Firestore) {
    this.bookingsCollection = collection(this.firestore, 'Bookings');
  }

  /**
   * Creates a new booking in Firestore.
   * @param booking The booking object to be created (excluding `id`).
   */
  async createBooking(booking: Omit<Booking, 'id'>): Promise<void> {
    const parsedDate = booking.bookingDate
  ? new Date(booking.bookingDate)
  : null;
    try {
      await addDoc(this.bookingsCollection, {
        ...booking,
        bookingDate: parsedDate && !isNaN(parsedDate.getTime())
    ? Timestamp.fromDate(parsedDate)
    : Timestamp.now()
      });
    } catch (error) {
      console.error('Failed to create booking:', error);
      throw error;
    }
  }

  /**
   * Deletes a booking by its ID.
   * @param bookingId The ID of the booking to delete.
   */
  async deleteBooking(bookingId: string): Promise<void> {
    try {
      const bookingDocRef = doc(this.firestore, 'Bookings', bookingId);
      await deleteDoc(bookingDocRef);
    } catch (error) {
      console.error('Failed to delete booking:', error);
      throw error;
    }
  }

   /**
   * Gets all bookings for a specific userId.
   */
  getBookingsByUserId(userId: string): Observable<Booking[]> {
    const bookingsRef = collection(this.firestore, 'Bookings');
    const userQuery = query(bookingsRef, where('passengerId', '==', userId));

    return collectionData(userQuery, { idField: 'id' }) as Observable<Booking[]>;
  }
}

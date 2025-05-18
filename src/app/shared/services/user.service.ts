import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from './auth.service';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { from, of } from 'rxjs';
import { Firestore, doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { Booking } from '../models/booking';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: Firestore,
    private authService: AuthService) { }
  
  getUserById(userId: string): Promise<User | null> {
  const userRef = doc(this.firestore, 'Users', userId);
  return getDoc(userRef).then(snapshot => {
    if (snapshot.exists()) {
      return snapshot.data() as User;
    }
    return null;
  });
}

  getUserProfile(): Observable<{
    user: User | null,
  }> {
    return this.authService.currentUser.pipe(
      switchMap(authUser => {
        if (!authUser) {
          return of({
            user: null,
            bookings: []
          });
        }

        return from(this.fetchUserWithBookings(authUser.uid));
      })
    );
  }

  private async fetchUserWithBookings(userId: string): Promise<{
    user: User | null,
    bookings: Booking[],
  }> {
    try {
      // Felhasználó adatainak lekérése
      const userDocRef = doc(this.firestore, 'Users', userId);
      const userSnapshot = await getDoc(userDocRef);
      
      if (!userSnapshot.exists()) {
        return {
          user: null,
          bookings: [],
        };
      }

      const userData = userSnapshot.data() as User;
      const user = { ...userData, id: userId };
      
      const bookingsRef = collection(this.firestore, 'Bookings');
      const q = query(bookingsRef, where('passenger.id', '==', userId));
      const bookingsSnapshot = await getDocs(q);
      
      const bookings: Booking[] = [];
      bookingsSnapshot.forEach(bookingDoc => {
        const data = bookingDoc.data() as Booking;
        bookings.push({
          ...data,
          id: bookingDoc.id,
          bookingDate: data.bookingDate instanceof Date ? data.bookingDate : new Date(data.bookingDate)
        });
      });

      return {
        user,
        bookings,
      };
    } catch (error) {
      console.error('Hiba a felhasználói adatok betöltése során:', error);
      return {
        user: null,
        bookings: [],
      };
    }
  }
}

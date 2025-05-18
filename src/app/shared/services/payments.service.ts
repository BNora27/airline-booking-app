import { Injectable } from '@angular/core';
import { Firestore, collectionData, query, where, collection } from '@angular/fire/firestore';
import { CollectionReference, DocumentData } from 'firebase/firestore';
import { Payment } from '../models/payment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

   constructor(private firestore: Firestore) {}

  getPaymentsByBookingIds(bookingIds: string[]): Observable<Payment[]> {
    if (bookingIds.length === 0) return new Observable<Payment[]>(subscriber => subscriber.next([]));

    const paymentsRef = collection(this.firestore, 'Payments') as CollectionReference<Payment>;

    const q = query(paymentsRef, where('bookingId', 'in', bookingIds.slice(0, 10)));

    return collectionData(q, { idField: 'paymentId' }).pipe(
      map((payments: Payment[]) => payments)
    );
  }
}

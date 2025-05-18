import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Booking } from '../../shared/models/booking';
import { User as FirebaseUser } from '@firebase/auth';
import { User as AppUser } from '../../shared/models/user';
import { Payment } from '../../shared/models/payment';
import { AuthService } from '../../shared/services/auth.service';
import { BookingService } from '../../shared/services/booking.service';
import { PaymentsService } from '../../shared/services/payments.service';
import { switchMap, of, from, map } from 'rxjs';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  styleUrls: ['./profile.component.scss'],
  imports: [CommonModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatProgressBarModule]
})
export class ProfileComponent implements OnInit {
  user!: AppUser;
  bookings: Booking[] = [];
  payments: Payment[] = [];

  constructor(
    private authService: AuthService,
    private bookingService: BookingService,
    private paymentsService: PaymentsService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  this.authService.isLoggedIn().pipe(
    switchMap((firebaseUser: FirebaseUser | null) => {
      if (!firebaseUser) {
        return of({ user: null, bookings: [], payments: [] });
      }
      return from(this.userService.getUserById(firebaseUser.uid)).pipe(
        switchMap((user: AppUser | null) => {
          if (!user) {
            return of({ user: null, bookings: [], payments: [] });
          }
          this.user = user;
          return from(this.bookingService.getBookingsByUserId(user.id)).pipe(
            switchMap((bookings: Booking[]) => {
              this.bookings = bookings;
              const bookingIds = bookings.map(b => b.id);
              return this.paymentsService.getPaymentsByBookingIds(bookingIds).pipe(
                map((payments: Payment[]) => ({
                  bookings,
                  payments
                }))
              );
            })
          );
        })
      );
    })
  ).subscribe(({ bookings, payments }) => {
    this.bookings = bookings;
    this.payments = payments;
  });
}


  deleteBooking(bookingId: string): void {
    this.bookingService.deleteBooking(bookingId).then(() => {
      this.bookings = this.bookings.filter(b => b.id !== bookingId);
      this.payments = this.payments.filter(p => p.bookingId !== bookingId);
      console.log('Booking deleted successfully');
    }).catch(err => {
      console.error('Error deleting booking:', err);
    });
  }

  getPaymentForBooking(bookingId: string): Payment | undefined {
    return this.payments.find(p => p.bookingId === bookingId);
  }

}

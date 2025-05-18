import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCard, MatCardActions, MatCardContent, MatCardTitle } from '@angular/material/card';
import { Flight } from '../../shared/models/flight';
import { FlightService } from '../../shared/services/flight.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { Booking } from '../../shared/models/booking';
import { UserService } from '../../shared/services/user.service';
import { BookingService } from '../../shared/services/booking.service';

@Component({
  selector: 'app-search',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  MatCard, MatCardTitle, MatCardContent, MatCardActions],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  @Input() isLoggedIn: boolean = false;
  private authSubscription?: Subscription;
  searchForm: FormGroup;
  flights: Flight[] = [];

  constructor(private fb: FormBuilder, private flightService: FlightService, private authService: AuthService, private userService: UserService, private bookingService: BookingService) {
    this.searchForm = this.fb.group({
      from: [''],
      to: [''],
      departure: [''],
      arrival: ['']
    });
  }

  async searchFlights(): Promise<void> {
    const { from, to, departure, arrival } = this.searchForm.value;

    const results = await this.flightService.searchFlights({
      from,
      to,
      departure: departure ? new Date(departure) : undefined,
      arrival: arrival ? new Date(arrival) : undefined
    });

    this.flights = results;
  }

  bookFlight(flight: Flight): void {
  this.authService.currentUser.subscribe(firebaseUser => {
    if (!firebaseUser) {
      console.warn('User not logged in');
      return;
    }

    // Fetch full user details from Firestore
    const userId = firebaseUser.uid;

    this.userService.getUserProfile().subscribe(userProfile => {
      const user = userProfile.user;
      if (!user) {
        console.error('User data could not be retrieved');
        return;
      }

      const booking: Omit<Booking, 'id'> = {
        passenger: user,
        flight: flight,
        seatNumber: this.generateSeatNumber(),
        bookingDate: new Date()
      };

      this.bookingService.createBooking(booking)
        .then(() => console.log('Booking successful'))
        .catch(err => console.error('Booking failed', err));
    });
  });
}

  private generateSeatNumber(): number {
    // This is just a basic seat assignment logic.
    return Math.floor(Math.random() * 100) + 1; // Seat numbers 1 to 100
  }

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }
}
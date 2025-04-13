import { Component, OnInit } from '@angular/core';
import { DUMMY_BOOKINGS, DUMMY_FLIGHTS, DUMMY_USERS } from '../../shared/constant';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Booking } from '../../shared/models/booking';
import { Flight } from '../../shared/models/flight';

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
  constructor() {
    console.log('ProfileComponent constructor called');
  }
  
  UserObject = DUMMY_USERS;
  
  userBookings: Booking[] = [];
  bookedFlights: { booking: Booking; flight: Flight }[] = [];

  selectedIndex: number = 0;

  ngOnInit(): void {
    console.log('DUMMY_USERS:', this.UserObject); // Log data to check if it is correctly loaded
    console.log('Initial selectedIndex:', this.selectedIndex);
    this.selectedIndex = 0;

    // Filter bookings for the selected user
    this.userBookings = DUMMY_BOOKINGS.filter(b => b.userId === this.UserObject[this.selectedIndex].id);

    // Map bookings to flights
    this.bookedFlights = this.userBookings.map(booking => ({
      booking,
      flight: DUMMY_FLIGHTS.find(f => f.id === booking.flightId)!
    }));

    console.log('Booked Flights:', this.bookedFlights); // Log booked flights to verify
  }

  reload(index: number): void {
    console.log('Reload called with index:', index); // Log the selected index to verify it's working
    
    this.selectedIndex = index;
  }

  deleteBooking(id: string): void {
    this.bookedFlights = this.bookedFlights.filter(bf => bf.booking.id !== id);
  }
  
}

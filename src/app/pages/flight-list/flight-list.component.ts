import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Flight } from '../../shared/models/flight';
import { MatIconModule } from '@angular/material/icon';
import { FlightCardComponent } from "../flight-card/flight-card.component";
import { SuccessDialogComponent } from '../../shared/success-dialog/success-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DUMMY_FLIGHTS } from '../../shared/constant';

@Component({
  selector: 'app-flight-list',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    FlightCardComponent
],
  templateUrl: './flight-list.component.html',
  styleUrl: './flight-list.component.scss'
})
export class FlightListComponent implements OnInit {
  flights: Flight[] = [];

  isLoggedIn = localStorage.getItem('loggedIn') === 'true';

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const from = params['from']?.trim().toLowerCase();
      const to = params['to']?.trim().toLowerCase();
      const departure = params['departure']?.trim();
      const returnDate = params['return']?.trim();
  
      const hasFilters = from || to || departure || returnDate;
  
      if (!hasFilters) {
        // No filters -> show all
        this.flights = DUMMY_FLIGHTS;
        return;
      }
  
      this.flights = DUMMY_FLIGHTS.filter(flight => {
        const matchesFrom = from ? flight.from.toLowerCase().includes(from) : true;
        const matchesTo = to ? flight.to.toLowerCase().includes(to) : true;
        const matchesDeparture = departure ? flight.departure === departure : true;
        const matchesReturn = returnDate ? flight.return === returnDate : true;
  
        return matchesFrom && matchesTo && matchesDeparture && matchesReturn;
      });
    });
  }
  
  

  onFlightBooked(flight: Flight): void {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }

    this.dialog.open(SuccessDialogComponent, {
      data: {
        message: `You have successfully booked flight ${flight.flightNo} with ${flight.airline}.`
      }
    });
    
  }
}

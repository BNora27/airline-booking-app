import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Flight } from '../../shared/models/flight';
import { FlightPricePipe } from "../../shared/pipes/flight-price.pipe";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-flight-card',
  imports: [FlightPricePipe, CommonModule],
  templateUrl: './flight-card.component.html',
  standalone: true,
  styleUrl: './flight-card.component.scss'
})
export class FlightCardComponent {
  @Input() flight!: Flight;
  @Output() book = new EventEmitter<Flight>();

  bookFlight(): void {
    this.book.emit(this.flight);
  }
}

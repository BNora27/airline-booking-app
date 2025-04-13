import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flightPrice',
  standalone: true
})
export class FlightPricePipe implements PipeTransform {

  transform(value: number, currency: 'HUF' | 'EUR' | 'USD' = 'USD'): string {
    if (!value && value !== 0) return '';

    let symbol = '';
    switch (currency) {
      case 'HUF': symbol = 'Ft'; break;
      case 'EUR': symbol = '€'; break;
      case 'USD': symbol = '$'; break;
    }

    return `${value.toLocaleString()} ${symbol}`;
  }
}

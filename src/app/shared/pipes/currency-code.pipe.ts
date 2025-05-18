import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyCode'
})
export class CurrencyCodePipe implements PipeTransform {

  private currencyMap: { [key: string]: string } = {
    HU: 'HUF',
    US: 'USD',
    DE: 'EUR',
    GB: 'GBP',
    JP: 'JPY',
    CN: 'CNY',
    IN: 'INR'
    // Add more if needed
  };

  transform(value: number, countryCode: string): string {
    const currency = this.currencyMap[countryCode.toUpperCase()] || '';
    return `${value} ${currency}`;
  }
}

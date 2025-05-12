import { Injectable } from '@nestjs/common';

@Injectable()
export class CurrencyUtils {
  formatCurrency(value: number): string {
    return value.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    });
  }

  formatCurrencyWithFractionDigits(value: number): string {
    return value.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
    });
  }

  parseCurrency(value: string): number {
    return Number(value.replace(/[^0-9]/g, ''));
  }
}

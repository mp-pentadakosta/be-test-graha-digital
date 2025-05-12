import { Injectable } from '@nestjs/common';

@Injectable()
export class DateTimeUtils {
  dateToString(date: Date): string {
    return date.toISOString();
  }

  dateToStringDob(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  dateToStringMMDDYYYY(date: Date): string {
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });
  }

  dateToStringDDMMYYYY(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    };
    return date.toLocaleDateString('en-US', options).replace(/\//g, '-');
  }

  dateToStringYYYYMMDD(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Menambahkan 1 karena bulan dimulai dari 0
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  dateToStringDDMMMYYYY(date: Date): string {
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  stringToDate(stringDate: string): Date {
    const [year, month, day] = stringDate.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  YYYYMMDDToDate(stringDate: string): Date {
    const [year, month, day] = stringDate.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  getTimeForDate(date: Date): string {
    return date.toLocaleTimeString('en-US');
  }

  getTimeForDateLocale(date: Date): string {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  getTimeForDateLocaleWithSeconds(date: Date): string {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }
}

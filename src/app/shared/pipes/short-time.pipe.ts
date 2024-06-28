import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortTime',
  standalone: true
})
export class ShortTimePipe implements PipeTransform {
  transform(value: string): string {
    const parts = value.split(':');

    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    const seconds = parseInt(parts[2], 10);

    const date = new Date();
    date.setUTCHours(hours);
    date.setUTCMinutes(minutes);
    date.setUTCSeconds(seconds);

    const formattedHours = date.getUTCHours().toString().padStart(2, '0');
    const formattedMinutes = date.getUTCMinutes().toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}`;
  }
}




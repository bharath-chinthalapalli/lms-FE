import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitAndCapitalize'
})
export class SplitAndCapitalizePipe implements PipeTransform {
  transform(input: string): string {
    if (!input) return '';

    // Split the input by underscores
    const parts = input.split('_');

    // Capitalize the first letter of each part and join with a space
    const capitalizedParts = parts.map(part => {
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    });

    // Join the parts with a space
    return capitalizedParts.join(' ');
  }
}

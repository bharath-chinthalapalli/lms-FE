import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chunkArray'
})
export class TooltipPipe implements PipeTransform {
  transform(arr: any[], size: number): any[] {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  }
}

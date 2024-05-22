import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitTo',
  standalone: true,
})
export class LimitToPipe implements PipeTransform {

  transform(array: any[], limit: number): any[] {
    return array.slice(0, limit);
  }
}

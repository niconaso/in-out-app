import { Pipe, PipeTransform } from '@angular/core';
import { InOutItem } from '../models/in-out.model';

@Pipe({
  name: 'sortInOut',
})
export class SortInOutPipe implements PipeTransform {
  transform(items: InOutItem[]): InOutItem[] {
    return items.sort((a: InOutItem, b: InOutItem) => {
      if (a.type === 'in') {
        return -1;
      } else {
        return 1;
      }
    });
  }
}

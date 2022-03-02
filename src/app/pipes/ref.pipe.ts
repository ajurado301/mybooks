import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ref'
})
export class RefPipe implements PipeTransform {

  transform(value: number): string {
    return 'Ref-' + value.toString();
  }

}

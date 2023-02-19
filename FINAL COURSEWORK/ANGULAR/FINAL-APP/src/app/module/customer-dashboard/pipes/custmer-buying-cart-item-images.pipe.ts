import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'custmerBuyingCartItemImages'
})
export class CustmerBuyingCartItemImagesPipe implements PipeTransform {

  transform(value: any): any {
    return `url(${value}) no-repeat`;
  }

}

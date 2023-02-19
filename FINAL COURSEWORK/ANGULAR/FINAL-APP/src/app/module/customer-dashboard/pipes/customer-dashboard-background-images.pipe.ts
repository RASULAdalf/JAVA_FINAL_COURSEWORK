import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customerDashboardBackgroundImages'
})
export class CustomerDashboardBackgroundImagesPipe implements PipeTransform {

  transform(value: any): any {
    console.log(value);
    return `url(${value}) no-repeat`;
  }

}

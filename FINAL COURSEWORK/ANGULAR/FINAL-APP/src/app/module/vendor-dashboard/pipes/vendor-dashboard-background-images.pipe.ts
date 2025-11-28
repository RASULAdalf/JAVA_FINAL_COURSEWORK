import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vendorDashboardBackgroundImages'
})
export class VendorDashboardBackgroundImagesPipe implements PipeTransform {

  transform(value: any): any {
    console.log(value);
    return `url(${value}) no-repeat`;
  }

}

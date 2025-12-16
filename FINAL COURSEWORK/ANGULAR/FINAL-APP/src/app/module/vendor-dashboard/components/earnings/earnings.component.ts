import {Component, Input, OnInit} from '@angular/core';
import {EarningItem} from "../../../../model/EarningItem";
import {VendorDashboardServiceService} from "../../services/vendor-dashboard-service.service";

@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.component.html',
  styleUrls: ['./earnings.component.scss']
})
export class EarningsComponent implements OnInit {
  @Input() data: any[] | undefined;
  @Input() buttonName: any | undefined;

  earningItemList: EarningItem[] = [];

  constructor(public vendorDashboardService: VendorDashboardServiceService) {

  }

  ngOnInit(): void {


    // @ts-ignore
    for (let dataItem of this.vendorDashboardService.dataList) {
      const index = this.earningItemList.findIndex(element => element.itemCode == dataItem?.itemCode);
      console.log(index)
      if (index != -1) {
        console.log('in')
        const earningItem = this.earningItemList.find(element => element.itemCode = dataItem?.itemCode);
        // @ts-ignore
        earningItem?.qty = earningItem?.qty + dataItem?.qty
        if (earningItem) {
          this.earningItemList.splice(index, 1, earningItem);
        }
      } else {

        let earningItem: EarningItem = {
          itemCode: dataItem?.itemCode,
          itemDescription: dataItem?.itemDescription,
          itemCategory: dataItem?.itemCategory,
          itemLogoUrl: dataItem?.itemLogoUrl,
          qty: dataItem?.qty,
          isVendorPaid: false
        }
        this.earningItemList.push(earningItem);
      }
    }

    this.vendorDashboardService.dataList = this.earningItemList;
    this.vendorDashboardService.dataCount = this.earningItemList.length

  }

}

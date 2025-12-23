import {Component, Input, OnInit} from '@angular/core';
import {EarningItem} from "../../../../model/EarningItem";
import {VendorDashboardServiceService} from "../../services/vendor-dashboard-service.service";
import {PayoutModel} from "../../model/PayoutModel";
import {PayOutItemModel} from "../../model/PayOutItemModel";

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
    console.log(this.vendorDashboardService.dataList)
  }

  ngOnInit(): void {

    // @ts-ignore

  }

  createPayment() {
    let payoutItems = [];
    for (let item of this.vendorDashboardService.dataList) {
      let payoutItem: PayOutItemModel = {
        itemCode: item?.itemCode,
        itemDescription: item?.itemDescription,
        itemLogoUrl: item?.itemLogoUrl,
        unitPrice: item?.unitPrice,
        soldCount: item?.qty,
        itemFullEarning: (item?.qty * item?.unitPrice) * 0.9
      }
      payoutItems.push(payoutItem);
    }
    let payout: PayoutModel = {
      vendorEmail: this.vendorDashboardService.vendorEmail,
      paymentDetails: {
        accountName: '',
        accountNumber: 0,
        Bank: '',
        Branch: ''
      },
      amount: this.vendorDashboardService.totalEarnings,
      payoutDate: new Date(),
      paymentStatus: 'Payment Pending',
      payoutItems: payoutItems
    }

    this.vendorDashboardService.createPayment(payout);
  }

}

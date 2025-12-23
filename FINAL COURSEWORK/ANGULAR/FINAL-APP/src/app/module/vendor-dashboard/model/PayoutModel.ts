import {PayoutDetailsModel} from "./PayoutDetailsModel";
import {PayOutItemModel} from "./PayOutItemModel";

export interface PayoutModel {
  vendorEmail: string,
  paymentDetails: PayoutDetailsModel,
  amount: number,
  payoutDate: Date,
  paymentStatus: string,
  payoutItems: PayOutItemModel[]
}

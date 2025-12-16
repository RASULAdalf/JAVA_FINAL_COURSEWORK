import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomerDashboardService} from "../../services/customer-dashboard.service";
import {LocalDataService} from "../../../../core/services/local-data.service";
import {LoadingService} from "../../../../core/services/loading.service";

@Component({
  selector: 'app-review-customer',
  templateUrl: './review-customer.component.html',
  styleUrls: ['./review-customer.component.scss']
})
export class ReviewCustomerComponent implements OnInit {
  rating: any;
  comment: any;
  formData = new FormData();
  reviewsForm = new FormGroup({
    reviewText: new FormControl('', Validators.required),
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    data: any[],
    itemId: any
  }, private customerDashboardService: CustomerDashboardService, private localStorageService: LocalDataService, public loadingService: LoadingService) {
    console.log(data?.data)
  }

  ngOnInit(): void {
  }

  onReviewSubmit($event: SubmitEvent) {

  }

  submit() {
    this.formData.append('customerEmail', this.localStorageService.getCookie('userEmail'));
    this.formData.append('reviewText', this.reviewsForm.get('reviewText')?.value);
    this.formData.append('starCount', this.rating);

    this.customerDashboardService.addReview(this.formData, this.data.itemId)

  }
}

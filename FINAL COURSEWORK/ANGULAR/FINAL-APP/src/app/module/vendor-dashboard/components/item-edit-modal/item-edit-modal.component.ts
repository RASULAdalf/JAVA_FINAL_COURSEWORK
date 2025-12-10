import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {VendorDashboardServiceService} from "../../services/vendor-dashboard-service.service";
import {LoadingService} from "../../../../core/services/loading.service";
import {HttpService} from "../../../../core/services/http.service";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-item-edit-modal',
  templateUrl: './item-edit-modal.component.html',
  styleUrls: ['./item-edit-modal.component.scss']
})

export class ItemEditModalComponent implements OnInit {
  category: any = this.data.data[this.data.index]?.itemCategory;
  formData = new FormData();
  addNewItemsForm = new FormGroup({
    description: new FormControl(this.data.data[this.data.index]?.itemDescription, [Validators.required, Validators.maxLength(30)]),
    qty: new FormControl(this.data.data[this.data.index]?.qtyOnHand, Validators.required),
    price: new FormControl(this.data.data[this.data.index]?.unitPrice, Validators.required),
    img: new FormControl('', Validators.required),
    slideShowImgs: new FormControl('', Validators.required),
    specsDoc: new FormControl('', Validators.required),
    category: new FormControl(this.data.data[this.data.index]?.itemCategory, Validators.required),
    vEmail: new FormControl(this.data.data[this.data.index]?.vendorEmail, Validators.required)
  })
  baseDatabaseServerUrl = environment.DatabaseServerUrl;
  categories: any[] = [{value: 'Books'}, {value: 'Clothes'}, {value: 'Electronics'}, {value: 'Electrical'}, {value: 'Cosmetics'}, {value: 'Other'}];
  additionalSlideShowImgCheck: boolean = false;
  logoImgUplaod: boolean = false;
  slideShowImgsUpload: boolean = false;
  specsDocUpload: boolean = false;
  private baseUtilServerUrl: string = environment.UtilServerUrl;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    index: any,
    data: any[],
    buttonName: any,
  }, private httpService: HttpService, private dialogRef: MatDialogRef<ItemEditModalComponent>, public loadingService: LoadingService, public vendorDashboardService: VendorDashboardServiceService) {
  }

  ngOnInit(): void {
  }

  submit() {
    this.formData.append('itemDescription', this.addNewItemsForm.get('description')?.value)
    this.formData.append('itemCategory', this.category)
    this.formData.append('vendorEmail', this.addNewItemsForm.get('vEmail')?.value)
    this.formData.append('unitPrice', this.addNewItemsForm.get('price')?.value)
    this.formData.append('qty', this.addNewItemsForm.get('qty')?.value)
    this.formData.append('showImg', this.addNewItemsForm.get('img')?.value);
    this.formData.append('slideShowImgs', this.addNewItemsForm.get('slideShowImgs')?.value);
    this.formData.append('specsDoc', this.addNewItemsForm.get('specsDoc')?.value);

    if (this.data.buttonName === 'Save') {
      this.vendorDashboardService.saveProduct(this.formData)
        .subscribe(res => {
          this.vendorDashboardService.loadData('PRODUCTS', 0, 10);

          console.log(res?.message);

        })

    } else if (this.data.buttonName === 'Update') {
      console.log(this.additionalSlideShowImgCheck)
      if (!this.additionalSlideShowImgCheck) {
        this.vendorDashboardService.updateProduct(
          this.addNewItemsForm.get('vEmail')?.value,
          this.data.data[this.data.index]?.itemCode,
          'deleteUpdate', this.formData
        ).subscribe(res => {
          this.vendorDashboardService.loadData('PRODUCTS', 0, 10);

          console.log(res?.message);

        })
      } else if (this.additionalSlideShowImgCheck) {
        this.vendorDashboardService.updateProduct(
          this.addNewItemsForm.get('vEmail')?.value,
          this.data.data[this.data.index]?.itemCode,
          'addUpdate', this.formData
        ).subscribe(res => {
          this.vendorDashboardService.loadData('PRODUCTS', 0, 10);

          console.log(res?.message);

        })
      }
    }


  }

  onImgChange(event: Event) {

    // @ts-ignore
    if (event.target.files.length > 0) {

      // @ts-ignore
      const file = event.target.files[0];

      this.addNewItemsForm.patchValue({

        img: file

      });

      this.logoImgUplaod = true;

    }
  }

  onSlideImgsChange(event: Event) {
    // @ts-ignore
    for (const file of event.target.files) {
      this.formData.append("slideShowImgs", file);
    }

    this.slideShowImgsUpload = true;

  }

  onSpecsDocChange(event: Event) {
    // @ts-ignore
    if (event.target.files.length > 0) {

      // @ts-ignore
      const file = event.target.files[0];

      this.addNewItemsForm.patchValue({

        specsDoc: file

      });
      this.specsDocUpload = true;

    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

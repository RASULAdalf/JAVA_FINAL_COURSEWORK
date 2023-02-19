import {Component, OnInit} from '@angular/core';
import {VendorDashboardServiceService} from "./services/vendor-dashboard-service.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpService} from "../../service/http.service";
import {environment} from "../../../environments/environment";
import {LoadingService} from "../customer-dashboard/services/loading.service";
import {SnackBarService} from "../customer-dashboard/services/snack-bar.service";
import {ModalService} from "../customer-dashboard/services/modal.service";

@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.scss']
})
export class VendorDashboardComponent implements OnInit {
  vendorEmail:any;

  addNewItemsForm = new FormGroup({
    description:new FormControl('',[Validators.required,Validators.maxLength(10)]),
    qty:new FormControl('',Validators.required),
    price:new FormControl('',Validators.required),
    imgSource:new FormControl('',Validators.required),
    img:new FormControl('',Validators.required),
    //slideShowImgsSource:new FormControl('',Validators.required),
    slideShowImgs:new FormControl('',Validators.required),
    specsDocSource:new FormControl('',Validators.required),
    specsDoc:new FormControl('',Validators.required),
    category:new FormControl('',Validators.required),
    vEmail:new FormControl(this.dashboardService.vendorEmail,Validators.required)
  })
  category: any;
  categories: any[]=[{value:'Books'},{value:'Clothes'},{value:'Electronics'},{value:'Electrical'},{value:'Cosmetics'},{value:'Other'}];
  slideShowImgs:any[] = [];
  baseDatabaseServerUrl = environment.DatabaseServerUrl;
  baseUtilServerUrl = environment.UtilServerUrl;
  formData = new FormData();

  onImg:boolean = true;
  onSlide:boolean = true;
  onSpec:boolean = true;
  type: any = "Bar";

  constructor(private modalService:ModalService,public snackBarService:SnackBarService,public loadingService:LoadingService,private httpService:HttpService,private dashboardService: VendorDashboardServiceService) {
    this.dashboardService.loginService.afAuth.currentUser.then(result=>{
      this.vendorEmail = result?.email;
    })

  }


  onImgChange($event: Event) {
        this.onImg = false;
    // @ts-ignore
    if (event.target.files.length > 0) {

      // @ts-ignore
      const file = event.target.files[0];

      this.addNewItemsForm.patchValue({

        imgSource: file

      });

    }
  }

  onSpecsDocChange($event: Event) {
    this.onSpec = false;
    // @ts-ignore
    if (event.target.files.length > 0) {

      // @ts-ignore
      const file = event.target.files[0];

      this.addNewItemsForm.patchValue({

        specsDocSource: file

      });

    }
  }
  onSlideImgsChange($event: Event) {
    this.onSlide = false;
    // @ts-ignore
    for (const file of event.target.files){
      this.formData.append("slideShowImgs",file);
    }
  }

  submit(){



    this.formData.append('specsDoc', this.addNewItemsForm.get('specsDocSource')?.value);
    this.formData.append('itemDescription',this.addNewItemsForm.get('description')?.value)
    this.formData.append('itemCategory',this.category)
    this.formData.append('showImg', this.addNewItemsForm.get('imgSource')?.value);
    this.formData.append('unitPrice',this.addNewItemsForm.get('price')?.value)
    this.formData.append('qty',this.addNewItemsForm.get('qty')?.value)
    this.formData.append('vendorEmail',this.addNewItemsForm.get('vEmail')?.value)


    this.httpService.post(this.baseUtilServerUrl+'Item/saveItem', this.formData)

      .subscribe(res => {

        this.snackBarService.openSnackBar(res?.message);

      })

  }
  ngOnInit(): void {
    this.modalService.openLetSirKnowModal("Vendor Dashboard");
  }

  logOut() {
    this.dashboardService.logOut();
  }


}

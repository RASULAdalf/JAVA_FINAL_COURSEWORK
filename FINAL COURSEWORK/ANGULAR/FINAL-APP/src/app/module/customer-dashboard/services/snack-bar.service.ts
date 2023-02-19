import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  public openSnackBar(data:any){
    this.snackBar.open(data, 'OK', {
      duration: 10000
    });
  }
}

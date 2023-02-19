import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-let-sir-know',
  templateUrl: './let-sir-know.component.html',
  styleUrls: ['./let-sir-know.component.scss']
})
export class LetSirKnowComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { data:any}) { }

  ngOnInit(): void {
  }

}

import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.component.html',
  styleUrls: ['./earnings.component.scss']
})
export class EarningsComponent implements OnInit {
  @Input() data: any[] | undefined;
  @Input() buttonName: any | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

}

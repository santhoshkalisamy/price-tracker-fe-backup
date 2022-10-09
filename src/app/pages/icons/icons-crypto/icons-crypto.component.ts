import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-icons-crypto',
  templateUrl: './icons-crypto.component.html',
  styleUrls: ['./icons-crypto.component.scss']
})

/**
 * IconsCrypto Component
 */
export class IconsCryptoComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;

  constructor() { }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
     this.breadCrumbItems = [
      { label: 'Icons' },
      { label: 'Crypto Icons', active: true }
    ];
  }

}

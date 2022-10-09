import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lineawesome',
  templateUrl: './lineawesome.component.html',
  styleUrls: ['./lineawesome.component.scss']
})

/**
 * Lineawesome Icon Component
 */
export class LineawesomeComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;

  constructor() { }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
     this.breadCrumbItems = [
      { label: 'Icons' },
      { label: 'Line Awesome', active: true }
    ];
  }

}

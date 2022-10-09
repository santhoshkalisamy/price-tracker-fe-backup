import { Component, OnInit } from '@angular/core';
import { Icons } from './feather-icons.model';
import { IconsData } from './data';

@Component({
  selector: 'app-feather',
  templateUrl: './feather.component.html',
  styleUrls: ['./feather.component.scss']
})

/**
 * Feather Component
 */
export class FeatherComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  IconsData!: Icons[];

  constructor() { }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
     this.breadCrumbItems = [
      { label: 'Icons' },
      { label: 'Feather', active: true }
    ];

    /***
    * All Data Get
    */
     this.fetchData();
    }

    /**
     * Fetches the data
     */
     private fetchData() {
      this.IconsData = IconsData;
    }

}

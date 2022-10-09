import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';

import { projectListWidgets, projectListWidgets1, projectListWidgets2 } from './data';
import { projectListModel, projectListModel1, projectListModel2 } from './list.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

/**
 * List Component
 */
export class ListComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  projectListWidgets!: projectListModel[];
  projectListWidgets1!: projectListModel1[];
  projectListWidgets2!: projectListModel2[];

  constructor() { }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
     this.breadCrumbItems = [
      { label: 'Projects' },
      { label: 'Project List', active: true }
    ];

    /**
     * Fetches the data
     */
     this.fetchData();
  }

  /**
   * Fetches the data
   */
   private fetchData() {
    this.projectListWidgets = projectListWidgets;
    this.projectListWidgets1 = projectListWidgets1;
    this.projectListWidgets2 = projectListWidgets2;
  }

}

import {Component, QueryList, ViewChildren} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { BitcoinChart, MicroChart, NestaChart, iTestChart, MetaChart, DigitechChart, SyntyceChart, ZoeticChart } from './data';

@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.component.html',
  styleUrls: ['./sellers.component.scss']
})

/**
 * Sellers Component
 */
export class SellersComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  BitcoinChart: any;
  MicroChart: any;
  NestaChart: any;
  iTestChart: any;
  MetaChart: any;
  DigitechChart: any;
  SyntyceChart: any;
  ZoeticChart: any;
  submitted = false;


  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
     this.breadCrumbItems = [
      { label: 'Ecommerce' },
      { label: 'Sellers', active: true }
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
    this.BitcoinChart = BitcoinChart;
    this.MicroChart = MicroChart;
    this.NestaChart = NestaChart;
    this.iTestChart = iTestChart;
    this.MetaChart = MetaChart;
    this.DigitechChart = DigitechChart;
    this.SyntyceChart = SyntyceChart;
    this.ZoeticChart = ZoeticChart;
  }

  /**
   * Open modal
   * @param content modal content
   */
   openModal(content: any) {
    this.submitted = false;
    this.modalService.open(content, { size: 'lg', centered: true });
  }

}

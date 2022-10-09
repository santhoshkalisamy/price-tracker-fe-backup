import {Component, QueryList, ViewChildren} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {Observable} from 'rxjs';

import { TransactionsModel } from './transactions.model';
import { Transactions } from './data';
import { TransactionsService } from './transactions.service';
import { NgbdTransactionsSortableHeader, SortEvent } from './transactions-sortable.directive';

import { defineLordIconElement } from 'lord-icon-element';
import lottie from 'lottie-web';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  providers: [TransactionsService, DecimalPipe]
})

/**
 * Transactions Component
 */
export class TransactionsComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  masterSelected!:boolean;
  checkedList:any;

  // Table data
  TransactionList$!: Observable<TransactionsModel[]>;
  total$: Observable<number>;
  @ViewChildren(NgbdTransactionsSortableHeader) headers!: QueryList<NgbdTransactionsSortableHeader>;

  constructor(public service: TransactionsService) {
    this.TransactionList$ = service.countries$;
    this.total$ = service.total$;
    defineLordIconElement(lottie.loadAnimation);
  }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
     this.breadCrumbItems = [
      { label: 'Crypto' },
      { label: 'Transactions', active: true }
    ];
  }

  /**
   * Swiper setting
   */
   config = {
    initialSlide: 0,
    slidesPerView: 1
  };

}

import {Component, QueryList, ViewChildren} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {Observable} from 'rxjs';

import { OrdersModel } from './orders.model';
import { Orders } from './data';
import { BuySellService } from './orders.service';
import { NgbdOrdersSortableHeader, SortEvent } from './orders-sortable.directive';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  providers: [BuySellService, DecimalPipe]
})

/**
 * Orders Component
 */
export class OrdersComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;

  // Table data
  OrdersList$!: Observable<OrdersModel[]>;
  total$: Observable<number>;
  @ViewChildren(NgbdOrdersSortableHeader) headers!: QueryList<NgbdOrdersSortableHeader>;

  constructor(public service: BuySellService) {
    this.OrdersList$ = service.countries$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
     this.breadCrumbItems = [
      { label: 'Crypto' },
      { label: 'Orders', active: true }
    ];
  }

}

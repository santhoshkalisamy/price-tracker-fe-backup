import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbTypeaheadModule, NgbNavModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

// Counter
import { CountToModule } from 'angular-count-to';
// Flat Picker
import { FlatpickrModule } from 'angularx-flatpickr';

// Swiper Slider
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

// Apex Chart Package
import { NgApexchartsModule } from 'ng-apexcharts';

// NG2 Search Filter
import { Ng2SearchPipeModule } from 'ng2-search-filter';

// File Uploads
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

// Component pages
import { CryptoRoutingModule } from './crypto-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { TransactionsComponent } from './transactions/transactions.component';
import { BuySellComponent } from './buy-sell/buy-sell.component';
import { OrdersComponent } from './orders/orders.component';
import { WalletComponent } from './wallet/wallet.component';
import { IcoComponent } from './ico/ico.component';
import { KycComponent } from './kyc/kyc.component';

import {DatePipe} from '@angular/common';

// Load Icons
import { defineLordIconElement } from 'lord-icon-element';
import lottie from 'lottie-web';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  url: 'https://httpbin.org/post',
  maxFilesize: 50,
  acceptedFiles: 'image/*'
};


@NgModule({
  declarations: [
    TransactionsComponent,
    BuySellComponent,
    OrdersComponent,
    WalletComponent,
    IcoComponent,
    KycComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbNavModule,
    NgbDropdownModule,
    CountToModule,
    FlatpickrModule,
    SwiperModule,
    NgApexchartsModule,
    DropzoneModule,
    CryptoRoutingModule,
    SharedModule,
    Ng2SearchPipeModule
  ],
  providers: [
    DatePipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CryptoModule {
  constructor() {
    defineLordIconElement(lottie.loadAnimation);
  }
 }

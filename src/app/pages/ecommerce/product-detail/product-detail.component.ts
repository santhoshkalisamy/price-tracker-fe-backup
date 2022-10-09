import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Swiper Slider
import { SwiperComponent, SwiperDirective } from 'ngx-swiper-wrapper';

import { productModel, productList } from '../product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})

/**
 * ProductDetail Component
 */
export class ProductDetailComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  public productDetail!: productModel[];
  isImage;
  defaultSelect = 2;
  readonly = false;

  @ViewChild(SwiperDirective) directiveRef?: SwiperDirective;
  @ViewChild(SwiperComponent, { static: false }) componentRef?: SwiperComponent;

  constructor(private route: ActivatedRoute, private modalService: NgbModal) {
    this.route.params.subscribe(params =>
      this.productDetail = productList.filter(function (product) {
        return product.id == parseInt(params['id'])
      })
    );
    this.isImage = this.productDetail[0].images[0];
  }

  ngOnInit(): void {
    /**
   * BreadCrumb
   */
     this.breadCrumbItems = [
      { label: 'Ecommerce' },
      { label: 'Product Details', active: true }
    ];
  }

  /**
   * Swiper setting
   */
   config = {
    initialSlide: 0,
    slidesPerView: 1,
  };

  /**
   * Swiper card previous set
   */
   previousSlideComp() {
    this.componentRef!.directiveRef!.prevSlide();
  }

  /**
   * Swiper card next set
   */
   nextSlideComp() {
    this.componentRef!.directiveRef!.nextSlide();
  }

}

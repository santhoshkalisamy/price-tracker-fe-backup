import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Swiper Slider
import { SwiperComponent, SwiperDirective } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})

/**
 * Timeline Component
 */
export class TimelineComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;

  @ViewChild(SwiperDirective) directiveRef?: SwiperDirective;
  @ViewChild(SwiperComponent, { static: false }) componentRef?: SwiperComponent;

  constructor() { }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
     this.breadCrumbItems = [
      { label: 'Pages' },
      { label: 'Timeline', active: true }
    ];
  }

   /**
   * Swiper setting
   */
    config = {
      initialSlide: 0,
      slidesPerView: 1,
      breakpoints:{
        768:{
          slidesPerView: 2, 
        },
        1200:{
          slidesPerView: 5, 
        }
      }
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

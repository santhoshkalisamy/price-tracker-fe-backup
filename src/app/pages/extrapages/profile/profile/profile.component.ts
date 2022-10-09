import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Swiper Slider
import { SwiperComponent, SwiperDirective } from 'ngx-swiper-wrapper';

import { TokenStorageService } from '../../../../core/services/token-storage.service';

import { projectList, document } from './data';
import { projectListModel, documentModel } from './profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

/**
 * Profile Component
 */
export class ProfileComponent implements OnInit {

  projectList!: projectListModel[];
  document!: documentModel[];
  userData:any;

  @ViewChild(SwiperDirective) directiveRef?: SwiperDirective;
  @ViewChild(SwiperComponent, { static: false }) componentRef?: SwiperComponent;


  constructor(private TokenStorageService : TokenStorageService) { }

  ngOnInit(): void {
    this.userData =  this.TokenStorageService.getUser(); 
    /**
     * Fetches the data
     */
     this.fetchData();
  }

  /**
   * Fetches the data
   */
   private fetchData() {
    this.projectList = projectList;
    this.document = document;
  }

  /**
   * Swiper setting
   */
   config = {
    slidesPerView: 1,
    initialSlide: 0,
    spaceBetween: 25,
    breakpoints:{
      768:{
        slidesPerView: 2, 
      },
      1200:{
        slidesPerView: 3, 
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

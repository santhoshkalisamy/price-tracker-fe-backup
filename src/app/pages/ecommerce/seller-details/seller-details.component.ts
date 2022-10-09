import {Component, QueryList, ViewChildren} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {Observable} from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Sweet Alert
import Swal from 'sweetalert2';

import { ChartType, sellerDetailModel } from './seller-details.model';
import { sellerDetailsService } from './seller-details.service';
import { NgbdProductsSortableHeader, SortEvent } from './seller-details-sortable.directive';

// Products Services
import { restApiService } from "../../../core/services/rest-api.service";
import { GlobalComponent } from '../../../global-component';

@Component({
  selector: 'app-seller-details',
  templateUrl: './seller-details.component.html',
  styleUrls: ['./seller-details.component.scss'],
  providers: [sellerDetailsService, DecimalPipe]
})

/**
 * SellerDetails Component
 */
export class SellerDetailsComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  analyticsChart!: ChartType;
  content?: any;
  sellers?:any;
  url = GlobalComponent.API_URL;
  // Table data
  sellerDetailsList!: Observable<sellerDetailModel[]>;
  total: Observable<number>;
  @ViewChildren(NgbdProductsSortableHeader) headers!: QueryList<NgbdProductsSortableHeader>;

  constructor(private modalService: NgbModal,public service: sellerDetailsService, private ApiService : restApiService) {
    this.sellerDetailsList = service.countries$;
    this.total = service.total$;
  }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
     this.breadCrumbItems = [
      { label: 'Ecommerce' },
      { label: 'Seller Details', active: true }
    ];

     // Chart Color Data Get Function
    this._analyticsChart('["--vz-warning", "--vz-secondary", "--vz-success"]');

    /**
     * fetches data
     */
     this.sellerDetailsList.subscribe(x => {
      this.content = this.sellers;
      this.sellers =  Object.assign([], x);       
    }); 
  }

  /**
    * Confirmation mail model
  */
  deleteId: any;
    confirm(content:any,id:any) {
      this.deleteId = id;
      this.modalService.open(content, { centered: true });
  }


  // Delete Data
  deleteData(id:any) {    
    if(id){
      this.ApiService.deleteData(id).subscribe({
        next: data => {        
          
        },
        error: err => {
          this.content = JSON.parse(err.error).message;
        }
      });
    document.getElementById('p_'+id)?.remove();  
    }
    else{
      this.checkedValGet.forEach((item:any)=>{
        document.getElementById('p_'+ item)?.remove();      
      });
    }
  }

  /**
  * Multiple Delete
  */
   checkedValGet: any[] = [];
   deleteMultiple(content:any){
     var checkboxes:any = document.getElementsByName('checkAll');
     var result
     var checkedVal: any[] = [];
     for (var i = 0; i < checkboxes.length; i++) {
       if (checkboxes[i].checked) {
           result = checkboxes[i].value;
           checkedVal.push(result);   
       }
     }
     if(checkedVal.length > 0){
       this.modalService.open(content, { centered: true });
     }
     else{
       Swal.fire({text:'Please select at least one checkbox',confirmButtonColor: '#299cdb',});
     }
     this.checkedValGet = checkedVal;
   }

   // Chart Colors Set
  private getChartColorsArray(colors:any) {
    colors = JSON.parse(colors);
    return colors.map(function (value:any) {
      var newValue = value.replace(" ", "");
      if (newValue.indexOf(",") === -1) {
        var color = getComputedStyle(document.documentElement).getPropertyValue(newValue);
            if (color) {
            color = color.replace(" ", "");
            return color;
            }
            else return newValue;;
        } else {
            var val = value.split(',');
            if (val.length == 2) {
                var rgbaColor = getComputedStyle(document.documentElement).getPropertyValue(val[0]);
                rgbaColor = "rgba(" + rgbaColor + "," + val[1] + ")";
                return rgbaColor;
            } else {
                return newValue;
            }
        }
    });
  }

  /**
 * Sales Analytics Chart
 */
   private _analyticsChart(colors:any) {
    colors = this.getChartColorsArray(colors);
    this.analyticsChart = {
      series: [{
          name: "Orders",
          type: "area",
          data: [34, 65, 46, 68, 49, 61, 42, 44, 78, 52, 63, 67],
        },
        {
            name: "Earnings",
            type: "bar",
            data: [
                89.25, 98.58, 68.74, 108.87, 77.54, 84.03, 51.24, 28.57, 92.57, 42.36,
                88.51, 36.57,
            ],
        },
        {
          name: 'Refunds',
          type: 'line',
          data: [8, 12, 7, 17, 21, 11, 5, 9, 7, 29, 12, 35]
        }
      ],
      chart: {
        height: 370,
        type: "line",
        toolbar: {
            show: false,
        },
      },
      stroke: {
        curve: "straight",
        dashArray: [0, 0, 8],
        width: [2, 0, 2.2],
      },
      fill: {
        opacity: [0.1, 0.9, 1],
      },
      markers: {
        size: [0, 0, 0],
        strokeWidth: 2,
        hover: {
            size: 4,
        },
      },
      xaxis: {
        categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        axisTicks: {
            show: false,
        },
        axisBorder: {
            show: false,
        },
      },
      grid: {
        show: true,
        xaxis: {
            lines: {
                show: true,
            },
        },
        yaxis: {
            lines: {
                show: false,
            },
        },
        padding: {
            top: 0,
            right: -2,
            bottom: 15,
            left: 10,
        },
      },
      legend: {
        show: true,
        horizontalAlign: "center",
        offsetX: 0,
        offsetY: -5,
        markers: {
            width: 9,
            height: 9,
            radius: 6,
        },
        itemMargin: {
            horizontal: 10,
            vertical: 0,
        },
      },
      plotOptions: {
        bar: {
            columnWidth: "30%",
            barHeight: "70%",
        },
      },
      colors: colors,

    };
  }

}

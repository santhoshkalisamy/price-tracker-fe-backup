import {Component, QueryList, ViewChildren} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {Observable} from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

// Sweet Alert
import Swal from 'sweetalert2';

// Date Format
import {DatePipe} from '@angular/common';

import {ListModel} from './list.model';
import { Orders } from './data';
import { ListService } from './list.service';
import { NgbdListSortableHeader, SortEvent } from './list-sortable.directive';

// Rest Api Service
import { restApiService } from "../../../core/services/rest-api.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [ListService, DecimalPipe]
})

/**
 * List Component
 */
export class ListComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;

  // Table data
  invoicesList!: Observable<ListModel[]>;
  total: Observable<number>;
  @ViewChildren(NgbdListSortableHeader) headers!: QueryList<NgbdListSortableHeader>;
  CustomersData!: ListModel[];
  masterSelected!:boolean;
  checkedList:any;

   // Api Data
   content?: any;
   econtent?: any;
   invoices?: any;

  constructor(private modalService: NgbModal,public service: ListService, private formBuilder: UntypedFormBuilder, private ApiService : restApiService, private datePipe: DatePipe) {
    this.invoicesList = service.invoices$;
    this.total = service.total$;
  }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
     this.breadCrumbItems = [
      { label: 'Invoices' },
      { label: 'Invoice List', active: true }
    ];

    /**
     * fetches data
     */
     this.invoicesList.subscribe(x => {
      this.content = this.invoices;
      this.invoices =  Object.assign([], x);             
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
      this.ApiService.deleteInvoice(id).subscribe({
        next: data => { },
        error: err => {
          this.content = JSON.parse(err.error).message;
        }
      });
      document.getElementById('i_'+id)?.remove();
    }
    else{
      this.checkedValGet.forEach((item:any)=>{
        document.getElementById('i_'+ item)?.remove();      
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

  // The master checkbox will check/ uncheck all items
  checkUncheckAll(ev:any) {    
    this.invoices.forEach((x: { state: any; }) => x.state = ev.target.checked)
  }

}

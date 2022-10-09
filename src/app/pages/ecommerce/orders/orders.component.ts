import {Component, QueryList, ViewChildren} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {Observable} from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, FormArray, Validators } from '@angular/forms';

// Sweet Alert
import Swal from 'sweetalert2';

// Csv File Export
import { ngxCsv } from 'ngx-csv/ngx-csv';

// Date Format
import {DatePipe} from '@angular/common';

import {OrdersModel} from './orders.model';
import { Orders } from './data';
import { OrdersService } from './orders.service';
import { NgbdOrdersSortableHeader, SortEvent } from './orders-sortable.directive';

// Rest Api Service
import { restApiService } from "../../../core/services/rest-api.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  providers: [OrdersService, DecimalPipe]
})

/**
 * Orders Component
 */
export class OrdersComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  ordersForm!: UntypedFormGroup;
  submitted = false;
  CustomersData!: OrdersModel[];
  masterSelected!:boolean;
  checkedList:any;

  // Api Data
  content?: any;
  econtent?:any;
  orderes?: any;

  // Table data
  ordersList!: Observable<OrdersModel[]>;
  total: Observable<number>;
  @ViewChildren(NgbdOrdersSortableHeader) headers!: QueryList<NgbdOrdersSortableHeader>;

  constructor(private modalService: NgbModal,public service: OrdersService, private formBuilder: UntypedFormBuilder, private ApiService : restApiService, private datePipe: DatePipe) {
    this.ordersList = service.countries$;
    this.total = service.total$;
  }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'Ecommerce' },
      { label: 'Orders', active: true }
    ];

    /**
     * Form Validation
     */
    this.ordersForm = this.formBuilder.group({
      orderId: "#VZ2101",
      ids: [''],
      customer: ['', [Validators.required]],
      product: ['', [Validators.required]],
      orderDate: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      payment: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });

   /**
    * fetches data
    */
    this.ordersList.subscribe(x => {
      this.content = this.orderes;
      this.orderes =  Object.assign([], x);   
    });
  }

   /**
  * Delete Model Open
  */
  deleteId: any;
  confirm(content: any,id:any) {
    this.deleteId = id;
    this.modalService.open(content, { centered: true });
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
      Swal.fire({text:'Please select at least one checkbox',confirmButtonColor: '#239eba',});
    }
    this.checkedValGet = checkedVal;
  }
  
  // Delete Data
  deleteData(id:any) {    
    if(id){
      this.ApiService.deleteOrder(id).subscribe({
        next: data => { },
        error: err => {
          this.content = JSON.parse(err.error).message;
        }
      });
      document.getElementById('o_'+id)?.remove();   
    }
    else{
      this.checkedValGet.forEach((item:any)=>{
        document.getElementById('o_'+ item)?.remove();      
      });
    }
  }

  /**
   * Open modal
   * @param content modal content
   */
   openModal(content: any) {
    this.submitted = false;
    this.modalService.open(content, { size: 'md', centered: true });
  }

   /**
   * Form data get
   */
    get form() {
      return this.ordersForm.controls;
    }

  /**
   * Open Edit modal
   * @param content modal content
   */
   editDataGet(id: any, content:any) {
    this.submitted = false;
    this.modalService.open(content, { size: 'md', centered: true });
    var modelTitle = document.querySelector('.modal-title') as HTMLAreaElement;
    modelTitle.innerHTML = 'Edit Order';
    var updateBtn = document.getElementById('add-btn') as HTMLAreaElement;
    updateBtn.innerHTML = "Update";

    this.ApiService.getSingleOrderData(id).subscribe({
      next: data => {    
        const users =  JSON.parse(data);
        this.econtent = users.data; 
        
        this.ordersForm.controls['customer'].setValue(this.econtent.customer);
        this.ordersForm.controls['product'].setValue(this.econtent.product);
        this.ordersForm.controls['orderDate'].setValue(this.econtent.orderDate);
        this.ordersForm.controls['amount'].setValue(this.econtent.amount);
        this.ordersForm.controls['payment'].setValue(this.econtent.payment);
        this.ordersForm.controls['status'].setValue(this.econtent.status);
        this.ordersForm.controls['ids'].setValue(this.econtent._id);
      },
      error: err => {
        this.content = JSON.parse(err.error).message;
      }
    });
    
  }

  /**
  * Save user
  */
  saveUser() {
    if (this.ordersForm.valid) {
      if (this.ordersForm.get('ids')?.value) {
        this.ApiService.patchOrderData(this.ordersForm.value).subscribe(
          (data: any) => {
            this.orderes = this.content.map((order: { _id: any; }) => order._id === data.data.ids ? { ...order, ...data.data } : order);
            this.modalService.dismissAll();
          }
        )
      }
      else{
        this.ApiService.postOrderData(this.ordersForm.value).subscribe(
          (data: any) => {
            this.orderes.push(data.data);   
            this.modalService.dismissAll();
            let timerInterval: any;
            Swal.fire({
              title: 'Order inserted successfully!',
              icon: 'success',
              timer: 2000,
              timerProgressBar: true,
              willClose: () => {
                clearInterval(timerInterval);
              },
            }).then((result) => {
              /* Read more about handling dismissals below */
              if (result.dismiss === Swal.DismissReason.timer) {
              }
            });  
        },) 
      }
    }
    setTimeout(() => {
      this.ordersForm.reset();
    }, 2000);
    this.submitted = true
  }

  // The master checkbox will check/ uncheck all items
  checkUncheckAll(ev:any) {    
    this.orderes.forEach((x: { state: any; }) => x.state = ev.target.checked)
  }

  // Get List of Checked Items
  getCheckedItemList(){
    this.checkedList = [];
    for (var i = 0; i < this.CustomersData.length; i++) {
      if(this.CustomersData[i].isSelected)
      this.checkedList.push(this.CustomersData[i]);
    }
    this.checkedList = JSON.stringify(this.checkedList);
  }

  // Csv File Export
  csvFileExport(){    
    var orders = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true, 
      showTitle: true,
      title: 'Order Data',
      useBom: true,
      noDownload: false,
      headers: ["id", "order Id", "customer", "product", "orderDate", "amount","payment","status"]
    };
    new ngxCsv(this.content, "orders", orders);
  }
    

}

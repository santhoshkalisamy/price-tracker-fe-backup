import {Component, QueryList, ViewChildren} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {Observable} from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, UntypedFormArray, Validators, UntypedFormControl } from '@angular/forms';

// Sweet Alert
import Swal from 'sweetalert2';

// Date Format
import {DatePipe} from '@angular/common';

import {Country,Assigned} from './list-view.model';
import { COUNTRIES, AssignedData } from './data';
import { ListViewService } from './list-view.service';
import { NgbdListViewSortableHeader, SortEvent } from './list-view-sortable.directive';

// Rest Api Service
import { restApiService } from "../../../core/services/rest-api.service";

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss'],
  providers: [ListViewService, DecimalPipe]
})

/**
 * ListView Component
 */
export class ListViewComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  submitted = false;
  tasksForm!: UntypedFormGroup;
  CustomersData!: Country[];
  checkedList:any;
  masterSelected!:boolean;
  AssignedData!: Assigned[];

  content?: any;
  tasks?:any;
  econtent?:any;

  // Table data
  listViewList!: Observable<Country[]>;
  total: Observable<number>;
  @ViewChildren(NgbdListViewSortableHeader) headers!: QueryList<NgbdListViewSortableHeader>;

  constructor(private modalService: NgbModal,public service: ListViewService, private formBuilder: UntypedFormBuilder, private ApiService : restApiService, private datePipe: DatePipe) {
    this.listViewList = service.customers$;
    this.total = service.total$;
  }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
     this.breadCrumbItems = [
      { label: 'Tasks' },
      { label: 'Tasks List', active: true }
    ];

    /**
     * Form Validation
     */
     this.tasksForm = this.formBuilder.group({
      taskId: "#VLZ1",
      ids: [''],
      project: ['', [Validators.required]],
      task: ['', [Validators.required]],
      creater: ['', [Validators.required]],
      subItem: this.formBuilder.array([]),
      dueDate: ['', [Validators.required]],
      status: ['', [Validators.required]],
      priority: ['', [Validators.required]]
    });

    /**
     * fetches data
     */
     this.AssignedData = AssignedData;
     this.listViewList.subscribe(x => {
      this.content = this.tasks;
      this.tasks =  Object.assign([], x);  
    });

  }

  /**
  * Sort table data
  * @param param0 sort the column
  *
  */
   onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
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
      return this.tasksForm.controls;
    }

  /**
  * Save user
  */
  saveUser() {
    if (this.tasksForm.valid) {
      if (this.tasksForm.get('ids')?.value) {
        this.ApiService.patchOrderData(this.tasksForm.value).subscribe(
          (data: any) => {
            this.tasks = this.content.map((order: { _id: any; }) => order._id === data.data.ids ? { ...order, ...data.data } : order);
            this.modalService.dismissAll();
          }
          )
      }
      else{                   
        this.ApiService.postTaskData(this.tasksForm.value).subscribe(
          (data: any) => {              
            this.tasks.push(data.data);   
            this.modalService.dismissAll();
            let timerInterval: any;
            Swal.fire({
              title: 'Task inserted successfully!',
              icon: 'success',
              timer: 2000,
              timerProgressBar: true,
              willClose: () => {
                clearInterval(timerInterval);
              },
            }).then((result) => {
              if (result.dismiss === Swal.DismissReason.timer) {
              }
            });  
        },) 
      }
    }
    setTimeout(() => {
      this.tasksForm.reset();
    }, 2000);
    this.submitted = true
  }

  // The master checkbox will check/ uncheck all items
  checkUncheckAll(ev:any) {    
    this.tasks.forEach((x: { state: any; }) => x.state = ev.target.checked)
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

  /**
   * Open Edit modal
   * @param content modal content
   */
   editDataGet(id: any, content:any) {
    this.submitted = false;
    this.modalService.open(content, { size: 'md', centered: true });
    var modelTitle = document.querySelector('.modal-title') as HTMLAreaElement;
    modelTitle.innerHTML = 'Edit Task';
    var updateBtn = document.getElementById('add-btn') as HTMLAreaElement;
    updateBtn.innerHTML = "Update";
    
    this.ApiService.getSingleTaskData(id).subscribe({
      next: data => {    
        const users =  JSON.parse(data);
        this.econtent = users.data; 
        this.tasksForm.controls['project'].setValue(this.econtent.project);
        this.tasksForm.controls['task'].setValue(this.econtent.task);
        this.tasksForm.controls['creater'].setValue(this.econtent.creater);
        this.tasksForm.controls['dueDate'].setValue(this.econtent.dueDate);
        this.tasksForm.controls['status'].setValue(this.econtent.status);
        this.tasksForm.controls['priority'].setValue(this.econtent.priority);
        this.tasksForm.controls['ids'].setValue(this.econtent._id);
      },
      error: err => {
        this.content = JSON.parse(err.error).message;
      }
    });
  }

  /**
   * Delete Swal data
   */
   deleteId: any;
   confirm(content:any,id:any) {
    this.deleteId = id;
    this.modalService.open(content, { centered: true });
  }

  // Delete Data
  deleteData(id:any) {    
    if(id){
      this.ApiService.deleteTask(id).subscribe({
        next: data => { },
        error: err => {
          this.content = JSON.parse(err.error).message;
        }
      });
      document.getElementById('t_'+id)?.remove();
    }
    else{
      this.checkedValGet.forEach((item:any)=>{
        document.getElementById('t_'+ item)?.remove();      
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
       Swal.fire({text:'Please select at least one checkbox',confirmButtonColor: '#239eba',});
     }
     this.checkedValGet = checkedVal;
   }

  onCheckboxChange(e: any) {
    const checkArray: UntypedFormArray = this.tasksForm.get('subItem') as UntypedFormArray;      
    checkArray.push(new UntypedFormControl(e.target.value));
  }

}

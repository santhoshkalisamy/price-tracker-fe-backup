export interface Country {
  taskId: string;
  project: string;
  task: string;
  creater: string;
  dueDate: string;
  status: string;
  statusClass: string;
  priority: string;
  priorityClass: string;
  subItem: string;
  isSelected?:any;
}


export interface Assigned {
  id: any;
  imgId: any;
  img: any;
  name: any;
}

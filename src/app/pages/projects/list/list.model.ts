export interface projectListModel {
  time?: string;
  img?: string;
  label?: string;
  caption?: string;
  number?: string;
  progressBar?: any;
  date?: string;
  users: Array<{
    name?: string;
    text?: string;
    profile?: string;
    variant?: string;
  }>;
}

export interface projectListModel1 {
  label?: string;
  status?: string;
  statusClass?: string;
  deadline?: string;
  bg_color?: string;
  progressBar?: any;
  users: Array<{
    name?: string;
    text?: string;
    profile?: string;
    variant?: string;
  }>;
}

export interface projectListModel2 {
  img?: string;
  label?: string;
  status?: string;
  statusClass?: string;
  deadline?: string;
  bg_color?: string;
  progressBar?: any;
  number?: any;
  users: Array<{
    name?: string;
    text?: string;
    profile?: string;
    variant?: string;
  }>;
}

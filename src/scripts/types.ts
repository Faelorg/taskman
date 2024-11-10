export interface IToken {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface IResponse {
  code: string;
  object: any;
}

export interface ICompany {
  id_company: string;
  name: string;
  maincolor: string;
  additionalcolor: string;
  panelcolor: string;
  selectedbuttoncolor: string;
  outlinecolor: string;
  truebuttoncolor: string;
  cancelbuttoncolor: string;
  fontcolor: string;
  additionalfontcolor: string;
  mainpage: string;
  codetask: string;
  smtpsender: string;
  smtpprovider: string;
  smtpserver: string;
  smtpport: string;
  smtplogin: string;
  smtppassword: string;
}

export interface IUser {
  id_user: string;
  login: string;
  firstname: string | null;
  lastname: string | null;
  middlename: string | null;
  email: string;
  is_admin: number;
  id_company: string;
}

export interface IProject {
  id_project: string;
  name: string;
  description: string;
  id_status: string;
}

export interface IRole {
  id_role: string;
  name: string;
  description: string;
  close_project: boolean;
  update_project: boolean;
  create_column: boolean;
  update_column: boolean;
  delete_column: boolean;
  create_task: boolean;
  update_task: boolean;
  delete_task: boolean;
  id_project: string;
}

export interface IColumn {
  id_column: string;
  name: string;
  description: string;
  color: string;
  id_project: string;
}

export interface ITask {
  id_task: string;
  name: string;
  description: string;
  code: string;
  id_column: string;
  id_user: string;
  status: number;
}

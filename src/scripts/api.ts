import {
  IColumn,
  ICompany,
  IProject,
  IResponse,
  IRole,
  ITask,
  IToken,
  IUser,
} from "./types";

const host = "http://127.0.0.1:8000/api";
let headersList = {
  Accept: "*/*",
  Authorization: "Bearer ",
  "Content-Type": "application/json",
};

const loginAPI = async (
  email: string,
  password: string,
  login?: string
): Promise<IResponse> => {
  let response = await fetch(`${host}/auth/login`, {
    method: "POST",
    body: JSON.stringify({ email: email, login: login, password: password }),
    headers: headersList,
  });

  let token: IToken = await response.json();

  return { code: response.status.toString(), object: token.access_token };
};

const logoutAPI = async (token: string) => {
  headersList.Authorization += token;

  let response = await fetch(`${host}/auth/logout`, {
    headers: headersList,
  });
};

const getProfileAPI = async (token: string) => {
  headersList.Authorization = `Bearer ${token}`;
  let response = await fetch(`${host}/auth/profile`, {
    headers: headersList,
  });

  let user: IUser = await response.json();

  return { code: response.status.toString(), object: user };
};

const restoreAPI = (email: string) => {
  fetch(`${host}/auth/restore`, {
    method: "POST",
    body: JSON.stringify({ email: email }),
    headers: headersList,
  });
};

const resetPasswordAPI = async (password: string, id_reset: string) => {
  let res = await fetch(`${host}/auth/reset`, {
    method: "POST",
    body: JSON.stringify({ password: password, id_reset: id_reset }),
    headers: headersList,
  });

  return { code: res.status.toString(), object: res.statusText };
};

const getCompanyAPI = async (token: string) => {
  headersList.Authorization = `Bearer ${token}`;

  let response = await fetch(`${host}/auth/company`, {
    headers: headersList,
  });

  let company: ICompany = await response.json();

  return { code: response.status.toString(), object: company };
};

const registerAPI = async (
  login: string,
  password: string,
  firstname: string,
  lastname: string,
  middlename: string,
  id_invite: string
) => {
  let response = await fetch(`${host}/auth/reg`, {
    method: "POST",
    body: JSON.stringify({
      login: login,
      password: password,
      firstname: firstname,
      lastname: lastname,
      middlename: middlename,
      id_invite: id_invite,
    }),
    headers: headersList,
  });

  let token: IToken = await response.json();
  return { code: response.status.toString(), object: token.access_token };
};

const createCompanyAPI = async (company: any) => {
  let res = await fetch(`${host}/company/create`, {
    method: "POST",
    body: JSON.stringify({
      name: company.name,
      maincolor: company.maincolor,
      additionalcolor: company.additionalcolor,
      panelcolor: company.panelcolor,
      outlinecolor: company.outlinecolor,
      truebuttoncolor: company.truebuttoncolor,
      cancelbuttoncolor: company.cancelbuttoncolor,
      selectedbuttoncolor: company.selectedbuttoncolor,
      fontcolor: company.fontcolor,
      additionalfontcolor: company.additionalfontcolor,
      codetask: company.codetask,
      smtpsender: company.smtpsender,
      smtpserver: company.smtpserver,
      smtpport: company.smtpport,
      smtppassword: company.smtppassword,
    }),
    headers: headersList,
  });
  return { code: res.status.toString(), object: res.statusText };
};

const inviteUserAPI = async (email: string, token: string) => {
  headersList.Authorization = `Bearer ${token}`;

  let res = await fetch(`${host}/auth/invite`, {
    method: "POST",
    body: JSON.stringify({ email: email }),
    headers: headersList,
  });

  return { code: res.status.toString(), object: res.statusText };
};

const getAllUserAPI = async (token: string) => {
  headersList.Authorization = `Bearer ${token}`;

  let res = await fetch(`${host}/user/all`, {
    headers: headersList,
  });

  let user: IUser[] = await res.json();

  return { code: res.status.toString(), object: user };
};

const getUserByIdAPI = async (token: string, idUser: string) => {
  headersList.Authorization = `Bearer ${token}`;
  let res = await fetch(`${host}/user/${idUser}`, {
    headers: headersList,
  });

  let user: IUser = await res.json();

  return { code: res.status.toString(), object: user };
};

const updateUserAPI = async (token: string, idUser: string, user: IUser) => {
  headersList.Authorization = `Bearer ${token}`;
  let res = await fetch(`${host}/user/${idUser}/put`, {
    headers: headersList,
    method: "PUT",
    body: JSON.stringify(user),
  });

  return { code: res.status.toString(), object: res.statusText };
};

const removeUsersAPI = async (token: string, ids: string[]) => {
  headersList.Authorization = `Bearer ${token}`;
  let res = await fetch(`${host}/user/remove`, {
    headers: headersList,
    method: "POST",
    body: JSON.stringify({ ids: ids }),
  });
  return { code: res.status.toString(), object: res.statusText };
};

const updateCompanyAPI = async (token: string, company: ICompany) => {
  headersList.Authorization = `Bearer ${token}`;
  let res = await fetch(`${host}/company/put`, {
    headers: headersList,
    method: "PUT",
    body: JSON.stringify(company),
  });

  return { code: res.status.toString(), object: res.statusText };
};

const createProjectAPI = async (
  token: string,
  id_company: string,
  project: IProject
) => {
  headersList.Authorization = `Bearer ${token}`;
  let res = await fetch(`${host}/company/${id_company}/projects/create`, {
    headers: headersList,
    method: "POST",
    body: JSON.stringify(project),
  });

  return { code: res.status.toString(), object: res.statusText };
};

const getAllProjectAPI = async (token: string, id_company: string) => {
  headersList.Authorization = `Bearer ${token}`;
  let res = await fetch(`${host}/company/${id_company}/projects`, {
    headers: headersList,
    method: "GET",
  });

  return {
    code: res.status.toString(),
    object: (await res.json()) as IProject[],
  };
};

const getProjectAPI = async (
  token: string,
  id_company: string,
  id_project: string
) => {
  headersList.Authorization = `Bearer ${token}`;
  let res = await fetch(
    `${host}/company/${id_company}/projects/${id_project}`,
    {
      headers: headersList,
      method: "GET",
    }
  );

  return {
    code: res.status.toString(),
    object: (await res.json()) as IProject,
  };
};

const updateProjectAPI = async (
  token: string,
  id_company: string,
  id_project: string,
  project: IProject
) => {
  headersList.Authorization = `Bearer ${token}`;
  let res = await fetch(
    `${host}/company/${id_company}/projects/${id_project}`,
    {
      headers: headersList,
      method: "PUT",
      body: JSON.stringify(project),
    }
  );

  return {
    code: res.status.toString(),
    object: (await res.json()) as IProject,
  };
};

const createRoleAPI = async (
  token: string,
  id_company: string,
  id_project: string,
  role: IRole
) => {
  headersList.Authorization = `Bearer ${token}`;
  let res = await fetch(
    `${host}/company/${id_company}/projects/${id_project}/roles/create`,
    {
      headers: headersList,
      method: "POST",
      body: JSON.stringify(role),
    }
  );

  return { code: res.status.toString(), object: res.statusText };
};

const getAllRoleAPI = async (
  token: string,
  id_company: string,
  id_project: string
) => {
  headersList.Authorization = `Bearer ${token}`;
  let res = await fetch(
    `${host}/company/${id_company}/projects/${id_project}/roles`,
    {
      headers: headersList,
      method: "GET",
    }
  );

  return {
    code: res.status.toString(),
    object: (await res.json()) as IRole[],
  };
};

const getRoleAPI = async (
  token: string,
  id_company: string,
  id_project: string,
  id_role: string
) => {
  headersList.Authorization = `Bearer ${token}`;
  let res = await fetch(
    `${host}/company/${id_company}/projects/${id_project}/roles/${id_role}`,
    {
      headers: headersList,
      method: "GET",
    }
  );

  return {
    code: res.status.toString(),
    object: (await res.json()) as IRole,
  };
};

const updateRoleAPI = async (
  token: string,
  id_company: string,
  id_project: string,
  id_role: string,
  role: IRole
) => {
  headersList.Authorization = `Bearer ${token}`;
  let res = await fetch(
    `${host}/company/${id_company}/projects/${id_project}/roles/${id_role}`,
    {
      headers: headersList,
      method: "PUT",
      body: JSON.stringify(role),
    }
  );

  return {
    code: res.status.toString(),
    object: (await res.json()) as IProject,
  };
};

const removeRoleAPI = async (
  token: string,
  id_company: string,
  id_project: string,
  id_role: string
) => {
  headersList.Authorization = `Bearer ${token}`;
  let res = await fetch(
    `${host}/company/${id_company}/projects/${id_project}/roles/${id_role}`,
    {
      headers: headersList,
      method: "DELETE",
    }
  );

  return {
    code: res.status.toString(),
    object: {},
  };
};

const getAllUserFromRoleAPI = async (
  token: string,
  id_company: string,
  id_project: string,
  id_role: string
) => {
  headersList.Authorization = `Bearer ${token}`;
  let res = await fetch(
    `${host}/company/${id_company}/projects/${id_project}/roles/${id_role}/users`,
    {
      headers: headersList,
      method: "GET",
    }
  );

  return {
    code: res.status.toString(),
    object: (await res.json()) as IUser[],
  };
};

const setUserToRoleAPI = async (
  token: string,
  id_company: string,
  id_project: string,
  id_role: string,
  id_user: string
) => {
  headersList.Authorization = `Bearer ${token}`;
  let res = await fetch(
    `${host}/company/${id_company}/projects/${id_project}/roles/${id_role}/users/set`,
    {
      headers: headersList,
      method: "POST",
      body: JSON.stringify({ id_user: id_user }),
    }
  );

  return {
    code: res.status.toString(),
    object: {},
  };
};

const removeUserFromRoleAPI = async (
  token: string,
  id_company: string,
  id_project: string,
  id_role: string,
  id_user: string
) => {
  headersList.Authorization = `Bearer ${token}`;
  let res = await fetch(
    `${host}/company/${id_company}/projects/${id_project}/roles/${id_role}/users/remove`,
    {
      headers: headersList,
      method: "POST",
      body: JSON.stringify({ id_user: id_user }),
    }
  );

  return {
    code: res.status.toString(),
    object: {},
  };
};

const getAllColumnsAPI = async (
  token: string,
  id_company: string,
  id_project: string
) => {
  headersList.Authorization = `Bearer ${token}`;
  let res = await fetch(
    `${host}/company/${id_company}/projects/${id_project}/columns`,
    {
      headers: headersList,
      method: "GET",
    }
  );

  return {
    code: res.status.toString(),
    object: (await res.json()) as IColumn[],
  };
};

const getByIdColumnsAPI = async (
  token: string,
  id_company: string,
  id_project: string,
  id_column: string
) => {
  headersList.Authorization = `Bearer ${token}`;
  let res = await fetch(
    `${host}/company/${id_company}/projects/${id_project}/columns/${id_column}`,
    {
      headers: headersList,
      method: "GET",
    }
  );

  return {
    code: res.status.toString(),
    object: (await res.json()) as IColumn,
  };
};

const createColumnAPI = async (
  token: string,
  id_company: string,
  id_project: string,
  column: IColumn
) => {
  headersList.Authorization = `Bearer ${token}`;
  let res = await fetch(
    `${host}/company/${id_company}/projects/${id_project}/columns/create`,
    {
      headers: headersList,
      method: "POST",
      body: JSON.stringify(column),
    }
  );

  return {
    code: res.status.toString(),
    object: {},
  };
};

const updateColumnAPI = async (
  token: string,
  id_company: string,
  id_project: string,
  column: IColumn
) => {
  let res = await fetch(
    `${host}/company/${id_company}/projects/${id_project}/columns/${column.id_column}`,
    {
      headers: headersList,
      method: "PUT",
      body: JSON.stringify(column),
    }
  );

  return {
    code: res.status.toString(),
    object: {},
  };
};

const deleteColumnsAPI = async (
  token: string,
  id_company: string,
  id_project: string,
  id_column: string
) => {
  headersList.Authorization = `Bearer ${token}`;
  let res = await fetch(
    `${host}/company/${id_company}/projects/${id_project}/columns/${id_column}`,
    {
      headers: headersList,
      method: "DELETE",
    }
  );

  return {
    code: res.status.toString(),
    object: (await res.json()) as IColumn[],
  };
};

const getRoleFromUserAPI = async (
  token: string,
  id_company: string,
  id_project: string
) => {
  headersList.Authorization = `Bearer ${token}`;
  let res = await fetch(
    `${host}/company/${id_company}/projects/${id_project}/user/roles`,
    {
      headers: headersList,
      method: "GET",
    }
  );

  return {
    code: res.status.toString(),
    object: (await res.json()) as IRole,
  };
};

const getAllTaskAPI = async (
  token: string,
  id_company: string,
  id_project: string,
  id_column: string
) => {
  headersList.Authorization = `Bearer ${token}`;
  let res = await fetch(
    `${host}/company/${id_company}/projects/${id_project}/columns/${id_column}/tasks`,
    {
      headers: headersList,
      method: "GET",
    }
  );

  return {
    code: res.status.toString(),
    object: (await res.json()) as ITask[],
  };
};

const createTaskAPI = async (
  token: string,
  id_company: string,
  id_project: string,
  id_column: string,
  task: ITask
) => {
  headersList.Authorization = `Bearer ${token}`;
  let res = await fetch(
    `${host}/company/${id_company}/projects/${id_project}/columns/${id_column}/tasks`,
    {
      headers: headersList,
      method: "POST",
      body: JSON.stringify(task),
    }
  );

  return {
    code: res.status.toString(),
    object: {},
  };
};

const getTaskByIdAPI = async (
  token: string,
  id_company: string,
  id_project: string,
  id_column: string,
  id_task: string
) => {
  headersList.Authorization = `Bearer ${token}`;
  let res = await fetch(
    `${host}/company/${id_company}/projects/${id_project}/columns/${id_column}/tasks/${id_task}`,
    {
      headers: headersList,
      method: "GET",
    }
  );

  return {
    code: res.status.toString(),
    object: (await res.json()) as ITask,
  };
};

const updateTaskAPI = async (
  token: string,
  id_company: string,
  id_project: string,
  id_column: string,
  id_task: string,
  task: ITask
) => {
  headersList.Authorization = `Bearer ${token}`;
  let res = await fetch(
    `${host}/company/${id_company}/projects/${id_project}/columns/${id_column}/tasks/${id_task}`,
    {
      headers: headersList,
      method: "PUT",
      body: JSON.stringify(task),
    }
  );

  return {
    code: res.status.toString(),
    object: {},
  };
};

export {
  loginAPI,
  restoreAPI,
  getCompanyAPI,
  getProfileAPI,
  logoutAPI,
  registerAPI,
  createCompanyAPI,
  resetPasswordAPI,
  inviteUserAPI,
  getAllUserAPI,
  getUserByIdAPI,
  updateUserAPI,
  removeUsersAPI,
  updateCompanyAPI,
  createProjectAPI,
  getAllProjectAPI,
  getProjectAPI,
  updateProjectAPI,
  getAllRoleAPI,
  createRoleAPI,
  getRoleAPI,
  removeRoleAPI,
  getAllUserFromRoleAPI,
  setUserToRoleAPI,
  removeUserFromRoleAPI,
  updateRoleAPI,
  getAllColumnsAPI,
  getByIdColumnsAPI,
  createColumnAPI,
  updateColumnAPI,
  deleteColumnsAPI,
  getRoleFromUserAPI,
  getAllTaskAPI,
  createTaskAPI,
  getTaskByIdAPI,
  updateTaskAPI,
};

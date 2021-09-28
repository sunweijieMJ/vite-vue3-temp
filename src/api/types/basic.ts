import { CommonPageList } from './index';

export interface AuthLogin {
  account: string;
  password: string;
  captchaCode: string;
  captchaCodeToken: string;
}

export interface ModifyPass {
  password: string;
  newPassword: string;
}

export interface TaskList extends CommonPageList {
  queryParam?: {
    taskName?: string;
    taskStatus?: string;
    createTimeStart?: string;
    createTimeEnd?: string;
  };
}

export interface TaskDetailList extends CommonPageList {
  queryParam?: {
    taskCode?: string;
    resultEnum?: string;
  };
}

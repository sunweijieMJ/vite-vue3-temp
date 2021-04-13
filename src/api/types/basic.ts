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

export interface TaskList {
    queryParam?: {
        taskName?: string;
        taskStatus?: string;
        createTimeStart?: string;
        createTimeEnd?: string;
    };
    pageNum?: number;
    pageSize?: number;
    pageRemark?: string;
    sortBy?: string;
}

export interface TaskDetailList {
    queryParam?: {
        taskCode?: string;
        resultEnum?: string;
    };
    pageNum?: number;
    pageSize?: number;
    pageRemark?: string;
    sortBy?: string;
}

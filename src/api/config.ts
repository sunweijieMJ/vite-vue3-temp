/**
 * API 相关配置文件
 * API URL Dict api 字典
 */

const urlDict: Record<string, Record<string, string>> = {
    Basic: {
        AuthLogin: 'userDomain/admin/v1/user/login', // 登录
        AuthLoginOut: 'userDomain/admin/v1/user/logout', // 登出
        ModifyPass: 'userDomain/admin/v1/user/changePassword', // 修改密码
        UserInfo: 'userDomain/admin/v1/user/profile', // 用户信息
        GraphicCode: 'userDomain/admin/v1/user/captcha', // 图形验证码
        MenuList: 'userDomain/admin/v1/resource/findMenus', // 菜单
        MemberSystem: 'userDomain/admin/v1/user/getUserMemberSystem ', // 获取会员体系选项
        GetDict: 'oms/admin/v1/masterData/getDict', // 获取数据字典
        TaskList: 'taskDomain/admin/v1/taskJob/getTaskJobPageList', // 查询所有任务Job带有分页列表
        TaskDetailList: 'taskDomain/admin/v1/taskJob/getTaskDetailList' // 查询所有任务Job详情带有分页列表
    }
};

const getUrl = (biz: string, UrlName: string): string => {
    try {
        const bizKeys = Object.keys(urlDict);
        if (bizKeys.indexOf(biz) < 0) {
            throw new Error('biz not in Dict');
        }
        let hostname = urlDict[biz][UrlName];
        if (!hostname) {
            throw new Error('url not in Dict');
        }
        if (hostname?.startsWith('/')) {
            hostname = hostname.substr(1);
        }
        return hostname;
    } catch (err) {
        console.error(err);
        return '';
    }
};

export default getUrl;

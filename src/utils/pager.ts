/**
 * 使用rxjs解决应用间通信问题
 * @date 2020-8-5
 */
import { Subject } from 'rxjs';
import { setPageTitle } from '@/utils/tools';
import store from '@/store';

const pager = new Subject();

// 全局监听子应用消息
pager.subscribe((v: any) => {
    switch (v.name) {
        // 设置页面标题
        case 'routeChange':
            document.title = setPageTitle(v.to.meta.title);
            // 判断是会员中心模块则展示会员体系选择器
            store.commit('basic/SET_DISPLAY_MEMBER_SYSTEM', v.to.path.includes('crm'));
            if (store.state.basic.displayCurMemberSystem && store.state.basic.memberSystemOptions.length === 0) {
                store.dispatch('basic/getMemberSystemOptions');
            }
            break;
        default:
            break;
    }
});

export default pager;

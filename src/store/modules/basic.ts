import { Commit } from 'vuex';
import { basicApi } from '@/api';
import { CustomResponse } from '@/api/types';
import { PopupType, CurMenuType, UserInfoType, TagView, BasicState, MemberSystemOptionType } from '../types';
import { RouteRecordNormalized } from 'vue-router';

export default {
    namespaced: true,
    actions: {
        // 激活异常弹窗
        activeErrorPage({ commit }: { commit: Commit }, data: PopupType): void {
            commit('ACTIVE_ERROR_PAGE', data);
        },
        // 获取用户信息
        async getUserInfo({ commit }: { commit: Commit }): Promise<void> {
            basicApi.getUserInfo().then(res => {
                if (res.status) {
                    commit('USER_INFO', res.data);
                }
            });
        },
        // 获取菜单列表
        async getMenuList(): Promise<CustomResponse> {
            return await basicApi.getMenuList();
        },
        // 切换一级菜单
        switchFirstMenu({ commit }: { commit: Commit }, data: CurMenuType): void {
            commit('FIRST_MENU', data);
        },
        // 切换二级菜单
        switchSecondMenu({ commit }: { commit: Commit }, data: CurMenuType): void {
            commit('SECOND_MENU', data);
        },
        // 切换三级菜单
        switchThirdMenu({ commit }: { commit: Commit }, data: CurMenuType): void {
            commit('THIRD_MENU', data);
        },
        // 修改密码弹窗
        toggleModifyPass({ commit }: { commit: Commit }, data: PopupType): void {
            commit('TOGGLE_MODIFY_PASS', data);
        },
        // 切换语言
        toggleLanguage({ commit }: { commit: Commit }, data: string): void {
            commit('TOGGLE_LANGUAGE', data);
        },
        // 菜单展开收起
        toggleMenuCollapse({ commit }: { commit: Commit }, data: boolean): void {
            commit('TOGGLE_MENU_COLLAPSE', data);
        },
        // 保存路由
        setRoutes({ commit }: { commit: Commit }, routes: Array<RouteRecordNormalized>): void {
            commit('SAVE_ROUTES', routes);
        },
        // 添加缓存标签和缓存页面
        addView({ commit }: { commit: Commit }, view: TagView): void {
            commit('ADD_VISITED_VIEW', view);
            commit('ADD_CACHED_VIEW', view);
        },
        // 添加缓存标签
        addVisitedView({ commit }: { commit: Commit }, view: TagView): void {
            commit('ADD_VISITED_VIEW', view);
        },
        // 删除缓存标签和缓存页面
        delView({ commit }: { commit: Commit }, view: TagView): void {
            commit('DEL_VISITED_VIEW', view);
            commit('DEL_CACHED_VIEW', view);
        },
        // 删除缓存页面
        delCachedView({ commit }: { commit: Commit }, view: TagView): void {
            commit('DEL_CACHED_VIEW', view);
        },
        // 删除其他缓存标签和缓存页面
        delOthersViews({ commit }: { commit: Commit }, view: TagView): void {
            commit('DEL_OTHERS_VISITED_VIEWS', view);
            commit('DEL_OTHERS_CACHED_VIEWS', view);
        },
        // 删除所有缓存标签和缓存页面
        delAllViews({ commit }: { commit: Commit }): void {
            commit('DEL_ALL_VISITED_VIEWS');
            commit('DEL_ALL_CACHED_VIEWS');
        },
        // 删除所有缓存页面
        delAllCachedViews({ commit }: { commit: Commit }): void {
            commit('DEL_ALL_CACHED_VIEWS');
        },
        // 更新当前激活的缓存标签
        updateVisitedView({ commit }: { commit: Commit }, view: TagView): void {
            commit('UPDATE_VISITED_VIEW', view);
        },
        // 设置任务中心状态
        setTaskDotStatus({ commit }: { commit: Commit }, data: boolean): void {
            commit('SET_TASK_DOT_STATUS', data);
        },
        // 获取会员体系选项
        async getMemberSystemOptions({ commit }: { commit: Commit }): Promise<void> {
            basicApi.getMemberSystem().then(res => {
                if (res.status) {
                    commit('SET_MEMBER_SYSTEM_OPTIONS', res.data);
                    commit('SET_MEMBER_SYSTEM', res.data[0]);
                }
            });
        }
    },
    mutations: {
        ACTIVE_ERROR_PAGE(state: BasicState, res: PopupType): void {
            state.errorPage = res;
        },
        USER_INFO(state: BasicState, userInfo: UserInfoType): void {
            state.userInfo = userInfo;
        },
        MENU_LIST(state: BasicState, res: Array<CurMenuType>): void {
            state.menuList = res;
        },
        FIRST_MENU(state: BasicState, data: CurMenuType): void {
            state.firstMenu = data;
        },
        SECOND_MENU(state: BasicState, data: CurMenuType): void {
            state.secondMenu = data;
        },
        THIRD_MENU(state: BasicState, data: CurMenuType): void {
            state.thirdMenu = data;
        },
        TOGGLE_MODIFY_PASS(state: BasicState, data: PopupType): void {
            state.modifyPass = data;
        },
        TOGGLE_LANGUAGE(state: BasicState, data: string): void {
            state.language = data;
        },
        TOGGLE_MENU_COLLAPSE(state: BasicState, data: boolean): void {
            state.menuCollapse = data;
        },
        // 保存路由
        SAVE_ROUTES(state: BasicState, routes: Array<RouteRecordNormalized>): void {
            state.routes = routes.concat(routes);
        },
        // 添加缓存标签
        ADD_VISITED_VIEW(state: BasicState, view: TagView): void {
            // 判断是否标签是否已存在
            if (state.visitedViews.some(item => item.fullPath === view.fullPath)) return;

            let title = view.meta.title || 'no-name';
            if (view?.query?.id) {
                title = title + view.query.id;
            }
            state.visitedViews.push(Object.assign({}, view, {
                title
            }));
        },
        // 添加缓存页面
        ADD_CACHED_VIEW(state: BasicState, view: TagView): void {
            // 已存在页面return
            const name = view.meta?.cacheName || view.name;
            if (name === null || state.cachedViews.includes(name)) return;
            // 该页面是否静止缓存
            if (view.meta.noCache) {
                if (name === null || state.noCachedViews.includes(name)) return;
                state.noCachedViews.push(name);
            } else {
                if (name === null || state.cachedViews.includes(name)) return;
                state.cachedViews.push(name);
            }
        },
        // 删除缓存标签
        DEL_VISITED_VIEW(state: BasicState, view: TagView): void {
            for (const [i, v] of state.visitedViews.entries()) {
                if (v.fullPath === view.fullPath) {
                    state.visitedViews.splice(i, 1);
                    break;
                }
            }
        },
        // 删除缓存页面
        DEL_CACHED_VIEW(state: BasicState, view: TagView): void {
            const name = view.meta?.cacheName || view.name;
            if (name === null) return;
            const index = state.cachedViews.indexOf(name);
            index > -1 && state.cachedViews.splice(index, 1);
        },
        // 删除其他缓存标签
        DEL_OTHERS_VISITED_VIEWS(state: BasicState, view: TagView): void {
            // 过滤不能关闭的页面和自身
            state.visitedViews = state.visitedViews.filter(item => {
                return item.meta.affix || item.fullPath === view.fullPath;
            });
        },
        // 删除其他缓存页面
        DEL_OTHERS_CACHED_VIEWS(state: BasicState, view: TagView): void {
            const name = view.meta?.cacheName || view.name;
            if (name === null) return;
            const index = state.cachedViews.indexOf(name);
            if (index > -1) {
                state.cachedViews = state.cachedViews.slice(index, index + 1);
            } else {
                // if index = -1, there is no cached tags
                state.cachedViews = [];
            }
        },
        // 删除所有缓存标签
        DEL_ALL_VISITED_VIEWS(state: BasicState): void {
            // 过滤不能关闭的标签
            const affixTags = state.visitedViews.filter(tag => tag.meta.affix);
            state.visitedViews = affixTags;
        },
        // 删除所有缓存页面
        DEL_ALL_CACHED_VIEWS(state: BasicState): void {
            state.cachedViews = [];
        },
        // 更新当前激活的缓存标签
        UPDATE_VISITED_VIEW(state: BasicState, view: TagView): void {
            for (let v of state.visitedViews) {
                if (v.fullPath === view.fullPath) {
                    v = Object.assign(v, view);
                    break;
                }
            }
        },
        // 设置任务中心状态
        SET_TASK_DOT_STATUS(state: BasicState, data: boolean): void {
            state.taskDotStatus = data;
        },
        // 设置会员体系选项
        SET_MEMBER_SYSTEM_OPTIONS(state: BasicState, data: Array<MemberSystemOptionType>): void {
            state.memberSystemOptions = data;
        },

        // 设置当前会员体系
        SET_MEMBER_SYSTEM(state: BasicState, data: MemberSystemOptionType): void {
            state.curMemberSystem = data;
        },
        // 设置是否展示会员体系
        SET_DISPLAY_MEMBER_SYSTEM(state: BasicState, data: boolean): void {
            state.displayCurMemberSystem = data;
        }
    },
    state: (): BasicState => ({
        errorPage: {
            status: false
        },
        userInfo: {},
        menuList: [],
        firstMenu: {
            iconCode: '',
            name: '',
            title: '',
            routeName: '',
            routePath: '',
            children: []
        },
        secondMenu: {
            iconCode: '',
            name: '',
            title: '',
            routeName: '',
            routePath: '',
            children: []
        },
        thirdMenu: {
            iconCode: '',
            name: '',
            title: '',
            routeName: '',
            routePath: '',
            children: []
        },
        modifyPass: {
            status: false
        },
        language: 'zh-CN',
        menuCollapse: false,
        routes: [], // 路由数组
        visitedViews: [], // 缓存的标签
        noCachedViews: [], // 禁止缓存的标签
        cachedViews: [], // 缓存的页面
        taskDotStatus: false, // 任务中心状态
        memberSystemOptions: [], // 会员体系选项
        curMemberSystem: {}, // 当前会员体系
        displayCurMemberSystem: false // 是否展示会员体系
    })
};

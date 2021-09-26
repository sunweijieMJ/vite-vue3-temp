import { Commit } from 'vuex';
import { basicApi } from '@/api';
import { CustomResponse } from '@/api/types';
import {
    PopupType, CurMenuType, UserInfoType, TagView, BasicState,
} from '../types';

export default {
    namespaced: true,
    actions: {
        // 激活异常弹窗
        activeErrorPage({ commit }: { commit: Commit }, data: PopupType): void {
            commit('ACTIVE_ERROR_PAGE', data);
        },
        // 修改密码弹窗
        toggleModifyPass({ commit }: { commit: Commit}, data: PopupType): void {
            commit('TOGGLE_MODIFY_PASS', data);
        },
        // 切换任务中心状态
        setTaskDotStatus({ commit }: { commit: Commit }, data: boolean): void {
            commit('SET_TASK_DOT_STATUS', data);
        },
        // 切换当前语言
        toggleLanguage({ commit }: { commit: Commit }, data: string): void {
            commit('TOGGLE_LANGUAGE', data);
        },
        // 切换菜单展开收起
        toggleMenuCollapse({ commit }: { commit: Commit}, data: boolean): void {
            commit('TOGGLE_MENU_COLLAPSE', data);
        },
        // 获取用户信息
        async getUserInfo({ commit }: { commit: Commit }): Promise<void> {
            await basicApi.getUserInfo().then((res) => {
                if (res.status) {
                    commit('USER_INFO', res.data);
                }
            });
        },
        // 获取菜单列表
        async getMenuList(): Promise<CustomResponse> {
            const res = await basicApi.getMenuList();
            return res;
        },
        // 收集权限
        collectPermissions({ commit }: { commit: Commit}, data: Map<string, string[]>): void {
            commit('COLLECT_PERMISSION', data);
        },
        /** ************************************************ 多页签控制 ************************************************* */
        // 添加缓存标签
        addVisitedView({ commit }: { commit: Commit }, view: TagView): void {
            commit('ADD_VISITED_VIEW', view);
        },
        // 添加缓存标签和缓存页面
        addView({ commit }: { commit: Commit }, view: TagView): void {
            commit('ADD_VISITED_VIEW', view);
            commit('ADD_CACHED_VIEW', view);
        },
        // 删除缓存标签和缓存页面
        delView({ commit }: { commit: Commit}, view: TagView): void {
            commit('DEL_VISITED_VIEW', view);
            commit('DEL_CACHED_VIEW', view);
        },
        // 删除缓存标签
        delVisitedView({ commit }: { commit: Commit}, view: TagView): void {
            commit('DEL_VISITED_VIEW', view);
        },
        // 删除缓存页面
        delCachedView({ commit }: { commit: Commit}, view: TagView): void {
            commit('DEL_CACHED_VIEW', view);
        },
        // 删除其他缓存标签和缓存页面
        delOthersViews({ commit }: { commit: Commit}, view: TagView): void {
            commit('DEL_OTHERS_VISITED_VIEWS', view);
            commit('DEL_OTHERS_CACHED_VIEWS', view);
        },
        // 删除所有缓存标签
        delAllVisitedViews({ commit }: { commit: Commit}): void {
            commit('DEL_ALL_VISITED_VIEWS');
        },
        // 删除所有缓存页面
        delAllCachedViews({ commit }: { commit: Commit}): void {
            commit('DEL_ALL_CACHED_VIEWS');
        },
        // 删除所有缓存标签和缓存页面
        delAllViews({ commit }: { commit: Commit}): void {
            commit('DEL_ALL_VISITED_VIEWS');
            commit('DEL_ALL_CACHED_VIEWS');
        },
        // 更新当前激活的缓存标签
        updateVisitedView({ commit }: { commit: Commit }, view: TagView): void {
            commit('UPDATE_VISITED_VIEW', view);
        },
        // 替换某个指定的缓存标签
        replaceVisitedView({ commit }: { commit: Commit }, data: {oldView: TagView; newView: TagView}): void {
            commit('REPLACE_VISITED_VIEW', data);
        },
    },
    mutations: {
        // 激活异常弹窗
        ACTIVE_ERROR_PAGE(state: BasicState, res: PopupType): void {
            state.errorPage = res;
        },
        // 修改密码弹窗
        TOGGLE_MODIFY_PASS(state: BasicState, data: PopupType): void {
            state.modifyPass = data;
        },
        // 设置任务中心状态
        SET_TASK_DOT_STATUS(state: BasicState, data: boolean): void {
            state.taskDotStatus = data;
        },
        // 切换当前语言
        TOGGLE_LANGUAGE(state: BasicState, data: string): void {
            state.language = data;
        },
        // 切换菜单展开收起
        TOGGLE_MENU_COLLAPSE(state: BasicState, data: boolean): void {
            state.menuCollapse = data;
        },
        // 获取用户信息
        USER_INFO(state: BasicState, userInfo: UserInfoType): void {
            state.userInfo = userInfo;
        },
        // 菜单列表
        MENU_LIST(state: BasicState, res: Array<CurMenuType>): void {
            state.menuList = res;
        },
        // 收集权限
        COLLECT_PERMISSION(state: BasicState, data: Map<string, string[]>): void {
            state.permissionsMap = data;
        },
        /** ************************************************ 多页签控制 ************************************************* */
        // 添加缓存标签
        ADD_VISITED_VIEW(state: BasicState, view: TagView): void {
            // 判断标签是否已存在
            if (state.visitedViews.some((item) => item.fullPath === view.fullPath)) return;

            const title = view.meta.title || 'no-name';
            state.visitedViews.push({ ...view, title });
        },
        // 添加缓存页面
        ADD_CACHED_VIEW(state: BasicState, view: TagView): void {
            // 已存在页面return
            const name = view.meta?.cacheName || view.name;
            if (!name || state.cachedViews.includes(name)) return;
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
            for (let i = state.visitedViews.length - 1; i >= 0; i--) {
                if (state.visitedViews[i].fullPath === view.fullPath) {
                    state.visitedViews.splice(i, 1);
                    break;
                }
            }
        },
        // 删除缓存页面
        DEL_CACHED_VIEW(state: BasicState, view: TagView): void {
            const name = view.meta?.cacheName || view.name;
            if (!name) return;
            const index = state.cachedViews.indexOf(name);
            if (index > -1) state.cachedViews.splice(index, 1);
        },
        // 删除其他缓存标签
        DEL_OTHERS_VISITED_VIEWS(state: BasicState, view: TagView): void {
            // 过滤不能关闭的页面和自身
            state.visitedViews = state.visitedViews.filter((item) => item.meta.affix || item.fullPath === view.fullPath);
        },
        // 删除其他缓存页面
        DEL_OTHERS_CACHED_VIEWS(state: BasicState, view: TagView): void {
            const name = view.meta?.cacheName || view.name;
            if (!name) return;
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
            const affixTags = state.visitedViews.filter((tag) => tag.meta.affix);
            state.visitedViews = affixTags;
        },
        // 删除所有缓存页面
        DEL_ALL_CACHED_VIEWS(state: BasicState): void {
            state.cachedViews = [];
        },
        // 更新当前激活的缓存标签
        UPDATE_VISITED_VIEW(state: BasicState, view: TagView): void {
            for (let i = state.visitedViews.length - 1; i >= 0; i--) {
                if (state.visitedViews[i].path === view.path) {
                    state.visitedViews[i] = Object.assign(state.visitedViews[i], view);
                    break;
                }
            }
        },
        // 替换某个缓存标签
        REPLACE_VISITED_VIEW(state: BasicState, data: {oldView: TagView; newView: TagView}): void {
            const { newView, oldView } = data;
            for (let i = state.visitedViews.length - 1; i >= 0; i--) {
                if (state.visitedViews[i].fullPath === oldView.fullPath) {
                    state.visitedViews[i] = Object.assign(state.visitedViews[i], newView);
                    break;
                }
            }
        },
    },
    state: (): BasicState => ({
        errorPage: {
            status: false,
        },
        modifyPass: {
            status: false,
        },
        language: 'zh-CN',
        menuCollapse: false,
        taskDotStatus: false,
        userInfo: {},
        menuList: [],
        permissionsMap: new Map(),
        visitedViews: [], // 标签集合
        noCachedViews: [], // 禁止缓存的页面
        cachedViews: [], // 缓存的页面
    }),
};

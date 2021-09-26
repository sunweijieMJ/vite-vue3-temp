import { _RouteLocationBase, RouteMeta } from 'vue-router';

export interface PopupType {
    status: boolean;
    type?: string;
    data?: unknown;
}

export interface CurMenuType {
    tab?: boolean;
    affix?: boolean;
    noCache?: boolean;
    iconCode: string;
    name: string;
    title: string;
    routeName: string;
    routePath: string;
    children: Array<CurMenuType>;
    permissions?: Array<string>;
}

export interface UserInfoType {
    id?: number;
    account?: string;
    accountName?: string;
}

export interface MetaType extends RouteMeta {
    title?: string;
    cacheName?: string;
    noCache?: number;
}

export interface TagView extends Partial<_RouteLocationBase> {
    title?: string;
    name?: string;
    meta: MetaType
}

export interface BasicState {
    errorPage: Partial<PopupType>;
    modifyPass: Partial<PopupType>;
    userInfo: Partial<UserInfoType>;
    menuList: CurMenuType[];
    permissionsMap: Map<string, string[]>;
    language: string;
    menuCollapse: boolean;
    taskDotStatus: boolean;
    visitedViews: TagView[];
    cachedViews: string[];
    noCachedViews: string[];
}

import { RouteRecordNormalized, _RouteLocationBase, RouteMeta } from 'vue-router';

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

export interface MemberSystemOptionType {
    id?: number;
    name?: string;
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
    errorPage: PopupType;
    modifyPass: PopupType;
    userInfo: UserInfoType;
    menuList: Array<CurMenuType>;
    firstMenu: CurMenuType;
    secondMenu: CurMenuType;
    thirdMenu: CurMenuType;
    language: string;
    menuCollapse: boolean;
    routes: Array<RouteRecordNormalized>;
    visitedViews: Array<TagView>;
    cachedViews: Array<(string | undefined)>;
    noCachedViews: Array<(string | undefined)>;
    taskDotStatus: boolean;
    memberSystemOptions: Array<MemberSystemOptionType>;
    curMemberSystem: MemberSystemOptionType;
    displayCurMemberSystem: boolean;
}

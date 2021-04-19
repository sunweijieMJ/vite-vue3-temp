<template>
    <div class="custom-header">
        <h3 class="header-title">
            {{ firstMenu.title }}
            <div v-show="displayCurMemberSystem > 0" class="memerSystem-selection">
                <el-select v-model="curMemberSystemId" :placeholder="$t('baseLayoutHeader.t138')" @change="chooseMemberSystemId">
                    <el-option v-for="item in memberSystemOptions" :key="item.id" :label="item.description" :value="item.id" />
                </el-select>
            </div>
        </h3>
        <div class="menu-container">
            <!-- search -->
            <div v-if="false" class="search" :class="{empty: !keywords}">
                <i class="iconfont iconheader_search" />
                <el-input v-model="keywords" :placeholder="$t('baseLayoutHeader.t139')" />
            </div>
            <!-- user -->
            <div class="user">
                <el-dropdown trigger="click" @command="handleUser">
                    <div class="userinfo">
                        <!-- <custom-image class="avatar" :src="userInfo.imageUrl"></custom-image> -->
                        <svg class="icon" aria-hidden="true" width="30px" height="30px">
                            <use xlink:href="#iconmorentouxiang" />
                        </svg>
                        <p class="name">{{ userInfo.accountName }}</p>
                    </div>
                    <template #dropdown>
                        <el-dropdown-menu class="user-dropdown">
                            <el-dropdown-item command="modify">
                                <svg class="icon" aria-hidden="true" width="18px" height="18px">
                                    <use xlink:href="#iconmodify_pass" />
                                </svg>
                                <span class="text">{{ $t('baseLayoutHeader.t140') }}</span>
                            </el-dropdown-item>
                            <el-dropdown-item command="logout">
                                <svg class="icon" aria-hidden="true" width="18px" height="18px">
                                    <use xlink:href="#iconlog_out" />
                                </svg>
                                <span class="text">{{ $t('baseLayoutHeader.t141') }}</span>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <el-popover v-if="false" placement="bottom" width="400" trigger="click">
                    <div>notice</div>
                    <template #reference>
                        <el-badge :value="2" class="message">
                            <i class="iconfont iconheader_message" />
                        </el-badge>
                    </template>
                </el-popover>
            </div>
            <!-- menu -->
            <el-dropdown trigger="click" placement="bottom" @command="switchMenu">
                <div class="menu">
                    <svg class="icon" aria-hidden="true" width="24px" height="24px">
                        <use :xlink:href="'#' + firstMenu.iconCode + 'd'" />
                    </svg>
                    <h4 class="menu-title">{{ firstMenu.title }}</h4>
                    <div class="menu-dropdown">
                        <i class="iconfont iconheader_menu" />
                    </div>
                </div>
                <template #dropdown>
                    <el-dropdown-menu class="header-dropdown">
                        <el-dropdown-item v-for="(item, index) in menuList" :key="index" :class="{active: item.title === firstMenu.title}" :command="item">
                            <div class="menu-left">
                                <div class="name-box">
                                    <svg v-if="item.title !== firstMenu.title" class="icon" aria-hidden="true" width="24px" height="24px">
                                        <use :xlink:href="'#' + item.iconCode" />
                                    </svg>
                                    <svg v-else class="icon" aria-hidden="true" width="24px" height="24px">
                                        <use :xlink:href="'#' + item.iconCode + 'd'" />
                                    </svg>
                                    <h5 class="name">{{ item.title }}</h5>
                                </div>
                                <i class="iconfont iconarrow_right" />
                            </div>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <!-- task -->
            <el-badge :is-dot="taskDotStatus">
                <el-button class="task-btn" type="info" circle @click="skipTaskList">
                    <svg class="icon" aria-hidden="true" width="18px" height="18px">
                        <use xlink:href="#iconchannel" />
                    </svg>
                </el-button>
            </el-badge>
            <!-- lang -->
            <el-dropdown trigger="click" @command="switchLang">
                <div class="lang">
                    <span class="text">{{ curLang }}</span>
                    <i class="iconfont iconheader_unfold" />
                </div>
                <template #dropdown>
                    <el-dropdown-menu class="lang-dropdown">
                        <el-dropdown-item command="zh-CN">
                            <svg class="default icon" aria-hidden="true" width="20px" height="20px">
                                <use xlink:href="#iconlang_cn" />
                            </svg>
                            <svg class="hover icon" aria-hidden="true" width="20px" height="20px">
                                <use xlink:href="#iconlang_cn_hover" />
                            </svg>
                            <span class="text">{{ $t('baseLayoutHeader.t142') }}</span>
                        </el-dropdown-item>
                        <el-dropdown-item command="en">
                            <svg class="default icon" aria-hidden="true" width="20px" height="20px">
                                <use xlink:href="#iconlang_en" />
                            </svg>
                            <svg class="hover icon" aria-hidden="true" width="20px" height="20px">
                                <use xlink:href="#iconlang_en_hover" />
                            </svg>
                            <span class="text">English</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
        <!-- 弹层 -->
        <task-list ref="taskRef" />
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { TaskList } from '@/views/components';
import storage from '@/utils/storage';
import { CurMenuType } from '@/store/types';
import { basicApi } from '@/api';
import { ElMessage, ElMessageBox } from 'element-plus';


interface MemberSystemOptionType {
    id: number;
    name: string;
}

export default defineComponent({
    name: 'LayoutHeader',
    components: {
        TaskList
    },
    setup() {
        const $i18n = useI18n();
        const $store = useStore();
        const $router = useRouter();
        const taskRef = ref<typeof TaskList|null>(null);

        let keywords = '';
        let curMemberSystemId: number | null = null;

        let curLang = computed(() => {
            const curLocale = $i18n.locale.value;
            $store.dispatch('basic/toggleLanguage', curLocale);
            if (curLocale === 'en') {
                return 'EN';
            } else {
                return 'ZH';
            }
        });

        let userInfo = computed(() => {
            return $store.state.basic.userInfo;
        });

        let menuList = computed(() => {
            return $store.state.basic.menuList;
        });

        let firstMenu = computed(() => {
            return $store.state.basic.firstMenu;
        });

        let taskDotStatus = computed(() => {
            return $store.state.basic.taskDotStatus;
        });

        let memberSystemOptions = computed(() => {
            return $store.state.basic.memberSystemOptions;
        });

        let curMemberSystem = computed(() => {
            return $store.state.basic.curMemberSystem;
        });

        let displayCurMemberSystem = computed(() => {
            return $store.state.basic.displayCurMemberSystem;
        });

        watch(curMemberSystem, (value: MemberSystemOptionType) => {
            curMemberSystemId = value.id;
        }, { immediate: true, deep: true });

        const chooseMemberSystemId = (value: number |string) => {
            const option = memberSystemOptions.value.find((v: { id: string|number }) => v.id === value);
            $store.commit('basic/SET_MEMBER_SYSTEM', option);
        };

        // 菜单切换
        const switchMenu = (command: CurMenuType) => {
            $router.push({ path: command.routePath });
        };

        // 语言切换
        const switchLang = (command: string) => {
            $i18n.locale.value = command;
            storage('localstorage').set('i18n', command);
        };

        // 打开任务中心
        const skipTaskList = () => {
            $store.dispatch('basic/setTaskDotStatus', false);
            taskRef.value?.show();
        };

        const handleUser = (command: string) => {
            switch (command) {
                case 'modify':
                    $store.dispatch('basic/toggleModifyPass', { status: true, type: 'modify' });
                    break;
                case 'logout':
                    ElMessageBox.confirm(`${$i18n.t('baseLayoutHeader.t143')}` + '?', `${$i18n.t('baseLayoutHeader.t101')}`, {
                        confirmButtonText: `${$i18n.t('baseLayoutHeader.t102')}`,
                        cancelButtonText: `${$i18n.t('baseLayoutHeader.t126')}`,
                        type: 'warning'
                    }).then(() => {
                        basicApi.authLoginOut().then(res => {
                            if (res.status) {
                                if (res.data) {
                                    storage().remove('token');
                                    storage('localstorage').remove('token');
                                    storage('localstorage').remove('vuex');
                                    window.location.href = '/login';
                                } else {
                                    ElMessage({ type: 'error', message: `${$i18n.t('baseLayoutHeader.t144')}` });
                                }
                            }
                        });
                    });
                    break;
                default:
                    break;
            }
        };

        return {
            taskRef, keywords, curMemberSystemId, curLang, userInfo, menuList, firstMenu, taskDotStatus,
            memberSystemOptions, displayCurMemberSystem, chooseMemberSystemId,
            switchLang, switchMenu, skipTaskList, handleUser
        };
    }
});
</script>
<style lang="scss">
    .memerSystem-selection {
        margin-left:20px;
        position: absolute;
        top: -8px;
        left: 103px;
        width: 173px;
        .el-input__inner {
            height: 31px;
        }
    }
</style>
<style lang="scss" scoped>
    .custom-header {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 50px;
        padding: 0 30px;
        background-color: #fff;
        border-bottom: 1px solid #e8e8e8;
        .header-title {
            font-size: 24px;
            font-weight: 400;
            line-height: 1;
            color: #222530;
            position: relative;
            .memerSystem-selection {
                margin-left:20px;
                position: absolute;
                top: -3px;
                left: 103px;
                width: 173px;
            }
        }
        .menu-container {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            height: inherit;
            .search {
                display: flex;
                align-items: center;
                width: 333px;
                &.empty {
                    width: 54px;
                    .el-input {
                        display: none;
                    }
                }
                &:hover {
                    width: 333px;
                    .el-input {
                        display: block;
                    }
                }
                transition: 0.3s width;
                height: inherit;
                border-right: 1px solid #E8E9EA;
                .iconfont {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 54px;
                    height: inherit;
                    font-size: 18px;
                    color: #5755b3;
                    cursor: pointer;
                }
                .el-input {
                    flex: 1;
                    padding-right: 20px;
                }
            }
            .user {
                display: flex;
                align-items: center;
                .userinfo {
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    .avatar {
                        width: 36px;
                        height: 36px;
                        border-radius: 50%;
                        overflow: hidden;
                    }
                    .name {
                        margin-left: 15px;
                        font-size: 14px;
                        line-height: 1;
                        color: #222530;
                    }
                }
                .message {
                    box-sizing: border-box;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 36px;
                    height: 36px;
                    margin-left: 26px;
                    box-shadow: 0px 7px 9px -4px rgba(88,67,190,0.29);
                    border-radius: 50%;
                    border: 1px solid #E8E9EA;
                    cursor: pointer;
                    .iconfont {
                        font-size: 18px;
                        color: #E8E9EA;
                    }
                }
            }
            .menu {
                display: flex;
                align-items: center;
                min-width: 140px;
                height: 36px;
                padding: 0 7px;
                margin-left: 20px;
                background-color: #5755B3;
                box-shadow: 0px 7px 9px -4px rgba(88,67,190,0.29);
                border-radius: 18px;
                cursor: pointer;
                .menu-title {
                    margin-left: 12px;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 1;
                    color: #fff;
                }
                .menu-dropdown {
                    margin-left: 9px;
                    .iconfont {
                        font-size: 15px;
                        color: #E8E9EA;
                    }
                }
            }
            .task-btn {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 30px;
                height: 30px;
                margin-left: 20px;
                min-height: initial;
            }
            .lang {
                display: flex;
                align-items: center;
                height: 36px;
                margin-left: 20px;
                cursor: pointer;
                .text {
                    font-size: 12px;
                    line-height: 1;
                    color: #909297;
                }
                .iconfont {
                    margin-left: 7px;
                    font-size: 12px;
                    color: #909297;
                }
            }
        }
    }
    .custom-tablist {
        padding: 0 20px 0 44px;
        background-color: #f6f7fb;
    }
</style>
<style lang="scss">
    .menu-box {
        // input控件
        .el-input {
            input {
                box-sizing: border-box;
                width: 100%;
                height: inherit;
                border-color: #fff;
                background-image: none !important;
                font-size: 14px;
                color: #222530;
                &:focus {
                    // border-color: $linkBlue;
                }
                &::placeholder {
                    font-size: 14px;
                    color: #909297;
                }
            }
        }
    }

    .header-dropdown {
        width: 164px;
        border-radius: 10px;
        .el-dropdown-menu__item {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 24px;
            padding: 20px 16px;
            &.active {
                &::before {
                    position: absolute;
                    content: '';
                    left: 0; top: 50%;
                    transform: translateY(-50%);
                    width:3px;
                    height:50px;
                    background-color: #F1B7D0;
                }
                .menu-left .iconfont {
                    color: #F1B7D0;
                }
            }
            &::after {
                position: absolute;
                content: '';
                left: 16px; bottom: 0;
                width: 133px;
                height: 1px;
                background-color: #E8E9EA;
            }
            &:last-of-type {
                &::after {
                    content: none;
                }
            }
            .menu-left {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                .name-box {
                    display: flex;
                    align-items: center;
                    .name {
                        margin-left: 12px;
                        font-size: 14px;
                        line-height: 1;
                        color: #222530;
                    }
                }
                .iconfont {
                    margin: 0;
                    font-size: 10px;
                    color: #C8C8CB;
                }
            }
        }
    }
    .user-dropdown, .lang-dropdown {
        width: 120px;
        .el-dropdown-menu__item {
            display: flex;
            align-items: center;
            .text {
                margin-left: 5px;
            }
            .hover {
                display: none;
            }
            &:hover {
                color: #8786BF;
                background:rgba(191,240,255,0.3);
                .default {
                    display: none;
                }
                .hover {
                    display: inline;
                }
            }
        }
    }
</style>

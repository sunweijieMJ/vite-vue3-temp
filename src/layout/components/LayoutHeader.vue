<template>
    <div class="layout-header">
        <h3 class="header-title">{{ firstMenu.title }}</h3>
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
        <TaskList ref="taskRef" />
    </div>
</template>
<script lang="ts">
import {
    defineComponent, ref, computed, PropType,
} from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { TaskList } from '@/views/components';
import { CurMenuType } from '@/store/types';
import { basicApi } from '@/api';
import storage from '@/utils/storage';

export default defineComponent({
    name: 'LayoutHeader',
    components: {
        TaskList,
    },
    props: {
        firstMenu: {
            type: Object as PropType<Partial<CurMenuType>>,
            required: true,
        },
    },
    setup() {
        const $store = useStore();
        const $router = useRouter();
        const $i18n = useI18n();
        const taskRef = ref<typeof TaskList|null>(null);

        const keywords = '';

        const curLang = computed(() => {
            const curLocale = $i18n.locale.value;
            // $store.dispatch('basic/toggleLanguage', curLocale);
            if (curLocale === 'en') {
                return 'EN';
            }
            return 'ZH';
        });

        const userInfo = computed(() => $store.state.basic.userInfo);

        const menuList = computed(() => $store.state.basic.menuList);

        const taskDotStatus = computed(() => $store.state.basic.taskDotStatus);

        // 菜单切换
        const switchMenu = (command: CurMenuType) => {
            $router.push({ path: command.routePath });
        };

        // 语言切换
        const switchLang = (command: string) => {
            $i18n.locale.value = command;
            storage('localstorage').set('i18n', command);
            window.location.reload();
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
                    ElMessageBox.confirm(`${$i18n.t('baseLayoutHeader.t143')}?`, `${$i18n.t('baseLayoutHeader.t101')}`, {
                        confirmButtonText: `${$i18n.t('baseLayoutHeader.t102')}`,
                        cancelButtonText: `${$i18n.t('baseLayoutHeader.t126')}`,
                        type: 'warning',
                    }).then(() => {
                        basicApi.authLoginOut().then((res) => {
                            if (res.status) {
                                if (res.data) {
                                    storage().remove('token');
                                    storage('localstorage').remove('token');
                                    storage('localstorage').remove('vuex');
                                    window.location.href = `/login?redirect=${encodeURIComponent(window.location.href)}`;
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
            taskRef,
            keywords,
            curLang,
            userInfo,
            menuList,
            taskDotStatus,
            switchLang,
            switchMenu,
            skipTaskList,
            handleUser,
        };
    },
});
</script>
<style lang="scss" scoped>
    .layout-header {
        align-items: center;
        background-color: #fff;
        border-bottom: 1px solid #e8e8e8;
        box-sizing: border-box;
        display: flex;
        height: 50px;
        justify-content: space-between;
        padding: 0 30px;

        .header-title {
            color: #222530;
            font-size: 24px;
            font-weight: 400;
            line-height: 1;
            position: relative;
        }

        .menu-container {
            align-items: center;
            display: flex;
            height: inherit;
            justify-content: flex-end;

            .search {
                align-items: center;
                border-right: 1px solid #e8e9ea;
                display: flex;
                height: inherit;
                transition: 0.3s width;
                width: 333px;

                .iconfont {
                    align-items: center;
                    color: #5755b3;
                    cursor: pointer;
                    display: flex;
                    font-size: 18px;
                    height: inherit;
                    justify-content: center;
                    width: 54px;
                }

                .el-input {
                    flex: 1;
                    padding-right: 20px;
                }

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
            }

            .user {
                align-items: center;
                display: flex;

                .userinfo {
                    align-items: center;
                    cursor: pointer;
                    display: flex;

                    .avatar {
                        border-radius: 50%;
                        height: 36px;
                        overflow: hidden;
                        width: 36px;
                    }

                    .name {
                        color: #222530;
                        font-size: 14px;
                        line-height: 1;
                        margin-left: 15px;
                    }
                }

                .message {
                    align-items: center;
                    border: 1px solid #e8e9ea;
                    border-radius: 50%;
                    box-shadow: 0 7px 9px -4px rgba(88, 67, 190, 0.29);
                    box-sizing: border-box;
                    cursor: pointer;
                    display: flex;
                    height: 36px;
                    justify-content: center;
                    margin-left: 26px;
                    width: 36px;

                    .iconfont {
                        color: #e8e9ea;
                        font-size: 18px;
                    }
                }
            }

            .menu {
                align-items: center;
                background-color: #5755b3;
                border-radius: 18px;
                box-shadow: 0 7px 9px -4px rgba(88, 67, 190, 0.29);
                cursor: pointer;
                display: flex;
                height: 36px;
                margin-left: 20px;
                min-width: 140px;
                padding: 0 7px;

                .menu-title {
                    color: #fff;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 1;
                    margin-left: 12px;
                }

                .menu-dropdown {
                    margin-left: 9px;

                    .iconfont {
                        color: #e8e9ea;
                        font-size: 15px;
                    }
                }
            }

            .task-btn {
                align-items: center;
                display: flex;
                height: 30px;
                justify-content: center;
                margin-left: 20px;
                min-height: initial;
                width: 30px;
            }

            .lang {
                align-items: center;
                cursor: pointer;
                display: flex;
                height: 36px;
                margin-left: 20px;

                .text {
                    color: #909297;
                    font-size: 12px;
                    line-height: 1;
                }

                &.iconfont {
                    color: #909297;
                    font-size: 12px;
                    margin-left: 7px;
                }
            }
        }
    }

    .custom-tablist {
        background-color: #f6f7fb;
        padding: 0 20px 0 44px;
    }
</style>
<style lang="scss">
    .menu-box {
        // input控件
        .el-input {
            input {
                background-image: none !important;
                border-color: #fff;
                box-sizing: border-box;
                color: #222530;
                font-size: 14px;
                height: inherit;
                width: 100%;

                &:focus {
                    // border-color: $linkBlue;
                }

                &::placeholder {
                    color: #909297;
                    font-size: 14px;
                }
            }
        }
    }

    .header-dropdown {
        border-radius: 10px;
        width: 164px;

        &.el-dropdown-menu__item {
            align-items: center;
            display: flex;
            height: 24px;
            justify-content: space-between;
            padding: 20px 16px;
            position: relative;

            .menu-left {
                align-items: center;
                display: flex;
                justify-content: space-between;
                width: 100%;

                .name-box {
                    align-items: center;
                    display: flex;

                    .name {
                        color: #222530;
                        font-size: 14px;
                        line-height: 1;
                        margin-left: 12px;
                    }
                }

                .iconfont {
                    color: #c8c8cb;
                    font-size: 10px;
                    margin: 0;
                }
            }

            &.active {
                &::before {
                    background-color: #f1b7d0;
                    content: '';
                    height: 50px;
                    left: 0;
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 3px;
                }

                .menu-left .iconfont {
                    color: #f1b7d0;
                }
            }

            &::after {
                background-color: #e8e9ea;
                bottom: 0;
                content: '';
                height: 1px;
                left: 16px;
                position: absolute;
                width: 133px;
            }

            &:last-of-type {
                &::after {
                    content: none;
                }
            }
        }
    }

    .user-dropdown,
    .lang-dropdown {
        width: 120px;

        .el-dropdown-menu__item {
            align-items: center;
            display: flex;

            .text {
                margin-left: 5px;
            }

            .hover {
                display: none;
            }

            &:hover {
                background: rgba(191, 240, 255, 0.3);
                color: #8786bf;

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

<template>
    <custom-dialog
        v-model:visible="modifyPass.status"
        custom-class="modify-pass"
        :title="$t('baseModifyPass.t112')"
        :width="'480px'"
        :before-close="beforeClose"
        @cancel="cancel" @confirm="confirm"
    >
        <el-form ref="formRef" class="form-box pim-form" :model="form" :rules="rules" label-position="left" label-width="94px">
            <el-form-item class="oldPass" prop="oldPass" :label="`\ ${$t('baseModifyPass.t113')}`">
                <el-input v-model="form.oldPass" type="password" maxlength="16" />
            </el-form-item>
            <el-form-item class="newPass" prop="newPass" :label="`\ ${$t('baseModifyPass.t114')}`">
                <el-input v-model="form.newPass" type="password" maxlength="16" />
            </el-form-item>
            <el-form-item class="confirmPass" prop="confirmPass" :label="`\ ${$t('baseModifyPass.t115')}`">
                <el-input v-model="form.confirmPass" type="password" maxlength="16" />
            </el-form-item>
            <div class="prompt">
                <i class="iconfont el-icon-warning" />
                <span class="text">6～8{{ $t('baseModifyPass.t116') }}</span>
            </div>
        </el-form>
    </custom-dialog>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { ElForm, ElMessage } from 'element-plus';
import md5 from 'js-md5';
import { basicApi } from '@/api';
import storage from '@/utils/storage';
import global from '@/config/global';

export default defineComponent({
    name: 'ModifyPass',
    setup() {
        const $store = useStore();
        const $router = useRouter();
        const $i18n = useI18n();
        const formRef = ref<typeof ElForm|null>(null);

        const form = reactive({
            oldPass: '',
            newPass: '',
            confirmPass: ''
        });

        const modifyPass = computed({
            get: () => {
                if ($store.state.basic.modifyPass.status) {
                    // Object.assign(this.$data, (this.$options.data as Function).call(this));
                }
                return $store.state.basic.modifyPass;
            },
            set: (val) => {
                $store.dispatch('basic/toggleModifyPass', val);
            }
        });

        const validateNewPass = (rule: unknown, value: string, callback: (args?: unknown) => void) => {
            const passReg = global.form.rule.password;
            if (!value) {
                callback(new Error(' '));
            } else if (!passReg.test(value)) {
                callback(new Error(`${$i18n.t('baseModifyPass.t117')}`));
            } else {
                callback();
            }
        };

        const validateConfirmPass = (rule: unknown, value: string, callback: (args?: unknown) => void) => {
            if (!value) {
                callback(new Error(' '));
            } else if (value !== form.newPass) {
                callback(new Error(`2{{ ${$i18n.t('baseModifyPass.t118')} }}`));
            } else {
                callback();
            }
        };

        const rules = reactive({
            oldPass: [{ validator: validateNewPass, trigger: 'blur' }],
            newPass: [{ validator: validateNewPass, trigger: 'blur' }],
            confirmPass: [{ validator: validateConfirmPass, trigger: 'blur' }]
        });

        const beforeClose = (done: (args?: unknown) => void) => {
            if ($store.state.basic.modifyPass.type === 'required') {
                ElMessage.warning(`${$i18n.t('baseModifyPass.t119')}`);
            } else {
                done();
            }
        };

        const cancel = () => {
            if ($store.state.basic.modifyPass.type === 'required') {
                ElMessage.warning(`${$i18n.t('baseModifyPass.t119')}`);
            } else {
                $store.dispatch('basic/toggleModifyPass', { status: false });
            }
        };

        const logout = () => {
            storage().remove('token');
            storage('localstorage').remove('token');
            storage('localstorage').remove('vuex');
            $router.push({ name: 'Login' });
        };

        const confirm = () => {
            (formRef.value as typeof ElForm).validate(async(valid: boolean) => {
                if (valid) {
                    await basicApi.modifyPass({
                        password: md5(form.oldPass),
                        newPassword: md5(form.newPass)
                    }).then(res => {
                        if (res.status) {
                            $store.dispatch('basic/toggleModifyPass', { status: false });
                            logout();
                            ElMessage.success(`${$i18n.t('baseModifyPass.t120')}`);
                        }
                    });
                } else {
                    return false;
                }
            });
        };

        return {
            modifyPass, formRef, form, rules, beforeClose, cancel, confirm
        };
    }
});
</script>
<style lang="scss" scoped>
    .modify-pass {
        background: red;
        ::v-deep(.custom-dialog) {
            border-radius: 6px;
        }
        .form-box {
            padding: 0 60px;
            .prompt {
                display: flex;
                align-items: center;
                justify-content: flex-end;
                padding: 10px 0 40px;
                .iconfont {
                    font-size: 12px;
                    color: #909297;
                }
                .text {
                    margin-left: 7px;
                    font-size: 12px;
                    line-height: 16px;
                    color: #909297;
                }
            }
            ::v-deep(.el-form-item) {
                box-sizing: border-box;
                display: flex;
                align-items: center;
                &.oldPass, &.newPass, &.confirmPass {
                    box-sizing: border-box;
                    height: 56px;
                    padding: 10px 0;
                    border-bottom: 1px solid #E8E9EA;
                }
                .el-form-item__label {
                    padding: 0;
                    font-size: 12px;
                    font-weight: 600;
                    line-height: 16px;
                    color: #1C1980;
                }
                .el-form-item__content {
                    display: flex;
                    align-items: center;
                    flex: 1;
                    margin: 0 !important;
                    .el-form-item__error {
                        top: 56px;
                        left: -94px;
                        padding: 0;
                    }
                    .el-input__inner {
                        padding: 0;
                        font-size: 12px;
                        font-weight: 400;
                        color: #222530;
                        border: none;
                        &::placeholder {
                            font-size: 12px;
                            font-weight: 400;
                            color: #222530;
                        }
                    }
                }
                &.is-required {
                    .el-form-item__label {
                        &::before {
                            content: none !important;
                        }
                    }
                }
                &.is-error {
                    border-color: #B95881 !important;
                    .el-form-item__label {
                        color: #B95881 !important;
                    }
                    .el-form-item__content {
                        .el-input .el-input__inner {
                            border-color: #B95881 !important;
                        }
                        .el-form-item__error {
                            font-weight: 500;
                            color: #B95881 !important;
                        }
                    }
                }
            }
        }
        ::v-deep(.el-dialog__footer) {
            padding: 0;
            .footer {
                background-color: #fff;
                .btn {
                    width: 90px;
                    height: 36px;
                    border-radius: 18px;
                }
            }
        }
    }
</style>

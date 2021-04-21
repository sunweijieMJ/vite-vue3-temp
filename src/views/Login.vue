<template>
    <div class="login">
        <h2 class="logo">
            <svg class="icon" aria-hidden="true" width="60px" height="60px">
                <use xlink:href="#iconLogo" />
            </svg>
        </h2>
        <el-form ref="formRef" class="login-form" :model="form" :rules="rules" auto-complete="on" label-position="left" @keyup.enter="handleLogin">
            <h3 class="title">{{ $t('baseLogin.t1') }}</h3>
            <el-form-item class="account" prop="account" :label="$t('baseLogin.t2')" label-width="90px">
                <el-input v-model="form.account" maxlength="50" />
            </el-form-item>
            <div class="container">
                <el-form-item class="password" prop="password" :label="$t('baseLogin.t3')" label-width="90px">
                    <el-input v-model="form.password" type="password" maxlength="16" />
                </el-form-item>
                <el-form-item class="captchaCode" prop="captchaCode" :label="$t('baseLogin.t4')" label-width="110px">
                    <el-input v-model="form.captchaCode" maxlength="4" />
                    <img class="graphics" :src="captchaImage" alt="" @click="getGraphicCode">
                </el-form-item>
                <div class="submit" @click.prevent="handleLogin">
                    <svg class="icon default" aria-hidden="true" width="80px" height="60px">
                        <use xlink:href="#iconlogin_btn" />
                    </svg>
                    <svg class="icon hover" aria-hidden="true" width="80px" height="60px">
                        <use xlink:href="#iconlogin_btn_hover" />
                    </svg>
                </div>
            </div>
             <el-form-item v-if="0" class="autologin">
                <el-checkbox v-model="form.autologin">{{ $t('baseLogin.t5') }}</el-checkbox>
            </el-form-item>
        </el-form>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, reactive } from 'vue';
import { ElForm, ElMessage } from 'element-plus';
import md5 from 'js-md5';
import { useI18n } from 'vue-i18n';
import { basicApi } from '@/api';
import storage from '@/utils/storage';

export default defineComponent({
    name: 'Login',
    setup() {
        const $i18n = useI18n();
        const formRef = ref<typeof ElForm|null>(null);

        const validatePass = (rule: unknown, value: string, callback: (args?: unknown) => void) => {
            if (value.length < 6) {
                callback(new Error('密码至少6位'));
            } else {
                callback();
            }
        };

        const rules = reactive({
            account: [{ required: true, message: ' ', trigger: 'blur' }],
            password: [{ validator: validatePass, trigger: 'blur' }],
            captchaCode: [{ required: true, message: ' ', trigger: 'blur' }]
        });

        let captchaImage = ref('');
        const form = reactive({
            account: '',
            password: '',
            captchaCode: '',
            captchaCodeToken: '',
            autologin: false
        });

        // 获取图形验证码
        const getGraphicCode = async() => {
            basicApi.getGraphicCode().then(res => {
                if (res.status) {
                    captchaImage.value = res.data.imageBase;
                    form.captchaCodeToken = res.data.captchaCodeToken;
                }
            });
        };

        // 处理登录
        const handleLogin = () => {
            (formRef.value as typeof ElForm).validate((valid: boolean) => {
                if (valid) {
                    basicApi.authLogin({
                        account: form.account,
                        password: md5(form.password),
                        captchaCode: form.captchaCode,
                        captchaCodeToken: form.captchaCodeToken
                    }).then(res => {
                        if (res.status) {
                            if (form.autologin) {
                                storage('localstorage').set('token', res.data.token);
                            } else {
                                storage('localstorage').set('token', res.data.token);
                            }
                            window.location.href = '/';
                            ElMessage.success(`${$i18n.t('baseLogin.t111')}`);

                        } else {
                            getGraphicCode();
                        }
                    });
                } else {
                    return false;
                }
            });
        };

        onMounted(() => {
            getGraphicCode();
        });

        return {
            formRef, form, rules, captchaImage,
            getGraphicCode, handleLogin
        };
    }
});
</script>
<style lang="scss" scoped>
    .login {
        position: relative;
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        background: url('../../static/img/login_bg1.png') left top no-repeat;
        background-color: #F6F7FB;
        .logo {
            position: absolute;
            left: 32px; top: 34px;
        }
        .login-form {
            box-sizing: border-box;
            padding: 180px 0 0 150px;
            flex: 1;
            margin: 140px 0 0 120px;
            border-radius: 10px 0 0 0;
            background: url('../../static/img/login_bg2.png') right bottom no-repeat;
            background-color: #fff;
            .title {
                font-size: 96px;
                font-weight: 600;
                line-height: 1;
                color: #1C1980;
            }
            .container {
                display: flex;
                align-items: flex-end;
                .submit {
                    margin-left: 60px;
                    cursor: pointer;
                    .hover {
                        display: none;
                    }
                    &:hover {
                        .default {
                            display: none;
                        }
                        .hover {
                            display: inline;
                        }
                    }
                }
            }
        }
    }
</style>
<style lang="scss">
    .login {
        .login-form {
            .el-form-item {
                box-sizing: border-box;
                display: flex;
                align-items: center;
                &.account {
                    width: 490px;
                    height: 56px;
                    padding: 8px 0;
                    margin: 56px 0 40px 0;
                    border-bottom: 1px solid #E8E9EA;
                }
                &.password {
                    width: 360px;
                    height: 56px;
                    padding: 8px 0;
                    margin: 0 0 23px 0;
                    border-bottom: 1px solid #E8E9EA;
                }
                &.captchaCode {
                    width: 360px;
                    height: 56px;
                    padding: 8px 0;
                    margin: 0 0 23px 37px;
                    border-bottom: 1px solid #E8E9EA;
                    .el-form-item__error {
                        left: -110px !important;
                    }
                    .graphics {
                        width: 72px;
                        height: 30px;
                        margin: 0 2px 0 10px;
                        background-color: #F4F4F4;
                        cursor: pointer;
                    }
                }
                &.autologin {
                    margin: 40px 0 0 0;
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
                .el-form-item__label {
                    padding: 0;
                    font-size: 12px;
                    font-weight: 500;
                    line-height: 16px;
                    color: #1C1980;
                }
                .el-form-item__content {
                    display: flex;
                    align-items: center;
                    flex: 1;
                    margin: 0 !important;
                    .el-form-item__error {
                        top: 130%;
                        left: -90px;
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
            }
        }
    }
</style>

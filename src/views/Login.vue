<template>
    <div class="login">
        <h2 class="logo">
            <svg class="icon" aria-hidden="true" width="60px" height="60px">
                <use xlink:href="#iconLogo" />
            </svg>
        </h2>
        <el-form ref="formRef" class="login-form" :model="state.form" :rules="state.rules" auto-complete="on" label-position="left" @keyup.enter="handleLogin">
            <h3 class="title">{{ $t('baseLogin.t1') }}</h3>
            <el-form-item class="account" prop="account" :label="$t('baseLogin.t2')" label-width="90px">
                <el-input v-model="state.form.account" maxlength="50" />
            </el-form-item>
            <div class="container">
                <el-form-item class="password" prop="password" :label="$t('baseLogin.t3')" label-width="90px">
                    <el-input v-model="state.form.password" type="password" maxlength="16" />
                </el-form-item>
                <el-form-item class="captcha-code" prop="captchaCode" :label="$t('baseLogin.t4')" label-width="110px">
                    <el-input v-model="state.form.captchaCode" maxlength="4" />
                    <img class="graphics" :src="state.captchaImage" alt="" @click="getGraphicCode">
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
                <el-checkbox v-model="state.form.autologin">{{ $t('baseLogin.t5') }}</el-checkbox>
            </el-form-item>
        </el-form>
    </div>
</template>
<script lang="ts">
import {
    defineComponent, onMounted, ref, reactive,
} from 'vue';
import { ElForm, ElMessage } from 'element-plus';
import md5 from 'js-md5';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { basicApi } from '@/api';
import storage from '@/utils/storage';

interface LoginState {
    rules: unknown;
    form: {
        account: string;
        password: string;
        captchaCode: string;
        captchaCodeToken: string;
        autologin: boolean;
    },
    captchaImage: string;
}

export default defineComponent({
    name: 'Login',
    setup() {
        const $i18n = useI18n();
        const $route = useRoute();
        const formRef = ref<typeof ElForm|null>(null);

        const validatePass = (rule: unknown, value: string, callback: (args?: unknown) => void) => {
            if (value.length < 6) {
                callback(new Error('密码至少6位'));
            } else {
                callback();
            }
        };

        const state: LoginState = reactive({
            rules: {
                account: [{ required: true, message: ' ', trigger: 'blur' }],
                password: [{ validator: validatePass, trigger: 'blur' }],
                captchaCode: [{ required: true, message: ' ', trigger: 'blur' }],
            },
            form: {
                account: '',
                password: '',
                captchaCode: '',
                captchaCodeToken: '',
                autologin: false,
            },
            captchaImage: '',
        });

        // 获取图形验证码
        const getGraphicCode = async () => {
            basicApi.getGraphicCode().then((res) => {
                if (res.status) {
                    state.captchaImage = res.data.imageBase;
                    state.form.captchaCodeToken = res.data.captchaCodeToken;
                }
            });
        };

        // 处理登录
        const handleLogin = () => {
            (formRef.value as typeof ElForm).validate((valid: boolean) => {
                if (valid) {
                    basicApi.authLogin({
                        account: state.form.account,
                        password: md5(state.form.password),
                        captchaCode: state.form.captchaCode,
                        captchaCodeToken: state.form.captchaCodeToken,
                    }).then((res) => {
                        if (res.status) {
                            if (state.form.autologin) {
                                storage('localstorage').set('token', res.data.token);
                            } else {
                                storage('localstorage').set('token', res.data.token);
                            }
                            const redirect = $route.query.redirect ?? '/';
                            window.location.href = decodeURIComponent(redirect as string);
                            ElMessage.success(`${$i18n.t('baseLogin.t111')}`);
                        } else {
                            getGraphicCode();
                        }
                    });
                    return true;
                }
                return false;
            });
        };

        onMounted(() => {
            getGraphicCode();
        });

        return {
            formRef,
            state,
            getGraphicCode,
            handleLogin,
        };
    },
});
</script>
<style lang="scss" scoped>
    .login {
        background: url('../../static/img/login_bg1.png') left top no-repeat;
        background-color: #f6f7fb;
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        position: relative;

        .logo {
            left: 32px;
            position: absolute;
            top: 34px;
        }

        .login-form {
            background: url('../../static/img/login_bg2.png') right bottom no-repeat;
            background-color: #fff;
            border-radius: 10px 0 0;
            box-sizing: border-box;
            flex: 1;
            margin: 140px 0 0 120px;
            padding: 180px 0 0 150px;

            .title {
                color: #1c1980;
                font-size: 96px;
                font-weight: 600;
                line-height: 1;
            }

            .container {
                align-items: flex-end;
                display: flex;

                .submit {
                    cursor: pointer;
                    margin-left: 60px;

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
                align-items: center;
                box-sizing: border-box;
                display: flex;

                &.account {
                    border-bottom: 1px solid #e8e9ea;
                    height: 56px;
                    margin: 56px 0 40px;
                    padding: 8px 0;
                    width: 490px;
                }

                &.password {
                    border-bottom: 1px solid #e8e9ea;
                    height: 56px;
                    margin: 0 0 23px;
                    padding: 8px 0;
                    width: 360px;
                }

                &.captcha-code {
                    border-bottom: 1px solid #e8e9ea;
                    height: 56px;
                    margin: 0 0 23px 37px;
                    padding: 8px 0;
                    width: 360px;

                    .el-form-item__error {
                        left: -110px !important;
                    }

                    .graphics {
                        background-color: #f4f4f4;
                        cursor: pointer;
                        height: 30px;
                        margin: 0 2px 0 10px;
                        width: 72px;
                    }
                }

                &.autologin {
                    margin: 40px 0 0;
                }

                .el-form-item__label {
                    color: #1c1980;
                    font-size: 12px;
                    font-weight: 500;
                    line-height: 16px;
                    padding: 0;
                }

                .el-form-item__content {
                    align-items: center;
                    display: flex;
                    flex: 1;
                    margin: 0 !important;

                    .el-form-item__error {
                        left: -90px;
                        top: 130%;
                    }

                    .el-input__inner {
                        border: 0;
                        color: #222530;
                        font-size: 12px;
                        font-weight: 400;
                        padding: 0;

                        &::placeholder {
                            color: #222530;
                            font-size: 12px;
                            font-weight: 400;
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
                    border-color: #b95881 !important;

                    .el-form-item__label {
                        color: #b95881 !important;
                    }

                    .el-form-item__content {
                        .el-input .el-input__inner {
                            border-color: #b95881 !important;
                        }

                        .el-form-item__error {
                            color: #b95881 !important;
                            font-weight: 500;
                        }
                    }
                }
            }
        }
    }
</style>

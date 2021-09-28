<template>
  <custom-dialog
    v-model:visible="modifyPass.status"
    custom-class="modify-pass"
    :title="$t('baseModifyPass.t112')"
    :width="'480px'"
    :before-close="beforeClose"
    @cancel="cancel"
    @confirm="confirm"
  >
    <el-form
      ref="formRef"
      class="form-box pim-form"
      :model="form"
      :rules="rules"
      label-position="left"
      label-width="94px"
    >
      <el-form-item
        class="oldPass"
        prop="oldPass"
        :label="`\ ${$t('baseModifyPass.t113')}`"
      >
        <el-input v-model="form.oldPass" type="password" maxlength="16" />
      </el-form-item>
      <el-form-item
        class="newPass"
        prop="newPass"
        :label="`\ ${$t('baseModifyPass.t114')}`"
      >
        <el-input v-model="form.newPass" type="password" maxlength="16" />
      </el-form-item>
      <el-form-item
        class="confirmPass"
        prop="confirmPass"
        :label="`\ ${$t('baseModifyPass.t115')}`"
      >
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
    const $i18n = useI18n();
    const formRef = ref<typeof ElForm | null>(null);

    const form = reactive({
      oldPass: '',
      newPass: '',
      confirmPass: '',
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
      },
    });

    const validateNewPass = (
      rule: unknown,
      value: string,
      callback: (args?: unknown) => void
    ) => {
      const passReg = global.form.rule.password;
      if (!value) {
        callback(new Error(' '));
      } else if (!passReg.test(value)) {
        callback(new Error(`${$i18n.t('baseModifyPass.t117')}`));
      } else {
        callback();
      }
    };

    const validateConfirmPass = (
      rule: unknown,
      value: string,
      callback: (args?: unknown) => void
    ) => {
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
      confirmPass: [{ validator: validateConfirmPass, trigger: 'blur' }],
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
      window.location.href = `/login?redirect=${encodeURIComponent(
        window.location.href
      )}`;
    };

    const confirm = () => {
      (formRef.value as typeof ElForm).validate(async (valid: boolean) => {
        if (valid) {
          await basicApi
            .modifyPass({
              password: md5(form.oldPass),
              newPassword: md5(form.newPass),
            })
            .then((res) => {
              if (res.status) {
                $store.dispatch('basic/toggleModifyPass', { status: false });
                logout();
                ElMessage.success(`${$i18n.t('baseModifyPass.t120')}`);
              }
            });
          return true;
        }
        return false;
      });
    };

    return {
      modifyPass,
      formRef,
      form,
      rules,
      beforeClose,
      cancel,
      confirm,
    };
  },
});
</script>
<style lang="scss" scoped>
.modify-pass {
  background: var(--red);

  ::v-deep(.custom-dialog) {
    border-radius: 6px;
  }

  ::v-deep(.el-dialog__footer) {
    padding: 0;

    .footer {
      background-color: #fff;

      .btn {
        border-radius: 18px;
        height: 36px;
        width: 90px;
      }
    }
  }

  .form-box {
    padding: 0 60px;

    .prompt {
      align-items: center;
      display: flex;
      justify-content: flex-end;
      padding: 10px 0 40px;

      .iconfont {
        color: #909297;
        font-size: 12px;
      }

      .text {
        color: #909297;
        font-size: 12px;
        line-height: 16px;
        margin-left: 7px;
      }
    }

    ::v-deep(.el-form-item) {
      align-items: center;
      box-sizing: border-box;
      display: flex;

      &.oldPass,
      &.newPass,
      &.confirmPass {
        border-bottom: 1px solid #e8e9ea;
        box-sizing: border-box;
        height: 56px;
        padding: 10px 0;
      }

      .el-form-item__label {
        color: #1c1980;
        font-size: 12px;
        font-weight: 600;
        line-height: 16px;
        padding: 0;
      }

      .el-form-item__content {
        align-items: center;
        display: flex;
        flex: 1;
        margin: 0 !important;

        .el-form-item__error {
          left: -94px;
          padding: 0;
          top: 56px;
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

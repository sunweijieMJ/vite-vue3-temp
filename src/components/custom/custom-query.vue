<template>
    <el-form ref="rootRef" class="custom-query"
        :style="isCollapse ? {height: minHeight} : {height: maxHeight}" :model="currentForm"
    >
        <div class="query-container">
            <slot />
            <div class="control-box">
                <div class="control">
                    <div class="btn-box">
                        <el-button class="reset" @click.prevent="resetForm">{{ $t('baseCustomQuery.t1') }}</el-button>
                        <el-button class="query" native-type="submit" @click.prevent="$emit('queryForm')">{{ $t('baseCustomQuery.t2') }} </el-button>
                    </div>
                    <div v-if="showToggle" class="toggle" @click.prevent="queryToggle">
                        <span class="text">{{ isCollapse ? $t('baseCustomQuery.t3') : $t('baseCustomQuery.t4') }}</span>
                        <i class="iconfont iconheader_unfold" />
                    </div>
                </div>
            </div>
        </div>
    </el-form>
</template>
<script lang="ts">
import {
    defineComponent, ref, watch, computed, nextTick, onMounted, reactive,
} from 'vue';
import { ElForm } from 'element-plus';

export default defineComponent({
    name: 'CustomQuery',
    props: {
        modelValue: {
            type: Object,
            default: null,
        },
        maxLength: {
            type: Number,
            default: 4,
        },
    },
    emits: ['update:modelValue', 'resetForm', 'queryForm'],
    setup(props, { emit }) {
        const rootRef = ref<typeof ElForm | null>(null);

        let originForm = reactive({});
        const showToggle = ref(false);
        const isCollapse = ref(false);

        const minHeight = ref('70px');
        const maxHeight = ref('');

        let currentForm = computed({
            get: () => props.modelValue,
            set: (value) => emit('update:modelValue', value),
        });

        watch(() => props.modelValue, (cur) => {
            originForm = JSON.parse(JSON.stringify(cur));
        });

        const resetForm = () => {
            currentForm = JSON.parse(JSON.stringify(originForm));
            emit('resetForm');
        };

        const queryToggle = () => {
            isCollapse.value = !isCollapse.value;
        };

        onMounted(() => {
            nextTick(() => {
                const formItems = rootRef.value?.$el.querySelectorAll('.el-form-item');
                maxHeight.value = `${rootRef.value?.$el.querySelector('.query-container')?.scrollHeight as number}px`;
                if (formItems.length >= props.maxLength) {
                    showToggle.value = true;
                    queryToggle();
                }
            });
        });

        return {
            rootRef, currentForm, minHeight, maxHeight, isCollapse, showToggle, queryToggle, resetForm,
        };
    },
});
</script>
<style lang="scss">
    .custom-query.el-form {
        overflow: hidden;
        transition: height 0.3s;
        will-change: height;

        .query-container {
            align-items: center;
            background-color: #fff;
            box-shadow: 0 8px 10px 0 rgba(232, 235, 244, 0.63);
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            padding: 5px 8px;

            .el-form-item {
                box-sizing: border-box;
                flex: 0 0 25%;
                flex-shrink: 0;
                margin: 0;
                padding: 10px;
                position: relative;

                .el-form-item__content {
                    align-items: center;
                    display: flex;

                    >.el-input,
                    >.el-select,
                    >.el-cascader,
                    >.el-autocomplete,
                    .el-date-editor {
                        flex: 1;
                        width: initial;
                    }

                    .el-input {
                        display: flex;
                    }

                    .el-input__inner {
                        color: #222530;
                        font-size: 12px;
                        font-weight: 400;

                        &::placeholder {
                            color: #6f7178;
                            font-size: 12px;
                            font-weight: 400;
                        }
                    }
                }
            }

            .control-box {
                background-color: #fff;
                bottom: 4px;
                flex: 0 0 25%;
                flex-shrink: 0;
                margin-left: auto;
                position: sticky;
                z-index: 100;
            }

            .el-form-item,
            .control-box {
                /* stylelint-disable-next-line function-calc-no-unspaced-operator */
                flex: 0 0 calc(100% / v-bind(maxlength));
            }
        }

        .control {
            align-items: center;
            display: flex;
            height: 40px;
            justify-content: space-between;
            padding: 8px;

            .btn-box {
                align-items: center;
                display: flex;
                flex: 0 0 80%;
                justify-content: space-between;

                .el-button {
                    align-items: center;
                    border: 0;
                    border-radius: 18px;
                    display: flex;
                    flex: 0 0 45%;
                    font-size: 12px;
                    height: 32px;
                    justify-content: center;
                    padding: 0;

                    &.reset {
                        background-color: #f6d7e4;
                        color: #b95881;
                    }

                    &.query {
                        background-color: #5755b3;
                        color: #fff;
                    }
                }

                .el-button + .el-button {
                    margin-left: 0;
                }
            }

            .toggle {
                align-items: center;
                cursor: pointer;
                display: flex;

                .text {
                    color: #909297;
                    font-size: 12px;
                    font-weight: 400;
                    line-height: 1;
                }

                .iconfont {
                    color: #909297;
                    font-size: 12px;
                }
            }
        }
    }
</style>

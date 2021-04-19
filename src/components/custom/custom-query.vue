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
import { defineComponent, ref, watch, computed, nextTick, onMounted, reactive } from 'vue';
import { ElForm } from 'element-plus';

export default defineComponent({
    name: 'CustomQuery',
    props: {
        modelValue: {
            type: Object,
            default: null
        },
        maxLength: {
            type: Number,
            default: 4
        }
    },
    emits: ['update:modelValue', 'resetForm', 'queryForm'],
    setup(props, { emit }) {
        const rootRef = ref<typeof ElForm | null>(null);

        let originForm = reactive({});
        let showToggle = ref(false);
        let isCollapse = ref(false);

        let minHeight = ref('70px');
        let maxHeight = ref('');

        let currentForm = computed({
            get: () => props.modelValue,
            set: (value) => emit('update:modelValue', value)
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
                maxHeight.value = rootRef.value?.$el.querySelector('.query-container')?.scrollHeight as number + 'px';
                if (formItems.length >= props.maxLength) {
                    showToggle.value = true;
                    queryToggle();
                }
            });
        });

        return {
            rootRef, currentForm, minHeight, maxHeight, isCollapse, showToggle, queryToggle, resetForm
        };
    }
});
</script>
<style lang="scss">
    .custom-query.el-form {
        overflow: hidden;
        will-change: height;
        transition: height 0.3s;
        .query-container {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            flex-wrap: wrap;
            padding: 5px 8px;
            background-color: #fff;
            box-shadow: 0px 8px 10px 0px rgba(232,235,244,0.63);
        }
        .el-form-item {
            position: relative;
            box-sizing: border-box;
            flex-shrink: 0;
            flex: 0 0 25%;
            padding: 10px;
            margin: 0;
            .el-form-item__content {
                display: flex;
                align-items: center;
                >.el-input, >.el-select, >.el-cascader, >.el-autocomplete, .el-date-editor{
                    flex: 1;
                    width: initial;
                }
                .el-input {
                    display: flex;
                }
                .el-input__inner {
                    font-size: 12px;
                    font-weight: 400;
                    color: #222530;
                    &::placeholder {
                        font-size: 12px;
                        font-weight: 400;
                        color: #6F7178;
                    }
                }
            }
        }
        .control-box {
            position: sticky;
            bottom: 4px;
            z-index: 100;
            flex-shrink: 0;
            flex: 0 0 25%;
            margin-left: auto;
            background-color: #fff;
        }
        .control {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 40px;
            padding: 8px;
            .btn-box {
                display: flex;
                align-items: center;
                justify-content: space-between;
                flex: 0 0 80%;
                .el-button {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex: 0 0 45%;
                    height: 32px;
                    padding: 0;
                    border: none;
                    border-radius: 18px;
                    font-size: 12px;
                    &.reset {
                        color: #B95881;
                        background-color: #F6D7E4;
                    }
                    &.query {
                        color: #fff;
                        background-color: #5755B3;
                    }
                }
                .el-button + .el-button {
                    margin-left: 0;
                }
            }
            .toggle {
                display: flex;
                align-items: center;
                cursor: pointer;
                .text {
                    font-size: 12px;
                    font-weight: 400;
                    line-height: 1;
                    color: #909297;
                }
                .iconfont {
                    font-size: 12px;
                    color: #909297;
                }
            }
        }

        .query-container {
            .el-form-item {
                flex: 0 0 calc(100% / v-bind(maxLength));
            }
            .control-box {
                flex: 0 0 calc(100% / v-bind(maxLength));
            }
        }
    }
</style>

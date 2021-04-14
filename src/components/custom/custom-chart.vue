<template>
    <div ref="chartRef" class="custom-chart" />
</template>
<script lang="ts">
import { defineComponent, PropType, ref, onMounted } from 'vue';
import { echarts } from '@/plugin';
import { ECOption } from '@/plugin/echarts';

export default defineComponent({
    name: 'CustomChart',
    props: {
        // 配置项
        options: {
            type: Object as PropType<ECOption>,
            default: null
        },
        // 主题
        theme: {
            type: [Object, String],
            default: ''
        },
        // 附加参数
        opts: {
            type: Object,
            default: null
        }
    },
    setup(props) {
        let myChart;
        const chartRef = ref<HTMLElement|null>(null);

        const draw = () => {
            // 实例化
            myChart = echarts.init((chartRef.value as HTMLElement), props.theme, props.opts);

            // 绘制
            myChart.setOption(props.options);
        };

        onMounted(() => {
            draw();
        });

        return {
            chartRef
        };
    }
});
</script>
<style lang="scss" scoped>
    .custom-chart {
        width: 500px;
        height: 400px;
    }
</style>

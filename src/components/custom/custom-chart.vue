<template>
    <div ref="myChart" class="custom-chart" />
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { echarts } from '@/plugin';

export default defineComponent({
    name: 'CustomChart',
    props: {
        // 配置项
        options: {
            type: Object,
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
        let myChart: any = null;
        const chartRef = ref(null);

        const draw = () => {
            // 实例化
            myChart = echarts.init(chartRef, props.theme, props.opts);

            // 绘制
            myChart.setOption(props.options);
        };

        onMounted(() => {
            draw();
        });
    }
});
</script>

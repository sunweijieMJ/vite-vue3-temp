<template>
    <div class="demo">
        <h3>custom-chart</h3>
        <custom-chart :options="options" />
        <br>
        <h3>custom-image</h3>
        <custom-image src="https://upload.jianshu.io/users/upload_avatars/14244453/858f33fb-ebb3-445c-86e3-1b117db0e70b.jpg" />
        <br>
        <h3>custom-message</h3>
        <el-button @click.prevent="customMessage">custom-message</el-button>
        <br>
        <h3>custom-toast</h3>
        <el-button @click.prevent="customToast">custom-toast</el-button>
    </div>
</template>
<script lang="ts">
import { ElMessage } from 'element-plus';
import { defineComponent, inject } from 'vue';
import { ToastVM } from '@/components/custom/custom-toast/types';

const chartJs = () => {
    const data = [];

    for (let i = 0; i <= 100; i++) {
        const theta = (i / 100) * 360;
        const r = 5 * (1 + Math.sin((theta / 180) * Math.PI));
        data.push([r, theta]);
    }

    const options = {
        title: {
            text: '极坐标双数值轴',
        },
        legend: {
            data: ['line'],
        },
        polar: {},
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
            },
        },
        angleAxis: {
            type: 'value',
            startAngle: 0,
        },
        radiusAxis: {},
        series: [
            {
                coordinateSystem: 'polar',
                name: 'line',
                type: 'line',
                data,
            },
        ],
    };

    return options;
};

export default defineComponent({
    name: 'Demo',
    setup() {
        const options = chartJs();
        const $msg = inject('$message') as typeof ElMessage;
        const $toast: ToastVM = inject('$toast');

        const customMessage = () => {
            $msg.success('弹窗成功');
        };

        const customToast = () => {
            $toast('自定义toast');
        };

        return {
            options, customMessage, customToast,
        };
    },
});
</script>

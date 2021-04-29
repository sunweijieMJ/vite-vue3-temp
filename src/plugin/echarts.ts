// 引入 echarts 核心模块
import * as echarts from 'echarts/core';
// 引入 Canvas 渲染器
import { CanvasRenderer } from 'echarts/renderers';
// 引入图表
import {
    BarChart,
    PieChart,
    LineChart,
    // 系列类型的定义后缀都为 SeriesOption
    BarSeriesOption,
    PieSeriesOption,
    LineSeriesOption
} from 'echarts/charts';
// 引入组件
import {
    GridComponent,
    TitleComponent,
    LegendComponent,
    TooltipComponent,
    DataZoomComponent,
    GraphicComponent,
    PolarComponent,
    // 组件类型的定义后缀都为 ComponentOption
    GridComponentOption,
    TitleComponentOption,
    LegendComponentOption,
    TooltipComponentOption,
    DataZoomComponentOption,
    GraphicComponentOption,
    PolarComponentOption
} from 'echarts/components';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = echarts.ComposeOption<
    BarSeriesOption | PieSeriesOption | LineSeriesOption |
    TitleComponentOption | GridComponentOption | LegendComponentOption | TooltipComponentOption | DataZoomComponentOption | GraphicComponentOption | PolarComponentOption
>;

// 注册必须的组件
echarts.use([
    BarChart, PieChart, LineChart,
    GridComponent, TitleComponent, LegendComponent, TooltipComponent, DataZoomComponent, GraphicComponent, PolarComponent,
    CanvasRenderer
]);

export default echarts;

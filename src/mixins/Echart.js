// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from "echarts/core";
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart, LineChart } from "echarts/charts";
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    LegendComponent,
    MarkLineComponent,
    MarkPointComponent,
    ToolboxComponent
} from "echarts/components";
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from "echarts/features";
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from "echarts/renderers";
// 注册必须的组件

export default {
    mounted() {
        echarts.use([
            TitleComponent,
            TooltipComponent,
            GridComponent,
            DatasetComponent,
            TransformComponent,
            BarChart,
            LabelLayout,
            UniversalTransition,
            CanvasRenderer,
            LineChart,
            LegendComponent,
            MarkLineComponent,
            MarkPointComponent,
            ToolboxComponent
        ]);
        this.initChart();
        window.onresize = () => {
            this.Chart.resize({}); // RWD
        };


    },
    methods: {
        initChart(state = "") {
            //   Chart.dispose(); // 因echart已經初始化一個表需要先銷毀先前的圖表
            this.Chart = echarts.init(this.$refs.chartDom, state); // 初始畫圖表
            // this.Chart.showLoading(); // 需先取得元素後才能使用showLoading
            // this.Chart.hideLoading();
            this.option && this.Chart.setOption(this.option);
            // myChart.on("click", function (params) {
            //   window.open(
            //     "https://www.baidu.com/s?wd=" + encodeURIComponent(params.name)
            //   );
            // });
        },
        dark_model(state) {
            if (state) {
                this.Chart.dispose();
                this.initChart("dark");
            } else {
                this.Chart.dispose();
                this.initChart();
            }
        },
    },
};

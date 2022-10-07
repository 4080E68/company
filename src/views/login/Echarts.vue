<template>
  <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
  <div id="main" style="width: 600px; height: 400px"></div>
</template>
<script>
import * as echarts from "echarts";

export default {
  data() {
    return {
      option: {
        title: {
          text: "ECharts 入门示例",
        },
        tooltip: {},
        legend: {
          data: ["销量"],
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      },
    };
  },
  mounted() {
    // var myChart = echarts.init(document.getElementById("main"));
    var chartDom = document.getElementById("main");
    var myChart = echarts.init(chartDom);
    // myChart.setOption(this.option);
    this.option && myChart.setOption(this.option);
  },
};
</script>

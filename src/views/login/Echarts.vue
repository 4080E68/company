<template>
  <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
  <div class="container">
    <div class="form-check form-switch">
      <input
        class="form-check-input"
        type="checkbox"
        role="switch"
        id="flexSwitchCheckDefault"
        ref="dark_model"
        @change="model_state()"
      />
      <label class="form-check-label" for="flexSwitchCheckDefault"
        >深色模式</label
      >
    </div>
    <div
      id="main"
      style="width: 100%; height: 400px; border: 1px solid"
      ref="chartDom"
    ></div>
  </div>
</template>
<script>
import Echart from "@/mixins/Echart";

export default {
  mixins: [Echart],
  data() {
    return {
      option: {
        title: {
          text: "測試圖表",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "Email",
            type: "line",
            data: [500, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "Union Ads",
            type: "line",
            data: [500, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "Video Ads",
            type: "line",
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "Direct",
            type: "line",
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "Search Engine",
            type: "line",
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
      },
    };
  },
  mounted() {
    this.initOption();
    console.log(this.Chart);
  },
  methods: {
    initOption() {
      this.Chart.setOption({
        // 設置圖表
      });
    },
    model_state() {
      this.dark_model(this.$refs.dark_model.checked);
      this.initOption();
    },
  },
};
</script>

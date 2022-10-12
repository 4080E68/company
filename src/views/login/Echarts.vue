<template>
  <Loading :active="isLoading">
    <div class="loadingio-spinner-ellipsis-2jod0nogjkz">
      <div class="ldio-evlsaudp4rs">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div></div
  ></Loading>
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
      style="width: 100%; height: 80vh; border: 1px solid"
      ref="chartDom"
    ></div>
    <button @click="test()">test</button>
  </div>
</template>
<style>
@import "@/style/components/_loading.scss";
</style>
<script>
import Echart from "@/mixins/Echart";

export default {
  mixins: [Echart],
  data() {
    return {
      isLoading: false,
      chartData: [],
      option: {
        tooltip: {
          valueFormatter: function (value) {
            return value + " ml";
          },
          trigger: "axis",
          // axisPointer: {
          //   type: "cross",
          //   crossStyle: {
          //     color: "red",
          //   },
          // },
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {},
        xAxis: [
          { type: "category", gridIndex: 0 },
          { type: "category", gridIndex: 1 },
        ],
        // 声明一个 Y 轴，数值轴。
        yAxis: [
          {
            // interval: 50,
            // max: 200,
            axisLabel: {
              formatter: "{value} ml",
            },
            gridIndex: 0,
          },
          {
            // interval: 50,
            // max: 200,
            axisLabel: {
              formatter: "{value} ml",
            },
            gridIndex: 1,
          },
        ],
        dataset: {
          // 提供一份数据。
          source: [
            ["product", "2015", "2016", "2017"],
            ["Matcha Latte", 43.3, 85.8, 93.7],
            ["Milk Tea", 83.1, 73.4, 55.1],
            ["Cheese Cocoa", 86.4, 65.2, 82.5],
            ["Walnut Brownie", 72.4, 53.9, 39.1],
          ],
        },
        grid: [{ bottom: "60%" }, { top: "60%" }],
        series: [
          {
            type: "bar",
            seriesLayoutBy: "row",
          },
          {
            type: "bar",
            seriesLayoutBy: "row",
          },
          {
            type: "bar",
            seriesLayoutBy: "row",
          },
          {
            type: "bar",
            seriesLayoutBy: "row",
          },
          {
            type: "bar",
            seriesLayoutBy: "row",
          },
          {
            type: "bar",
            xAxisIndex: 1,
            yAxisIndex: 1,
          },
          {
            type: "bar",
            xAxisIndex: 1,
            yAxisIndex: 1,
          },
          {
            type: "bar",
            xAxisIndex: 1,
            yAxisIndex: 1,
          },
        ],
      },
    };
  },
  mounted() {
    this.initOption();
    this.option.dataset.source.push(["test", 32.4, 43.9, 69.1]);
    this.Chart.setOption(this.option);
  },
  methods: {
    initOption() {},
    model_state() {
      this.dark_model(this.$refs.dark_model.checked);
      this.initOption();
    },
    test() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    },
  },
};
</script>

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
    <button @click="test()">載入動畫</button>
    <div class="form-check form-switch">
      <input
        class="form-check-input"
        type="checkbox"
        role="switch"
        id="flexSwitchCheckDefault"
        ref="changeChart"
        @click="change()"
      />
      <label class="form-check-label" for="flexSwitchCheckDefault"
        >切換表</label
      >
    </div>
  </div>
</template>
<script>
import Echart from "@/mixins/Echart";
import axios from "axios";

export default {
  mixins: [Echart],
  data() {
    return {
      isLoading: false,
      chartData: [],
      option: {
        tooltip: {
          trigger: "axis",
          // axisPointer: {
          //   type: "cross",
          //   crossStyle: {
          //     color: "#999",
          //   },
          // },
          valueFormatter: function (value) {
            return value + "萬";
          },
        },
        // toolbox: {
        //   feature: {
        //     dataView: { show: true, readOnly: false },
        //     magicType: { show: true, type: ["line", "bar"] },
        //     restore: { show: true },
        //     saveAsImage: { show: true },
        //   },
        // },
        legend: {
          data: ["金額成長比"],
        },
        xAxis: [
          {
            type: "category",
            // data: ["A門市", "B門市", "C門市"],
            // axisPointer: {
            //   type: "shadow",
            // },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "金額",
            // min: 0,
            // max: 100000,
            axisLabel: {
              formatter: "{value} 萬",
            },
          },
          {
            type: "value",
            name: "金額成長比",
            min: 0,
            max: 100,
            interval: 20,
            axisLabel: {
              formatter: "{value} %",
            },
          },
        ],
        dataset: {
          // 提供一份数据。
          // dimensions:["product", "A門市", "B門市", "C門市", "金額成長比"],
          // source: [
          //   ["product", "A門市", "B門市", "C門市", "金額成長比"],
          //   ["Matcha Latte", 430.3, 850.8, 930.7, 20],
          //   ["Milk Tea", 830.1, 730.4, 550.1, 30],
          //   ["Walnut Brownie", 720.4, 530.9, 390.1, 60],
          // ],
          source: [
            ["product", "A門市", "B門市", "C門市"],
            ["商品一", 330.3, 950.8, 1030.7],
            ["商品二", 730.1, 630.4, 450.1],
            ["商品三", 820.4, 630.9, 490.1],
          ],
          // source: [
          //   [
          //     "store",
          //     "Matcha Latte",
          //     "Milk Tea",
          //     "Walnut Brownie",
          //     "金額成長比",
          //   ],
          //   ["A門市", 430.3, 830.1, 720.4, 20],
          //   ["B門市", 850.8, 730.4, 530.9, 30],
          //   ["C門市", 930.7, 550.1, 390.1, 60],
          // ],
        },

        series: [
          { type: "bar" },
          { type: "bar" },
          { type: "bar" },
          {
            type: "line",
            name: "金額成長比",
            smooth: true,
            yAxisIndex: 1,
            data: [20, 50, 90],
            tooltip: {
              valueFormatter: function (value) {
                return value + " %";
              },
            },
            // seriesLayoutBy: "row",
          },
        ],
      },
    };
  },
  mounted() {
    this.initOption();
    // axios
    //   .get(
    //     `${process.env.VUE_APP_BASE_API}/v1/product/category/combination_product_ticket?store_id=0`,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${process.env.VUE_APP_TOKEN}`, // Bearer 跟 token 中間有一個空格
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err.response.data.message);
    //   });
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
    change() {
      if (this.$refs.changeChart.checked) {
        this.option.series.forEach((element) => {
          element.seriesLayoutBy = "row";
        });
      } else {
        this.option.series.forEach((element) => {
          element.seriesLayoutBy = "";
        });
      }
      console.log(this.option);
      this.changeChart(this.option);
    },
  },
};
</script>

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
      Previous: {},
      addArray: [],
      nowModal: "",
      option: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
          valueFormatter: function (value) {
            return value + "萬";
          },
        },
        legend: {},
        xAxis: [
          {
            type: "category",
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "金額",
            min: 0,
            max: 1000,
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
            [
              "product",
              "商品一",
              "商品二",
              "商品三",
              "商品四",
              "商品五",
              "商品六",
              "金額成長比",
            ],
            ["門市一", 330.3, 950.8, 160.7, 250.3, 320, 852, 20],
            ["門市二", 730.1, 630.4, 450.1, 600, 550, 591, 60],
            ["門市三", 820.4, 630.9, 490.1, 299, 156, 300, 90],
            ["門市四", 520.4, 430.9, 190.1, 999, 556, 400, 40],
            ["門市五", 620.4, 130.9, 590.1, 554, 756, 100, 100],
            // ["門市四", 620.4, 530.9, 990.1, 399, 10],
            // ["金額成長比", 20, 60, 90],
          ],
        },

        series: [
          {
            type: "bar",
            emphasis: {
              focus: "series",
            },
          },
          {
            type: "bar",
            emphasis: {
              focus: "series",
            },
          },
          {
            type: "bar",
            emphasis: {
              focus: "series",
            },
          },
          {
            type: "bar",
            emphasis: {
              focus: "series",
            },
          },
          {
            type: "bar",
            emphasis: {
              focus: "series",
            },
          },
          {
            type: "bar",
            emphasis: {
              focus: "series",
            },
          },
          {
            type: "line",
            smooth: true,
            yAxisIndex: 1,
            tooltip: {
              valueFormatter: function (value) {
                return value + " %";
              },
            },
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
      this.addArray = [];
      if (this.$refs.changeChart.checked) {
        this.option.series.forEach((element) => {
          element.seriesLayoutBy = "row"; // 將排序方法變成row
          // element.emphasis.focus = "series";
        });
        this.option.dataset.source.forEach((e) => {
          this.addArray.push(e.pop());
        });
        this.option.dataset.source.push(this.addArray);
        this.row_reorganize();
      } else {
        this.option.series.forEach((element) => {
          element.seriesLayoutBy = ""; // 將排序方法清除因默認排序方法是column
        });
        this.addArray = this.option.dataset.source.pop();
        this.option.dataset.source.forEach((e) => {
          e.push(this.addArray.shift());
        });
        this.column_reorganize();
      }
      console.log(this.option);
      this.initChart(this.nowModal, this.option);
      // this.changeChart(this.option);
    },
    column_reorganize() {
      // 當是以column排法時series的數量永遠都要比source少一個
      const count =
        this.option.dataset.source[0].length - this.option.series.length - 1;
      for (let i = 0; i < count; i++) {
        this.option.series.splice(-1, 0, {
          type: "bar",
          emphasis: {
            focus: "series",
          },
        }); // 將缺少的series補足
      }
    },
    row_reorganize() {
      // 當是以row排法時series的數量永遠都要比source多一個
      let count = this.option.dataset.source.length - this.option.series.length;
      // console.log(count);
      while (count < 1) {
        count++;
        this.option.series.shift(); // 將多的series刪除
      }
      // while (count > 1) {
      //   count--;
      //   this.option.series.splice(-1, 0, { type: "bar" }); // 將缺少的series補足
      // }
    },
  },
};
</script>

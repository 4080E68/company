<template>
  <div class="d-flex ms-4">
    <canvas id="mycanvas" width="110" height="40" ref="mycanvas"></canvas>
    <button type="button" class="btn px-0" @click="setValidateCode">
      <img src="@/assets/icons/login_renew_s.png" alt="" />
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fontColors: "#000079",
      bgColors: ["#B22222", "#F9F900", "#82D900", "#FFAF60"],
      validateCode: "",
      bgImage: require("@/assets/images/validateCode_bg.jpg"),
    };
  },
  methods: {
    // 生成隨機顏色組合序號
    randColor() {
      const indexColor = Math.floor(Math.random() * this.bgColors.length); //亂數取得 0~顏色陣列長度
      return indexColor;
    },
    // 生成 5 位隨機數
    randValidateCode() {
      this.validateCode = "";
      const str = "0123456789";
      const arr = str.split("");
      let ranNum;
      for (var i = 0; i < 5; i++) {
        ranNum = Math.floor(Math.random() * 9);
        this.validateCode += arr[ranNum];
      }
      this.$emit("validateCode", this.validateCode);
      return this.validateCode;
    },
    // 干擾線的隨機 x 坐標值
    lineX() {
      const ranLineX = Math.floor(Math.random() * 110);
      return ranLineX;
    },
    // 干擾線的隨機 Y 坐標值
    lineY() {
      const ranLineY = Math.floor(Math.random() * 40);
      return ranLineY;
    },
    // 生成干擾線 2 條
    setBackgroudLine(cxt) {
      for (var j = 0; j < 2; j++) {
        cxt.beginPath();
        cxt.strokeStyle = this.bgColors[this.randColor()];
        cxt.moveTo(0, this.lineY()); //起始點座標
        cxt.lineTo(150, this.lineY()); //從起始點畫一條直線到指定的(x, y)座標點
        cxt.lineWidth = (Math.floor(Math.random() * (20 - 10 + 1)) + 10) / 10; //亂數 取得介於1~2之間的值
        cxt.stroke();
        cxt.closePath();
      }
    },
    setBackgroudImage() {
      const img = new Image();
      img.src = this.bgImage;
      return img;
    },
    // 設置驗整碼
    setValidateCode() {
      const mycanvas = document.getElementById("mycanvas");
      const cxt = mycanvas.getContext("2d"); // canvas getContext 渲染環境
      mycanvas.width = mycanvas.width;
      mycanvas.height = mycanvas.height;
      cxt.drawImage(
        this.setBackgroudImage(),
        this.lineX(),
        this.lineY(),
        110,
        40,
        0,
        0,
        110,
        40
      );
      this.setBackgroudLine(cxt);
      cxt.fillStyle = this.fontColors; //隨機文字顏色
      cxt.font = "bold 24px Verdana"; // 驗證碼的 font style
      cxt.fillText(this.randValidateCode(), 10, 30); // 把驗證碼填充到 canvas中
      this.$refs.mycanvas.style.backgroundImage =
        "url('/static/img/validateCode_bg.17dbdcdd.jpg')";
    },
  },
  mounted() {
    this.setValidateCode();
  },
};
</script>

<template>
  <div
    :style="{
      'background-image': 'url(' + BackgroundImage + ')',
    }"
    class="position-relative bg-center ms-n2 bk"
  >
    <p
      v-if="!isMobile"
      class="fixedBottomCenter text-white text-center"
      ref="reference"
      style="margin-bottom: 92px"
    >
      v 2.103.4<br />
      Copyright © 2022 La Fresh Information, All rights reserved.
    </p>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  padding-top: 30%;
}
.bk {
  object-fit: cover;
  background-position: center;
  min-height: 160px;
  @media screen and (max-width: 540px) {
    padding: 0;
    margin: 0;
  }
}
</style>

<script>
export default {
  data() {
    return {
      windowWidth: 0,
      BackgroundImage: require("@/assets/images/login_web_logo.png"), // 使用require可綁定本地圖片
      isMobile: false,
    };
  },
  methods: {},
  mounted() {
    this.windowWidth = window.innerWidth;
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 576) {
        this.BackgroundImage = require("@/assets/images/login_mobile_logo.png"); // 小於576時換手機背景
        this.isMobile = true;
        this.$emit("isMobile", true);
      } else {
        this.BackgroundImage = require("@/assets/images/login_web_logo.png");
        this.isMobile = false;
        this.$emit("isMobile", false);
      }
    });
    if (this.windowWidth <= 576) {
      this.BackgroundImage = require("@/assets/images/login_mobile_logo.png"); // 小於576時換手機背景
      this.isMobile = true;
      this.$emit("isMobile", true);
    } else {
      this.BackgroundImage = require("@/assets/images/login_web_logo.png");
      this.isMobile = false;
      this.$emit("isMobile", false);
    }
  },
};
</script>

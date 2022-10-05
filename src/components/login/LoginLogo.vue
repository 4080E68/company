<template>
  <div :style="{'background-image': 'url(' + require('@/assets/images/login_web_bg.png') + ')'}"
      class="position-relative bg-center ms-n2">
    <img src="@/assets/images/login_logo.png" class="logo d-flex mx-auto"
        alt="lafresh cloud wise 管理系統">
    <p class="fixedBottomCenter text-white text-center mb-5">
        v 2.103.4<br>
        Copyright © 2022 La Fresh Information, All rights reserved.
    </p>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  padding-top: 30%;
}
</style>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-6 p-0">
        <LoginLogo @isMobile="changeMobile" />
      </div>
      <div class="col-md-6 d-flex flex-column justify-content-between">
        <LoginForm />
        <div
          class="copyright text-center d-flex align-items-center justify-content-center"
          v-if="isMobile"
        >
          v 2.103.4 <br />
          Copyright © 2022 La Fresh Information. <br />
          All rights reserved.
        </div>
        <!-- style="color: #9f9f9f; margin-bottom: 18px; height: 15vh" -->
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@import "@/style/_index.scss";
</style>

<script>
import LoginForm from "@/components/login/LoginForm.vue";
import LoginLogo from "@/components/login/LoginLogo.vue";
import emitter from "@/methods/emitter";

export default {
  data() {
    return {
      isMobile: false,
    };
  },
  components: {
    LoginForm,
    LoginLogo,
  },
  methods: {
    changeMobile(data) {
      this.isMobile = data;
    },
  },
  provide() {
    return { emitter };
  },
};
</script>

<style lang="scss" scoped>
// .logo {
//   padding-top: 30%;
// }
</style>

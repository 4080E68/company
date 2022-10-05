<template>
  <div class="container-fluid">
    <div class="row vh100">
      <div class="col-md-6">
        <LoginLogo />
      </div>
      <div class="col-md-6">
        <LoginForm />
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/login/LoginForm.vue';
import LoginLogo from '@/components/login/LoginLogo.vue';

export default {
  components: {
    LoginForm,
    LoginLogo,
  },
};
</script>

<style lang="scss" scoped>
.logo {
  padding-top: 30%;
}
</style>
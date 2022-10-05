<template>
  <div class="d-flex justify-content-center pt-5 vh100">
    <Form v-slot="{ errors }" @submit="login" class="loginForm mt-5">
      <div class="d-column mb-3">
        <label for="taxId" class="mb-1">公司統編</label>
        <Field id="taxId" name="公司統編" type="number" rules="required" oninput="value=value.replace(/[^\d]/g,'')"
              class="formInput" :class="{ 'is-invalid': errors['公司統編'] }"
              placeHolder="例如: 24436074" />
        <ErrorMessage class="text-danger invalid-feedback" name="公司統編" />
      </div>

      <div class="d-column mb-3">
        <label for="account" class="mb-1">帳號</label>
        <Field id="account" name="帳號" type="text" rules="required"
              class="formInput" :class="{ 'is-invalid': errors['帳號'] }" 
              placeHolder="例如: LaFresh" />
        <ErrorMessage class="text-danger invalid-feedback" name="帳號" />
      </div>

      <div class="mb-3">
        <label for="password" class="mb-1">密碼</label>
        <div class="position-relative">
          <Field id="password" name="密碼" :type="showPassword ? 'text' : 'password'" rules="required" aria-describedby="togglePassword"
                 class="passwordInput formInput w-100" :class="{ 'is-invalid': errors['密碼'] }" 
                placeHolder="6 - 8 英數混合，注意大小寫" />
          <button class="togglePasswordBtn btn" type="button" id="togglePassword" @click="showPassword = !showPassword">
            <img v-if="!showPassword" src="@/assets/icons/login_close_eye.png" alt="隱藏密碼">
            <img v-else src="@/assets/icons/login_open_eye.png" alt="顯示密碼">
          </button>
          <ErrorMessage class="text-danger invalid-feedback" name="密碼" />
        </div>
      </div>
    
      <div class="d-between mb-3">
        <div class="d-column mb-3">
          <label for="valildId" class="mb-1">驗證碼</label>
          <Field id="valildId" name="驗證碼" type="text" rules="required" oninput="value=value.replace(/[^\d]/g,'')"
                class="formInput" :class="{ 'is-invalid': errors['驗證碼'] }"
                placeHolder="輸入認證碼" />
          <ErrorMessage class="text-danger invalid-feedback" name="驗證碼" />
        </div>
        <ValidationCode />
      </div>

      <div class="d-center mb-4">
        <div class="form-check">
          <input class="rememberMeInput form-check-input" type="checkbox" value="" id="rememberMe">
          <label class="form-check-label" for="rememberMe">記住我</label>
        </div>
        <span class="mx-2">|</span>
        <router-link to="/login">忘記密碼</router-link>
      </div>

      <button type="button" class="btn btn-primary text-white fw-bold rounded-pill w-100 mb-3">登入</button>
      <a href="https://www.lafresh.com.tw/Shopping/" class="text-primary text-center">我要申購服務</a>
    </Form>
  </div>
</template>

<script>
import { Field, Form, ErrorMessage } from 'vee-validate';
import ValidationCode from '@/components/login/ValidationCode.vue';


export default {
  data() {
    return {
      showPassword: false,
    };
  },
  components: {
    Field,
    Form,
    ErrorMessage,
    ValidationCode,
  },
  methods: {
    login() {
      console.log("login");
    },
    togglePassword() {
      showPassword = !showPassword;
      if(showPassword) {

      }
    }
  },
};
</script>

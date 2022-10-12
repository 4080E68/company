<template>
  <div class="d-flex justify-content-center vh100 form">
    <Form v-slot="{ errors }" @submit="login" class="loginForm">
      <div class="d-column mb-3">
        <label for="taxId" class="mb-1">公司統編</label>
        <Field
          id="taxId"
          name="公司統編"
          type="number"
          rules="required"
          oninput="value=value.replace(/[^\d]/g,'')"
          class="formInput"
          :class="{ 'is-invalid': errors['公司統編'] }"
          placeHolder="例如: 24436074"
          v-model="userData.taxId"
        />
        <ErrorMessage class="text-danger invalid-feedback" name="公司統編" />
      </div>

      <div class="d-column mb-3">
        <label for="account" class="mb-1">帳號</label>
        <Field
          id="account"
          name="帳號"
          type="text"
          rules="required"
          class="formInput"
          :class="{ 'is-invalid': errors['帳號'] }"
          placeHolder="例如: LaFresh"
          v-model="userData.account"
        />
        <ErrorMessage class="text-danger invalid-feedback" name="帳號" />
      </div>

      <div class="mb-3">
        <label for="password" class="mb-1">密碼</label>
        <div class="position-relative">
          <Field
            id="password"
            name="密碼"
            :type="showPassword ? 'text' : 'password'"
            rules="required"
            aria-describedby="togglePassword"
            class="passwordInput formInput w-100"
            :class="{ 'is-invalid': errors['密碼'] }"
            placeHolder="6 - 8 英數混合，注意大小寫"
            v-model="userData.password"
          />
          <button
            class="togglePasswordBtn btn"
            type="button"
            id="togglePassword"
            @click="showPassword = !showPassword"
          >
            <img
              v-if="!showPassword"
              src="@/assets/icons/login_close_eye.png"
              alt="隱藏密碼"
            />
            <img
              v-else
              src="@/assets/icons/login_open_eye.png"
              alt="顯示密碼"
            />
          </button>
          <ErrorMessage class="text-danger invalid-feedback" name="密碼" />
        </div>
      </div>

      <div class="d-between mb-3">
        <div class="row d-flex align-items-center">
          <div class="d-column mb-3 col-6 pe-0">
            <label for="valildId" class="mb-1">驗證碼</label>
            <Field
              id="valildId"
              name="驗證碼"
              type="text"
              rules="required"
              oninput="value=value.replace(/[^\d]/g,'')"
              class="formInput"
              :class="{ 'is-invalid': errors['驗證碼'] || eMessage }"
              placeHolder="輸入認證碼"
              v-model="inputValidateCode"
            />
            <span
              v-if="eMessage && inputValidateCode !== ''"
              class="errorMessage"
              >{{ eMessage }}</span
            >
            <ErrorMessage class="text-danger invalid-feedback" name="驗證碼" />
          </div>
          <div class="d-column col-6 align-items-center">
            <ValidationCode @validateCode="changeValidate" />
          </div>
        </div>
      </div>

      <div class="d-center mb-4 fs-8 text-color1">
        <div class="form-check mb-0 d-flex align-items-center">
          <input
            class="rememberMeInput form-check-input me-1"
            type="checkbox"
            value=""
            id="rememberMe"
            ref="rememberMe"
          />
          <label class="form-check-label fw-normal" for="rememberMe"
            >記住我</label
          >
        </div>
        <span class="mx-2">|</span>
        <router-link class="text-decoration-none text-color1" to="/login"
          >忘記密碼？</router-link
        >
      </div>

      <button
        @click="ValidateCode()"
        type="submit"
        class="btn btn-primary text-white fw-bold rounded-pill w-100 mb-3"
      >
        登入
      </button>
      <a
        href="https://www.lafresh.com.tw/Shopping/"
        class="text-primary text-center"
        >我要申購服務</a
      >
    </Form>
  </div>
</template>
<style lang="scss">
@import "@/style/components/login";
</style>

<script>
import { Field, Form, ErrorMessage } from "vee-validate";
import ValidationCode from "@/components/login/ValidationCode.vue";
import { Base64 } from "js-base64";
// import { encode, decode } from "js-base64";

export default {
  data() {
    return {
      showPassword: false,
      nowValidateCode: "",
      eMessage: "",
      inputValidateCode: "",
      userData: {},
      verify: false,
    };
  },
  components: {
    Field,
    Form,
    ErrorMessage,
    ValidationCode,
  },
  watch: {
    inputValidateCode: function () {
      this.eMessage = "";
    },
  },
  methods: {
    ValidateCode() {
      if (
        this.inputValidateCode !== this.nowValidateCode &&
        this.inputValidateCode !== ""
      ) {
        this.eMessage = "驗證碼錯誤";
      } else {
        this.eMessage = ""; // 驗證成功
        this.verify = true;
      }
    },
    login(value) {
      console.log(value);
      if (this.$refs.rememberMe.checked && this.verify) {
        // 驗證碼正確且有勾選記住我
        localStorage.clear();
        localStorage.setItem(
          "userData",
          Base64.encode(JSON.stringify(this.userData))
        );
        // 前往登入後頁面
        this.verify = false; // 驗證改為否
        console.log("登入且有勾選記住功能");
      } else if (!this.$refs.rememberMe.checked && this.verify) {
        this.verify = false;
        // 前往登入後頁面
        console.log("登入");
      }
    },
    togglePassword() {
      showPassword = !showPassword;
      if (showPassword) {
      }
    },
    taxId(value = "") {
      if (value !== "") {
        return value.toString().length === 8 ? true : "公司統編長度需為8";
      } else {
        return "請輸入 公司統編";
      }
    },
    changeValidate(value) {
      this.nowValidateCode = value;
    },
  },
  created() {
    if (localStorage.getItem("userData")) {
      this.userData = JSON.parse(
        Base64.decode(localStorage.getItem("userData"))
      );
    }
  },
};
</script>

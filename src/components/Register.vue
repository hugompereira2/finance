<script setup>
import { ref } from "vue";
import finance from "../assets/finance.svg";
import { useRouter, RouterLink } from "vue-router";
import { Form, Field, ErrorMessage } from "vee-validate";
import {
  getAuth,
  updateProfile,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  validateEmail,
  validatePassword,
  validateName,
} from "../validation/validation";

const email = ref("");
const isLoading = ref(false);
const errorMessageApi = ref(null);
const name = ref("");
const password = ref("");

const router = useRouter();

const register = async (value) => {
  try {
    isLoading.value = true;
    await createUserWithEmailAndPassword(getAuth(), value.email, value.password)
      .then(function () {
        updateProfile(getAuth().currentUser, {
          displayName: value.name,
        });

        const user = getAuth().currentUser;
        localStorage.setItem(
          "user",
          JSON.stringify({
            token: user.accessToken,
            email: user.email,
            name: value.name,
          })
        );

        router.push("/finance");
      })
      .catch(function (error) {
        errorMessageApi.value = error;
      });
  } catch (error) {
    errorMessageApi.value = error.message;
  }
  isLoading.value = false;
};
</script>

<template>
  <div class="register">
    <img class="finance-logo" :src="finance" alt="Finance" />
    <h1>Register</h1>
    <h4 class="red-error">{{ errorMessageApi }}</h4>
    <Form @submit="register">
      <div class="form-input">
        <label for="username">E-mail</label>
        <Field
          id="email"
          name="email"
          type="text"
          v-model="email"
          :rules="validateEmail"
        />
        <ErrorMessage class="red-error" name="email" />
      </div>
      <div class="form-input">
        <label for="name">Name</label>
        <Field
          id="name"
          name="name"
          type="text"
          v-model="name"
          :rules="validateName"
        />
        <ErrorMessage class="red-error" name="name" />
      </div>
      <div class="form-input">
        <label>Password</label>
        <Field
          type="password"
          name="password"
          v-model="password"
          :rules="validatePassword"
        />
        <ErrorMessage class="red-error" name="password" />
      </div>
      <router-link to="/login">Already have an account</router-link>
      <div class="submit-action">
        <button :disabled="isLoading" type="submit">Register</button>
      </div>
    </Form>
  </div>
</template>

<style scoped>
h1,
h3,
label {
  text-align: center;
}
label {
  text-align: start;
  margin-bottom: calc(0.375rem + 1px);
}
input {
  height: 35px;
  border-radius: 0.375rem;
  border: 1px solid #ced4da;
  padding: 0.375rem 0.75rem;
}
input:focus {
  outline: none !important;
  border: 2px solid rgb(153, 167, 248);
  box-shadow: 0 0 5px #719ece;
}
form {
  padding-top: 24px;
}
button[disabled] {
  opacity: 0.6;
  cursor: not-allowed !important;
}
button[type="submit"] {
  border: none;
  color: white;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: opacity 0.6s;
  letter-spacing: 0.1rem;
  border-radius: 12px;
  height: 35px;
  width: 100%;
  background: #143fef;
}
button[type="submit"]:hover {
  opacity: 0.85;
}
.finance-logo {
  height: 80px;
  width: 100%;
}
.submit-action {
  width: 100%;
  text-align: center;
  margin-top: 12px;
}
.form-input {
  user-select: none;
  display: flex;
  flex-direction: column;
  margin: 12px 0 24px;
}
.register {
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-content: center;
  width: 460px;
  background: white;
  padding: 24px 24px 12px 24px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
@media screen and (max-width: 500px) {
  .register {
    width: 100vw;
    height: 100vh;
    justify-content: center;
  }
}
</style>

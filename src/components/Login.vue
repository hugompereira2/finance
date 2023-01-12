<script setup>
import finance from "../assets/svg/finance.svg";
import { useRouter, RouterLink } from "vue-router";
import { Form, Field, ErrorMessage } from "vee-validate";
import { validateEmail, validatePassword } from "../validation/validation";
import { getUserLocalStorage } from "../helper/helper";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { onMounted, ref } from "vue";

const email = ref("");
const password = ref("");
const errorMessageApi = ref(null);

const router = useRouter();

const verifyUserLoggedin = () => {
  const user = getUserLocalStorage();
  if (user) router.push("/finance");
};

const login = async (values) => {
  signInWithEmailAndPassword(getAuth(), values.email, values.password)
    .then((userCredential) => {
      localStorage.setItem(
        "user",
        JSON.stringify({
          token: userCredential.user.accessToken,
          email: userCredential.user.email,
          name: userCredential.user.displayName,
        })
      );
      router.push("/finance");
    })
    .catch((error) => {
      const errorMessage = error.message;
      errorMessageApi.value = errorMessage;
    });
};

onMounted(verifyUserLoggedin);
</script>

<template>
  <div class="login">
    <img class="finance-logo" :src="finance" alt="Finance" />
    <h1>Login</h1>
    <h3>Enter your E-mail and Password</h3>
    <h4 class="red-error">{{ errorMessageApi }}</h4>
    <Form @submit="login">
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
        <label>Password</label>
        <Field
          type="password"
          name="password"
          v-model="password"
          :rules="validatePassword"
        />
        <ErrorMessage class="red-error" name="password" />
      </div>
      <router-link to="/register">Create Account</router-link>
      <div class="submit-action">
        <button type="submit">Login</button>
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
.login {
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
  .login {
    width: 100vw;
    height: 100vh;
    justify-content: center;
  }
}
</style>

<script setup>
import WelcomeItem from "./WelcomeItem.vue";
import DocumentationIcon from "./icons/IconDocumentation.vue";
import ToolingIcon from "./icons/IconTooling.vue";
import EcosystemIcon from "./icons/IconEcosystem.vue";
import CommunityIcon from "./icons/IconCommunity.vue";
import SupportIcon from "./icons/IconSupport.vue";
import { useRouter, RouterLink } from "vue-router";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";

const email = ref("");
const name = ref("");
const password = ref("");

const router = useRouter();

const register = async (e) => {
  try {
    e.preventDefault();

    const resp = await createUserWithEmailAndPassword(
      getAuth(),
      email.value,
      password.value
    );

    // await resp?.updateProfile({
    //   displayName: "Hugo",
    // });

    // console.log(user);

    localStorage.setItem(
      "user",
      JSON.stringify({
        token: resp.user.accessToken,
        email: resp.user.email,
        name: resp.user.displayName,
      })
    );
    router.push("/finance");

    // createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    //   .then((userCredential) => {
    //     // Signed in
    //     userCredential
    //       .updateProfile({
    //         displayName: "Hugo",
    //       })
    //       .then((user) => {
    //         console.log(user);
    //         localStorage.setItem(
    //           "user",
    //           JSON.stringify({
    //             token: userCredential.user.accessToken,
    //             email: userCredential.user.email,
    //             name: userCredential.user.displayName,
    //           })
    //         );
    //         router.push("/finance");
    //       });
    //     // ...
    //   })
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
  }
};
</script>

<template>
  <div class="login">
    <h1>Login</h1>
    <h3>Enter your Username and Password</h3>
    <form>
      <div class="form-input">
        <label for="username">E-mail</label>
        <input id="email" name="email" type="text" v-model="email" />
      </div>
      <!-- <div class="form-input">
        <label for="name">Name</label>
        <input id="name" name="name" type="text" v-model="name" />
      </div> -->
      <div class="form-input">
        <label>Password</label>
        <input type="password" name="password" v-model="password" />
      </div>
      <router-link to="/about">Create Account</router-link>
      <div class="submit-action">
        <button @click="register" type="submit">Login</button>
      </div>
    </form>
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
</style>

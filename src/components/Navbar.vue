<script setup>
import finance from "../assets/svg/finance.svg";
import user_icon from "../assets/svg/user.svg";
import user_white from "../assets/svg/user_white.svg";
import arrow_down from "../assets/svg/arrow_down.svg";
import logout from "../assets/svg/logout.svg";
import logout_white from "../assets/svg/logout_white.svg";
import close from "../assets/svg/close.svg";
import { useRouter, RouterLink } from "vue-router";
import { getAuth, onIdTokenChanged } from "firebase/auth";
import { getUserLocalStorage } from "../helper/helper";
import { computed, ref } from "vue";

const showModal = ref(false);
const showModalMobile = ref(false);
const user = computed(() => getUserLocalStorage());
const auth = getAuth();

const router = useRouter();

onIdTokenChanged(auth, async (userCredential) => {
  if (userCredential) {
    if (user.value.token != userCredential.accessToken) {
      handleLogout();
    }
  }
});

const handleLogout = () => {
  localStorage.removeItem("user");
  router.push("/");
};
</script>

<template>
  <div class="navbar-container">
    <div class="navbar" v-if="user">
      <img class="finance-logo" :src="finance" alt="Finance" />
      <div class="user" @click="showModal = !showModal">
        <img class="user-icon" :src="user_icon" alt="user" />
        <div class="user-info">
          <span class="user-name">{{ user.name }}</span>
          <div class="user-arrow">
            <small class="black">Usuário</small>
            <img class="arrow-down-icon" :src="arrow_down" alt="arrow_down" />
          </div>
        </div>
        <div v-show="showModal" class="modal-user">
          <div class="modal-user-line" @click="handleLogout">
            <span class="black">Logout </span>
            <img class="logout-icon" :src="logout" alt="logout" />
          </div>
        </div>
      </div>
      <div v-show="showModalMobile" class="modal-user-mobile">
        <div class="user-mobile">
          <img class="user-white-icon" :src="user_white" alt="user_white" />
          <span class="user-name">{{ user.name }}</span>
          <div class="user-arrow">
            <small>Usuário</small>
          </div>
        </div>
        <div class="modal-user-line" @click="handleLogout">
          <span>Logout </span>
          <img class="logout-white-icon" :src="logout_white" alt="logout" />
        </div>
        <img
          @click="showModalMobile = false"
          class="close-icon"
          :src="close"
          alt="close"
        />
      </div>
      <div class="hamburguer" @click="showModalMobile = true">
        <div />
        <div />
        <div />
      </div>
    </div>
  </div>
</template>

<style scoped>
.navbar-container {
  max-width: 1440px;
  margin: 0 auto;
}
.navbar {
  display: flex;
  justify-content: space-between;
  gap: 24px 0;
  align-items: center;
  padding-right: 24px;
  min-height: 90px;
  width: 100%;
  background: white;
}
.finance-logo {
  user-select: none !important;
  width: 200px;
  height: 80px;
}
.black {
  color: black !important;
}
.user-name {
  font-weight: 600;
  font-size: 1rem;
}
.modal-user {
  position: absolute;
  padding: 12px;
  min-width: 120px;
  display: flex;
  justify-content: center;
  top: 2.9rem;
  width: 100%;
  background: #d5d5d6;
  z-index: 999;
  border-radius: 8px;
}
.logout-icon {
  margin-left: 12px;
  height: 31px;
  width: 18px;
}
.logout-white-icon {
  margin-left: 12px;
  height: 20px;
  width: 25px;
}
.close-icon {
  position: absolute;
  cursor: pointer;
  top: 15px;
  right: 45px;
  width: 25px;
  background: transparent;
  height: 25px;
}
.modal-user-line {
  width: 100%;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.1rem;
  font-weight: 600;
}
.modal-user-line > span {
  color: white;
  font-weight: 500;
}
.user-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
}
.arrow-down-icon {
  margin-left: 5px;
  height: 16px;
  width: 18px;
}
.user-icon {
  width: 28px;
  height: 28px;
  margin-right: 12px;
  border-radius: 12px;
}
.user-white-icon {
  width: 50px;
  height: 50px;
}
.user-mobile {
  display: flex;
  flex-direction: column;
  height: 150px;
  gap: 10px 0;
  justify-content: center;
  align-items: center;
}
.user-mobile > img {
  margin-right: 0;
}
.user-mobile > span,
small {
  font-weight: 600;
  color: white;
}
.modal-user-mobile {
  position: fixed;
  padding: 42px 24px;
  left: 0;
  top: 0;
  overflow: hidden;
  z-index: 1;
  overflow: hidden;
  height: 100vh;
  width: 100vw;
  background: #313a46;
}
.user {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.user-info {
  display: flex;
  flex-direction: column;
}
.hamburguer {
  cursor: pointer;
  display: none;
  flex-direction: column;
}
.hamburguer > div {
  height: 6px;
  width: 28px;
  background: rgb(65, 64, 64);
  border-radius: 12px;
  margin: 1px 0;
}
@media screen and (max-width: 500px) {
  .navbar {
    min-height: 70px !important;
    padding: 0 24px;
  }
  .hamburguer {
    display: flex;
  }
  .user {
    display: none;
  }
  .finance-logo {
    height: 50px;
    width: auto;
  }
}
</style>

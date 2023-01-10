<script setup>
import { useRouter, RouterLink } from "vue-router";
import finance from "../assets/finance.svg";
import user from "../assets/user.svg";
</script>

<template>
  <div class="navbar">
    <img class="finance-logo" :src="finance" alt="Finance" />
    <div class="user">
      <img class="user-icon" :src="user" alt="user" />
      <div class="user-info">
        <span>Hugo Mendonça Pereira</span>
        <small>Usuário</small>
      </div>
    </div>
  </div>
</template>

<style scoped>
.finance-logo {
  user-select: none !important;
  width: 200px;
  height: 80px;
}
.user-icon {
  width: 28px;
  height: 28px;
  margin-right: 12px;
  border-radius: 12px;
  background: #d5d5d6;
}
.user {
  display: flex;
  align-items: center;
}
.user-info {
  display: flex;
  flex-direction: column;
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
</style>

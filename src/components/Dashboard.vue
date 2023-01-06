<script setup>
import { onMounted, ref } from "vue";
import WelcomeItem from "./WelcomeItem.vue";
import DocumentationIcon from "./icons/IconDocumentation.vue";
import ToolingIcon from "./icons/IconTooling.vue";
import EcosystemIcon from "./icons/IconEcosystem.vue";
import CommunityIcon from "./icons/IconCommunity.vue";
import axios from "axios";
import SupportIcon from "./icons/IconSupport.vue";
import { useRouter, RouterLink } from "vue-router";
import { getFinance } from "../api/index";

const items = [
  { message: "Foo" },
  { message: "Bar" },
  { message: "Bar" },
  { message: "Bar" },
  { message: "Bar" },
  { message: "Bar" },
  { message: "Bar" },
  { message: "Bar" },
];

const finance = ref();

const loadFinance = async () => {
  // finance.value = await getFinance();
  console.log(finance);
};

onMounted(loadFinance);
</script>

<template>
  <div class="dashboard">
    <h1>COTAÇÃO DAS PRINCIPAIS MOEDAS PARA O REAL</h1>
    <div class="flex-row">
      <div class="column-item" v-for="(item, index) in items" :key="index">
        <small :class="{ green: 1 > 0, red: finance < 0 }">-1,394%</small>
        <span>R$ 3,62</span>
        <span>USD DÓLAR / BRL REAL</span>
      </div>
    </div>
    <h1>COTAÇÃO DO BITCOIN NAS PRINCIPAIS CORRETORAS</h1>
    <div class="flex-row">
      <div class="column-item" v-for="(item, index) in items" :key="index">
        <small :class="{ green: 1 > 0, red: finance < 0 }">-1,394%</small>
        <span>R$ 3,62</span>
        <span>USD DÓLAR / BRL REAL</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 24px;
}
span,
small {
  padding: 3px 5px;
  border-radius: 10px;
  color: white;
}
.green {
  background: green;
}
.red {
  background: red;
}
.flex-row {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px 15px;
}
.column-item {
  min-width: 290px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.dashboard {
  padding: 25px;
  border-radius: 12px;
  background: #313a46;
}
</style>
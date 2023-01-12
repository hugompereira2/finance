<script setup>
import { onMounted, ref } from "vue";
import DashboardItem from "./DashboardItem.vue";
import Loading from "vue3-loading-overlay";
import { useRouter } from "vue-router";
import { getFinance } from "../api/index";

const currencies = ref();
const isLoading = ref(true);
const stocks = ref();

const loadFinance = async () => {
  const { data } = await getFinance();

  delete data.results.currencies.source;

  currencies.value = data.results.currencies;
  stocks.value = data.results.stocks;
  isLoading.value = false;
};

onMounted(loadFinance);
</script>

<template>
  <div class="dashboard-container">
    <div class="dashboard">
      <template v-if="isLoading">
        <div class="centered-loading">
          <Loading
            :active="isLoading"
            :can-cancel="false"
            :is-full-page="true"
          ></Loading>
        </div>
      </template>
      <template v-else>
        <DashboardItem
          v-if="currencies"
          title="COTAÇÃO DAS PRINCIPAIS MOEDAS PARA O REAL"
          :items="currencies"
          divider
          origin
        />
        <DashboardItem
          v-if="stocks"
          title="ÍNDICES DE BOLSAS DE VALORES PELO MUNDO"
          :items="stocks"
        />
      </template>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  background: #313a46;
}
.dashboard {
  max-width: 1440px;
  min-height: calc(100vh - 90px);
  padding: 32px 25px;
  margin: 0 auto;
  background: #313a46;
}
.centered-loading {
  display: flex;
  min-height: inherit;
  justify-content: center;
  align-items: center;
}
h1 {
  text-align: center;
  margin-bottom: 42px;
}
span,
small {
  padding: 3px 5px;
  border-radius: 10px;
  color: white;
}
</style>
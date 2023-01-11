<script setup>
import { onMounted, ref } from "vue";
import WelcomeItem from "./WelcomeItem.vue";
import DashboardItem from "./DashboardItem.vue";
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

const resp = {
  by: "default",
  valid_key: true,
  results: {
    currencies: {
      source: "BRL",
      USD: {
        name: "Dollar",
        buy: 5.1894,
        sell: 5.1873,
        variation: -0.039,
      },
      EUR: {
        name: "Euro",
        buy: 5.4381,
        sell: 5.4381,
        variation: -0.474,
      },
      GBP: {
        name: "Pound Sterling",
        buy: 6.3337,
        sell: null,
        variation: -0.353,
      },
      ARS: {
        name: "Argentine Peso",
        buy: 0.0309,
        sell: null,
        variation: -0.454,
      },
      CAD: {
        name: "Canadian Dollar",
        buy: 3.856,
        sell: null,
        variation: -0.23,
      },
      AUD: {
        name: "Australian Dollar",
        buy: 3.5155,
        sell: null,
        variation: -0.602,
      },
      JPY: {
        name: "Japanese Yen",
        buy: 0.0383,
        sell: null,
        variation: -0.132,
      },
      CNY: {
        name: "Renminbi",
        buy: 0.7387,
        sell: null,
        variation: 0.237,
      },
      BTC: {
        name: "Bitcoin",
        buy: 93013.134,
        sell: 93013.134,
        variation: -0.037,
      },
    },
    stocks: {
      IBOVESPA: {
        name: "BM&F BOVESPA",
        location: "Sao Paulo, Brazil",
        points: 111945.84,
        variation: 0.92,
      },
      IFIX: {
        name: "Índice de Fundos de Investimentos Imobiliários B3",
        location: "Sao Paulo, Brazil",
        points: 2886.3,
        variation: 0.29,
      },
      NASDAQ: {
        name: "NASDAQ Stock Market",
        location: "New York City, United States",
        points: 11312.21,
        variation: -1.48,
      },
      DOWJONES: {
        name: "Dow Jones Industrial Average",
        location: "New York City, United States",
        points: 34395.01,
        variation: 0,
      },
      CAC: {
        name: "CAC 40",
        location: "Paris, French",
        points: 6719.37,
        variation: -0.51,
      },
      NIKKEI: {
        name: "Nikkei 225",
        location: "Tokyo, Japan",
        points: 27777.9,
        variation: -1.59,
      },
    },
    available_sources: ["BRL"],
    bitcoin: {
      blockchain_info: {
        name: "Blockchain.info",
        format: ["USD", "en_US"],
        last: 16927.69,
        buy: 16927.69,
        sell: 16927.69,
        variation: 0.073,
      },
      coinbase: {
        name: "Coinbase",
        format: ["USD", "en_US"],
        last: 16909.94,
        variation: 0.01,
      },
      bitstamp: {
        name: "BitStamp",
        format: ["USD", "en_US"],
        last: 16913,
        buy: 16914,
        sell: 16913,
        variation: 0,
      },
      foxbit: {
        name: "FoxBit",
        format: ["BRL", "pt_BR"],
        last: 88448.3193,
        variation: -0.169,
      },
      mercadobitcoin: {
        name: "Mercado Bitcoin",
        format: ["BRL", "pt_BR"],
        last: 88387.30294237,
        buy: 88272.93691,
        sell: 88418.99617158,
        variation: 0.048,
      },
    },
    taxes: [
      {
        date: "2022-11-30",
        cdi: 13.75,
        selic: 13.75,
        daily_factor: 1.00050788,
        selic_daily: 13.65,
        cdi_daily: 13.65,
      },
    ],
  },
  execution_time: 0,
  from_cache: true,
};

const currencies = ref();
const finance = ref();
const bitcoin = ref();
const stocks = ref();
const taxes = ref();

const loadFinance = async () => {
  finance.value = await getFinance();
  delete resp.results.currencies.source;
  delete resp.results.currencies.BTC;

  currencies.value = resp.results.currencies;
  bitcoin.value = resp.results.bitcoin;
  stocks.value = resp.results.stocks;
  taxes.value = resp.results.taxes;
};

onMounted(loadFinance);
</script>

<template>
  <div class="dashboard-container">
    <div class="dashboard">
      <DashboardItem
        v-if="currencies"
        title="COTAÇÃO DAS PRINCIPAIS MOEDAS PARA O REAL"
        :items="currencies"
        divider
        origin
      />
      <DashboardItem
        v-if="bitcoin"
        title="COTAÇÃO DO BITCOIN NAS PRINCIPAIS CORRETORAS"
        :items="bitcoin"
        divider
      />
      <DashboardItem
        v-if="stocks"
        title="ÍNDICES DE BOLSAS DE VALORES PELO MUNDO"
        :items="stocks"
        divider
      />
      <DashboardItem
        v-if="taxes"
        title="PREÇO E VARIAÇÃO DE AÇÕES NA BOLSA DE VALORES BOVESPA"
        :items="taxes"
      />
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  background: #313a46;
}
.dashboard {
  max-width: 1440px;
  padding: 25px;
  margin: 0 auto;
  /* border-radius: 12px; */
  background: #313a46;
}
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
</style>
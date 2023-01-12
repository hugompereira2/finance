<script setup>
import { onMounted, ref } from "vue";
import { formatterBRL } from "../helper/helper";
import { getHistory } from "../api/index";
import { LineChart } from "vue-chart-3";
import information from "../assets/information_icon.svg";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  items: {
    type: Object,
    required: true,
  },
  divider: {
    type: Boolean,
    default: false,
  },
  origin: {
    type: Boolean,
    default: false,
  },
});

const showChart = ref(false);
const arrayItems = ref([]);

const chartData = ref({
  labels: [],
  datasets: [],
});

const handleItems = () => {
  for (const [key, value] of Object.entries(props.items)) {
    value.origin = key;
    arrayItems.value.push(value);
  }
};

const handleName = (item) => {
  return item.origin + " " + item.name;
};

const createChartData = (history) => {
  let labels = [],
    data = [];

  history.forEach((element) => {
    labels.unshift(
      new Date(parseInt(element.timestamp) * 1000)
        .toLocaleString()
        .split(" ")[0]
    );

    data.unshift(element.high);
  });

  chartData.value.labels = labels;
  chartData.value.datasets = [
    {
      label: history[0].name,
      data: data,
      backgroundColor: ["#008000"],
    },
  ];
};

const handleHistory = async (currency = null, location = null) => {
  if (currency && !location) {
    const history = await getHistory(currency);

    createChartData(history.data);
    showChart.value = true;
  }
};

const handleTypeCurrency = (format, symbol = false) => {
  if (format?.includes("USD")) {
    return symbol ? "$ " : "USD DÓLAR";
  }
  return symbol ? "R$ " : "BRL REAL";
};

onMounted(handleItems);
</script>

<template>
  <h1>{{ props.title }}</h1>
  <div class="cards">
    <div
      class="column-item"
      :class="[{ pointer: !item.location }]"
      v-for="(item, index) in arrayItems"
      :key="index"
      @click="handleHistory(item.origin, item.location)"
    >
      <small :class="{ green: item.variation >= 0, red: item.variation < 0 }"
        >{{ item.variation }}%</small
      >
      <span>{{ item.points || formatterBRL(item.buy) }}</span>
      <template v-if="origin">
        <span
          >{{ handleName(item) }} / {{ handleTypeCurrency(item.format) }}
          <img
            class="information-icon"
            :src="information"
            alt="information-icon"
        /></span>
      </template>
      <template v-else>
        <span>{{ item.name }}</span>
      </template>
    </div>
  </div>
  <div class="chart-layer" v-show="showChart" @click="showChart = false" />
  <LineChart class="line-chart" v-show="showChart" :chartData="chartData" />
  <div v-show="divider" class="divider" />
</template>

<style scoped>
h1 {
  color: white;
  font-size: 1.7rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 42px;
}
span,
small {
  text-align: center;
  padding: 3px 5px;
  border-radius: 10px;
  color: white;
}
.line-chart {
  background: white;
  position: fixed !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60vw;
  max-width: 700px !important;
  padding: 24px;
  border-radius: 12px;
  z-index: 999;
}
.information-icon {
  width: 18px;
}
.chart-layer {
  width: 100vw;
  height: 100vh;
  padding: 24px;
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 800;
}
.divider {
  margin: 24px 0;
  height: 1px;
  width: 100%;
  background: #e3eaef;
}
.pointer {
  cursor: pointer;
}
.green {
  background: green;
  font-weight: 600;
}
.red {
  background: red;
  font-weight: 500;
}
.cards {
  display: grid;
  gap: 30px 0;
  grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
  justify-content: center;
  justify-items: center;
}
.column-item {
  width: 310px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
@media screen and (max-width: 500px) {
  .line-chart {
    width: 90vw;
  }
}
</style>

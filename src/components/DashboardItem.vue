<script setup>
import { onMounted, ref } from "vue";
import { useRouter, RouterLink } from "vue-router";
import finance from "../assets/finance.svg";
import user from "../assets/user.svg";

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

const arrayItems = ref([]);

const handleItems = () => {
  for (const [key, value] of Object.entries(props.items)) {
    value.origin = key;
    console.log(value);
    arrayItems.value.push(value);
  }
  console.log(arrayItems.value);
};

const handleName = (item) => {
  return item.origin + " " + item.name;
};

const handleTypeCurrency = (format, symbol = false) => {
  if (format?.includes("USD")) {
    return (symbol ? "$ " : "USD DÓLAR");
  }
  return (symbol ? "R$ " : "BRL REAL");
};

onMounted(handleItems);
</script>

<template>
  <h1>{{ props.title }}</h1>
  <div class="flex-row">
    <div class="column-item" v-for="(item, index) in arrayItems" :key="index">
      <small :class="{ green: item.variation >= 0, red: item.variation < 0 }"
        >{{ item.variation }}%</small
      >
      <span>{{ handleTypeCurrency(item.format, true) + (item.buy || item.last) }}</span>
      <template v-if="origin">
        <span
          >{{ handleName(item) }} / {{ handleTypeCurrency(item.format) }}</span
        >
      </template>
      <template v-else>
        <span>{{ item.name }} / {{ handleTypeCurrency(item.format) }}</span>
      </template>
    </div>
  </div>
  <div v-show="divider" class="divider" />
</template>

<style scoped>
h1 {
  color: white;
  font-size: 1.7rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 24px;
}
span,
small {
  text-align: center;
  padding: 3px 5px;
  border-radius: 10px;
  color: white;
}
.divider {
  margin: 24px 0;
  height: 1px;
  width: 100%;
  background: #e3eaef;
}
.green {
  background: green;
}
.red {
  background: red;
}
.flex-row {
  display: flex;
  flex-flow: row wrap;
  gap: 30px 15px;
}
.column-item {
  width: 310px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

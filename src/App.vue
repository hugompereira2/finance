<script>
import { RouterLink, RouterView } from "vue-router";
import { inject } from 'vue'

export default {
  name: 'Comp',
  setup() {
    const axios = inject('axios')  // inject axios

    const getFinance = () => {
      axios
        .get("https://api.hgbrasil.com/finance")
        .then((response) => {
          console.log(response.data)
        });
    };

    return { getFinance }
  }
}
</script>

<template>
  <RouterView />
</template>

<style scoped>

</style>

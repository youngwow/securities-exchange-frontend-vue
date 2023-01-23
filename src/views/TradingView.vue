<template>
  <v-container class="fluid grid-list-md">
    <v-layout>
      <div class="row">
        <stock-card v-for="stock in $store.getters.getPrices" :key="stock.id" :stock="stock" />
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import StockCard from "@/components/StockCard";
export default {
  name: "TradingView",
  components: {StockCard}
}
</script>

<style scoped>

</style>
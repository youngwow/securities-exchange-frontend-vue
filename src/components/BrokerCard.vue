<template>
  <v-card class="mb-12 mt-12 ml-6" width="500px">
    <v-card-title>{{ name }}</v-card-title>
    <v-card-subtitle>Balance: {{ balance }}</v-card-subtitle>
    <v-card-text v-if="stocks.length > 0">
      <v-list>
        <StockBrokerCard v-for="stock in $store.getters.getPrices" :key="stock.id" :portfolio="portfolio" :stock="stock"/>
      </v-list>
    </v-card-text>
    <v-card-text v-else>Empty</v-card-text>
  </v-card>
</template>

<script>
import StockBrokerCard from "@/components/StockBrokerCard";
export default {
  name: "Broker-card",
  components: {StockBrokerCard},
  props: ['name', 'balance', 'stocks'],
  data(){
    return{
      portfolio: []
    }
  },
  mounted() {
    let labels = [];
    let portfolio = [];
    let index = 0
    for (const stock of this.stocks) {
      if (!labels.includes(stock.label)){
        labels.push(stock.label)
        portfolio.push({
          id: index,
          label: stock.label,
          count: stock.count,
          finalPurchase: stock.oldPrice * stock.count
        })
        index += 1;
      } else{
        const portfolioIndex = portfolio.findIndex(item => item.label === stock.label);
        portfolio[portfolioIndex].count += stock.count;
        portfolio[portfolioIndex].finalPurchase += stock.oldPrice * stock.count;
      }
    }
    this.portfolio = portfolio;
  }
}
</script>

<style scoped>

</style>
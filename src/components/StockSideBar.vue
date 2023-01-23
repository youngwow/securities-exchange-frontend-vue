<template>
  <v-list-item prepend-icon="mdi-cash-usd" v-if="getCount > 0"
               :class="{'text-red': getIncome < 0, 'text-green': getIncome > 0}">
<!--    id: {{ stock.id }}-->
    Label: {{ getLabelSideBar }}
    Count: {{ getCount }}
    Income: {{ getIncome.toFixed(2) }}
  </v-list-item>
</template>

<script>
export default {
  name: "StockSideBar",
  props: ['stock'],
  data() {
    return {
      portfolio: []
    }
  },
  computed: {
    getLabelSideBar(){
      return this.stock.label || ''
    },
    getCount(){
      for (const stock of this.portfolio) {
        if (stock.label === this.stock.label){
          return stock.count;
        }
      }
      return 0;
    },
    getIncome(){
      for (const stock of this.portfolio) {
        if (stock.label === this.stock.label){
          const { price } = this.stock || 0;
          return price * stock.count - stock.finalPurchase;
        }
      }
      return 0;
    }
  },
  mounted() {
    let labels = [];
    let portfolio = [];
    let index = 0
    for (const stock of this.$store.getters.getCurrentUser.stocks) {
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
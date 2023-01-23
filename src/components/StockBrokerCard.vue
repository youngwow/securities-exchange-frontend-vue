<template>
  <v-list-item v-if="getCount > 0" :class="{'text-red': getIncome < 0, 'text-green': getIncome > 0}">
    Label: {{ getLabelSideBar }}
    Count: {{ getCount }}
    Income: {{ getIncome.toFixed(2) }}
  </v-list-item>
</template>

<script>
export default {
  name: "StockBrokerCard",
  props: ['stock', 'portfolio'],
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
}
</script>


<style scoped>

</style>
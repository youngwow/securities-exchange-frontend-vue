<template>
  <v-card class="mb-12 mt-12 ml-6" width="500px">
    <v-card-title>{{ this.getLabel }}</v-card-title>
    <v-card-subtitle>{{ this.getName }}</v-card-subtitle>
    <v-card-text>
      Price: {{ this.currentPrice }}
      Date: {{ this.getDate }}
    </v-card-text>
    <v-form>
<!--      :id="'stockId' + String(this.stock.id)"-->
      <v-text-field
          label="Enter count of stocks"
          :rules="rules"
          single-line
          v-model.number="value"
          type="number"
      >
      </v-text-field>
      <v-card-actions>
<!--        :id="'btnBuy' + String(this.stock.id)"-->
        <v-btn @click.prevent="buy" variant="outlined">
          Buy
        </v-btn>
        <v-btn @click.prevent="sell" variant="outlined">
          Sell
        </v-btn>
        <v-btn @click.prevent="information" variant="outlined">
          View
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
  <v-dialog
      v-model="isView"
      width="1200"
      height="1000"
  >
    <v-card>
      <Line :data="dataView" :options="options"></Line>
      <v-card-actions>
        <v-btn @click="isView = !isView" variant="outlined">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

import {CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip} from 'chart.js'

import {Line} from 'vue-chartjs'
import axios from "axios";
import {mapActions} from "vuex";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

export default {
  name: "StockCard",
  props: ['stock'],
  components: { Line },
  data(){
    return {
      rules: [
        value => !!value || 'Required.',
        value => (value * this.currentPrice < this.balanceCurrentUser) || 'You need more money'
      ],
      value: 1,
      dataView: {},
      options: {
        responsive: true,
        maintainAspectRatio: false
      },
      isView: false,
      history: [],
      tradingStartDate: ''
    }
  },
  methods: {
    async buy(){
      console.log(this.value, this.currentPrice)
      // let stock = {
      //   label: this.getLabel,
      //   count: this.value,
      //   value: this.$store.getters.getCurrentUser.value - this.value * this.currentPrice
      // }
      // let stocks = this.$store.getters.getCurrentUser.stocks || [];
      // console.log(this.$store.getters.getCurrentUser)
      // if (!stocks.find(stock => stock.label === this.getLabel)){
      //   stocks.push({
      //     label: stock.label,
      //     count: stock.count
      //   })
      // } else{
      //   for (const stockEl of stocks) {
      //     if (stockEl.label === this.getLabel){
      //       stockEl.count += this.value;
      //       break;
      //     }
      //   }
      // }
      let stock = {
        label: this.getLabel,
        count: this.value,
        value: this.$store.getters.getCurrentUser.value - this.value * this.currentPrice,
        oldPrice: this.currentPrice
      }
      let stocks = this.$store.getters.getCurrentUser.stocks || [];
      stocks.push({
        label: stock.label,
        count: stock.count,
        oldPrice: this.currentPrice
      })
      await this.buy_stock(stock);
    },
    ...mapActions({buy_stock: 'BUY_STOCK', sell_stock: 'SELL_STOCK'}),
    async sell(){
      console.log('sell', this.value)
      if (this.value * this.currentPrice <= this.balanceCurrentUser && this.value > 0){

        let stocks = this.$store.getters.getCurrentUser.stocks || [];
        for (const stockEl of stocks) {
          if (stockEl.label === this.getLabel){
            let stock = {
              label: this.getLabel,
              count: this.value,
              value: this.$store.getters.getCurrentUser.value + this.value * this.currentPrice,
              oldPrice: this.currentPrice
            }
            //stockEl.count -= this.value;
            await this.sell_stock(stock);
            break;
          }
        }
      }

    },
    information(){
      let chartData = {
        datasets: [{
          label: this.stock.label,
          type: 'line',
          backgroundColor: '#f87979'
        }]
      }
      let labels = []
      let data = []
      let currentDate = new Date(this.stock.date);
      let tradingStartDate = new Date(this.tradingStartDate);
      for (const stock of this.history) {
        if (this.stock.label === stock.label){
          for (const stockElement of stock.stocks) {
            let dateHistory = new Date(stockElement.date);
            if (currentDate >= dateHistory && tradingStartDate <= dateHistory){
              labels.unshift(stockElement.date)
              data.unshift(parseFloat(stockElement.open))
            }
          }
          break;
        }
      }
      chartData.labels = labels;
      chartData.datasets[0].data = data;
      this.dataView = chartData;
      this.isView = !this.isView;
    }
  },
  computed: {
    currentPrice() {
      return this.stock.price || 0
    },
    balanceCurrentUser(){
      const { value: balance } = this.$store.getters.getCurrentUser;
      return balance ? balance : 0
    },
    getDate(){
      return this.stock.date || 'Unknown'
    },
    getName(){
      return this.stock.name || 'Name'
    },
    getLabel(){
      return this.stock.label || 'Label'
    }
  },
  mounted() {
    axios.get('http://localhost:4000/stocks/history').then(
        res => this.history = res.data
    );
    axios.get('http://localhost:4000/settings').then(
        res => {
          const { tradingStartDate } = res.data
          this.tradingStartDate = tradingStartDate;
        }
    )
  }
}
</script>

<style scoped>

</style>
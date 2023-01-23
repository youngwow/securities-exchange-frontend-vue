<template>
<!--  expand-on-hover-->
  <v-navigation-drawer
      expand-on-hover

      rail
  >
    <v-list>
      <v-list-item
          prepend-icon="mdi-account"
          :title="nameUser"
      >
      </v-list-item>
    </v-list>
    <v-divider/>
    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-cash">
        Balance: {{ balanceUser.toFixed(2) }}
      </v-list-item>
      <StockSideBar v-for="stock in $store.getters.getPrices" :key="stock.id" :stock="stock"/>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import StockSideBar from "@/components/StockSideBar";
export default {
  name: "SideBar",
  components: {StockSideBar},
  computed: {
    nameUser(){
      const { name } = this.$store.getters.getCurrentUser;
      return name ? name : 'Profile'
    },
    balanceUser(){
      const { value } = this.$store.getters.getCurrentUser;
      return value ? value : 0
    },
    // getPrices(){
    //   const prices = this.$store.getters.getPrices;
    //   return [...prices];
  }
}
</script>

<style scoped>

</style>
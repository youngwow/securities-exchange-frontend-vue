<template>

<!--  <h1>{{$store.getters.getUsers}}</h1>-->
    <v-container class="fluid grid-list-md">
      <v-layout class="row wrap">
        <v-flex>
          <div v-for="broker in $store.getters.getUsers" :key="broker.id" >
            <broker-card :name="broker.name" :balance="broker.value" :stocks="broker.stocks"/>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import BrokerCard from "@/components/BrokerCard";
export default {
  name: "AdministrationView",
  components: {BrokerCard}
}
</script>

<style scoped>

</style>
<template>
  <v-app>
    <side-bar />
    <v-app-bar>
      <v-toolbar-title>Securities Exchange</v-toolbar-title>
      <RouterLink class="text-decoration-none" itemscope to="/">
        <v-btn class="btn btn-primary" size="x-large">
          <v-icon class="v-icon text-light-blue" icon="mdi-login" size="x-large"/>
        </v-btn>
      </RouterLink>
      <RouterLink class="text-decoration-none" itemscope to="/trade">
        <v-btn id="btnTrade" class="btn btn-primary text-decoration-none" size="x-large">
          <v-icon class="v-icon text-light-blue" icon="mdi-cash-multiple" size="x-large"/>
        </v-btn>
      </RouterLink>

      <RouterLink v-if="$store.getters.isAdmin" class="text-decoration-none" itemscope to="/admin">
        <v-btn class="btn btn-primary" size="x-large">
          <v-icon class="v-icon text-light-blue" icon="mdi-account-group" size="x-large"/>
        </v-btn>
      </RouterLink>
    </v-app-bar>
    <v-main>
      <router-view/>
<!--      <h1> {{ $store.state.prices }} </h1>-->
    </v-main>
  </v-app>
</template>

<script>

import SideBar from "@/components/SideBar";
export default {
  name: 'App',
  components: {SideBar},
  data: () => ({
    //
  }),
}
</script>

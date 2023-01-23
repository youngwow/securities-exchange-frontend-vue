<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <form ref="form" @submit.prevent="login()">
                  <v-autocomplete
                      id="fieldForLogin"
                      label="Users:"
                      :items="$store.getters.getUsers"
                      item-title="name"
                      item-value="id"
                      v-model="selectedUserId"
                  ></v-autocomplete>
                  <v-btn id="btnLogin" type="submit" class="mt-4" color="primary" value="log in">Login</v-btn>
                </form>
              </v-card-text>
            </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

import router from "@/router";

export default {
  name: "LoginView",
  data(){
    return {
      selectedUserId: null
    }
  },
  methods: {
    login() {
      //console.log(this.selectedUserId)
      this.$store.dispatch('GET_USER', this.selectedUserId);
      router.push('trade');
    }
  },
  mounted() {
    this.selectedUserId = null;
    this.$store.dispatch('GET_USERS');
  }
};
</script>

<style scoped></style>
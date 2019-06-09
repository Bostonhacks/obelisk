<template>
  <v-toolbar dark color="primary">
    <v-toolbar-title class="white--text">Obelisk</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn @click="home()" flat>Home</v-btn>
    </v-toolbar-items>
    <v-menu class="hidden-md-and-up">
      <v-toolbar-side-icon slot="activator"></v-toolbar-side-icon>
      <v-list>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title @click="home()">Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-btn icon>
      <v-icon v-if="user" @click="signOut()">power</v-icon>
      <v-icon v-else @click="signIn()">logout</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  name: "navigationBar",
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    async signOut() {
      await this.$store.dispatch("logOut");
      this.$router.push("/");
    },
    signIn() {
      this.$router.push("/login");
    },
    home() {
      this.$router.push("/");
    }
  },
  data() {
    return {};
  }
};
</script>

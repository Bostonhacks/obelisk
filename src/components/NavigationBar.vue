<template>
  <v-toolbar dark color="primary">
    <v-toolbar-title class="white--text">Obelisk</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn @click="home()" flat>Home</v-btn>
      <v-btn v-if="isAdmin" @click="mailgun()" flat>Mailgun</v-btn>
      <v-btn v-if="user" @click="profile()" flat>My Profile</v-btn>
    </v-toolbar-items>
    <v-menu class="hidden-md-and-up">
      <v-toolbar-side-icon slot="activator"></v-toolbar-side-icon>
      <v-list>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title @click="home()">Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="user">
          <v-list-tile-content>
            <v-list-tile-title @click="profile()">My Profile</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="isAdmin">
          <v-list-tile-content>
            <v-list-tile-title @click="mailgun()">Mailgun</v-list-tile-title>
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
    },
    isAdmin() {
      if (this.$store.state.user) {
        if (
          this.$store.state.user.role == "admin" ||
          this.$store.state.user.role == "superuser"
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
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
    },
    profile() {
      this.$router.push("/profile");
    },
    mailgun() {
      this.$router.push("/mailgun");
    }
  },
  data() {
    return {};
  }
};
</script>

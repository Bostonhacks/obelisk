<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Profile</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form aria-label="Profile">
            <v-layout row>
              <v-flex xs12>
                <v-text-field
                  v-model="name"
                  label="Name"
                  name="name"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12>
                <v-text-field
                  v-model="email"
                  label="Email"
                  name="email"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12>
                <v-text-field
                  v-model="companyName"
                  label="Company Name"
                  name="companyName"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-btn @click="updateProfile" color="primary">Update</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { db } from "../firebase/init";
export default {
  name: "profileUI",
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  data() {
    return {
      name: null,
      companyName: null,
      email: null
    };
  },
  mounted() {
    this.name = this.user.displayName;
    this.companyName = this.user.companyName;
    this.email = this.user.email;
  },
  methods: {
    async updateProfile() {
      const ref = db.collection("users").doc(this.user.uid);
      await ref.update({
        displayName: this.name,
        companyName: this.companyName,
        email: this.email
      });
      this.$store.dispatch("setUser");
      this.$router.push("/");
    }
  }
};
</script>

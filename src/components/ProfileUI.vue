<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Profile</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-layout row>
              <v-flex xs12>
                <v-text-field
                  v-model="name"
                  label="Name"
                  name="name"
                  readonly
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12>
                <v-text-field
                  v-model="email"
                  label="Email"
                  name="email"
                  readonly
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12>
                <v-text-field
                  v-model="companyName"
                  label="Company Name"
                  name="companyName"
                  :rules="companyNameRules"
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
      email: null,
      valid: false,
      companyNameRules: [val => !!val || "Company Name Required"]
    };
  },
  mounted() {
    this.name = this.user.displayName;
    this.companyName = this.user.companyName;
    this.email = this.user.email;
  },
  methods: {
    async updateProfile() {
      if (this.$refs.form.validate()) {
        const ref = db.collection("users").doc(this.user.uid);
        await ref
          .update({
            companyName: this.companyName
          })
          .then(() => {
            this.$store.dispatch("setUser").then(() => {
              this.$router.push("/");
            });
          });
      }
    }
  }
};
</script>

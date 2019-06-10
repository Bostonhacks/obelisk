<template>
  <div id="firebaseui-auth-container"></div>
</template>

<script>
import { authUi, authUiConfig } from "../firebase/init";
export default {
  name: "authUI",
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  mounted() {
    if (!this.user) {
      authUi.start("#firebaseui-auth-container", authUiConfig);
    }
    if (this.user.companyName == undefined) {
      this.$router.push({ name: "profile" });
    } else {
      this.$router.push({ name: "home" });
    }
    authUi.start("#firebaseui-auth-container", authUiConfig);
  }
};
</script>

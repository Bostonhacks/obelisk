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
    authUi.start("#firebaseui-auth-container", authUiConfig);
  }
};
</script>

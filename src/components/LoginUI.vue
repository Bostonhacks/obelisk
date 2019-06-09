<template>
  <div id="firebaseui-auth-container"></div>
</template>

<script>
import { authUi, authUiConfig } from "../firebase/init";
export default {
  name: "authUI",
  mounted() {
    authUi.start("#firebaseui-auth-container", authUiConfig);
  }
};
</script>

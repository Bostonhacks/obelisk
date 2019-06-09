<template>
<center><div id="firebaseui-auth-container"></div></center>
</template>

<script>
import { authUi, authUiConfig } from '../firebase/init';
export default {
  name: 'authUI',
  mounted() {
    authUi.start('#firebaseui-auth-container', authUiConfig);
  },
};
</script>

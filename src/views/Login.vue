<template>
<v-layout
      align-center
      column
      justify-center
    >
    <authUI/>
</v-layout>
</template>

<script>
import authUI from "../components/LoginUI";
export default {
    components: {
    authUI
  }
};
</script>
import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import { db } from "@/firebase/init";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    setUser: (state, data) => {
      state.user = data;
    }
  },
  actions: {
    setUser: async context => {
      const user = firebase.auth().currentUser;
      if (!user) {
        return;
      }
      const mydb = db.collection("users").doc(user.uid);
      var raid = await mydb.get();
      if (!raid.exists) {
        await mydb.set({
          displayName: user.displayName,
          uid: user.uid,
          email: user.email,
          companyName: null,
          role: "user"
        });
        raid = await mydb.get();
        context.commit("setUser", raid.data());
      } else {
        context.commit("setUser", raid.data());
      }
    },
    logOut: async context => {
      await firebase.auth().signOut();
      context.commit("setUser", null);
    }
  }
});

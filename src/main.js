import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import * as firebase from 'firebase'
import router from './router'
import store from './Store/store'

axios.defaults.baseURL = 'https://mathyos-37290.firebaseio.com'

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyBt3xFsMTlk84yR2CqJ6hlGHcSxSmrCKQw',
      databaseURL: 'https://mathyos-37290.firebaseio.com/',
      projectId: 'mathyos-37290',
      storageBucket: 'gs://mathyos-37290.appspot.com'
    })
  }
})
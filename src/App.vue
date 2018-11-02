<template>
  <div >
    <app-header />
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from './components/header.vue'
  import { actionTypes as examActionTypes } from './Store/modules/dashboardModule.js'

  export default {
    name: 'app',
    components: {
      'app-header': Header
    },
     created()  {
       this.loadUniversity()
    },
     methods: {
      loadUniversity () {
        let self = this
        debugger
        self.$store.dispatch(examActionTypes.LOAD_EXAM)
      }
    },
  }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css">
  body, html {
    margin: 0;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
</style>
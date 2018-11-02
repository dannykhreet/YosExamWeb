<template>
  <div>
          <dashboardexam v-for="data in exams "
                              :Url= "data.examImage"
                              :Name= "data.arabicName"
                              :examId= "data.Id"
                              :exam="data"/>
  </div>
</template>

<script>
  import exam from './Exam.vue'
  import { actionTypes as examActionTypes } from '../Store/modules/dashboardModule.js'

  export default {
    data () {
      return {
      }
    },
    created()  {
     // this.loadExam()
      debugger

    },
    components: {
      'dashboardexam' : exam
    },
    methods: {
      loadExam () {
        let self = this
        debugger
        self.$store.dispatch(examActionTypes.LOAD_Exam)
        debugger
      }

    },
    computed: {
      exams () {
      debugger
       return this.$store.getters.examitems
        debugger
      }
    }
  }
</script>

<style scoped>
  div {
    display: inline-block;
  }


</style>
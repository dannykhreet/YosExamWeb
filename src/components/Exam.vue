<template>
<div class="row">
  <div class="col">
    <div class="card no-gutters">
      <img class="card-img-top"
            :src="Url">
        <div class="card-block">
            <div class="card text-center">
              <h5 class="card-title">  {{ Name }}</h5>
              <p class="card-text">examId: {{ examId }}</p>
              <div>
              <button type="button" v-on:click="DeleteExam(examId)" class="btn btn-primary Buttom">Delete</button>
              </div>
            </div>
      </div>
    </div>
  </div>
</div>

</template>
<script>
  import { actionTypes as examActionTypes } from '../Store/modules/dashboardModule.js'
  export default {
    props: {
      Url: String,
      Name: String,
      examId: String
    },
   methods: {
    DeleteExam: function (examId) {
        let self = this
        debugger
        self.$store.dispatch(examActionTypes.DELETE_EXAM, examId)
        self.$store.dispatch(examActionTypes.LOAD_EXAM)

    }
  }
  }
</script>
<style scoped>
.card {
    margin: 10px;
    display:inline-flex;
    justify-content: center;
    align-items: center;
    width: 200px;
}
.card-img-top {
   width: 200px;
  height: 10vw;
  max-width: 100%;
  flex-shrink: 0;
}
.Buttom {
background-color: #521751;
width:80px;
height:40px;
}



</style>
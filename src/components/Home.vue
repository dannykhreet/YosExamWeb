<template>
  <div id="div1">
    <div class="cta">
      <router-link to="./signup">Sign Up</router-link>
      <router-link to="./signin">Sign In</router-link>
      <router-link to="./dashboard">Dashboads</router-link>
      <router-link to="./newExam">New Exam</router-link>
    </div>
  </div>
</template>

<style scoped>
  #div1 {
    width: 80%;
    margin: auto;
  }

  h1 {
    text-align: center;
  }

  p {
    text-align: center;
  }

  .cta {
    width: 400px;
    margin: auto;
    text-align: center;
  }

  .cta a {
    margin: 10px;
    text-decoration: none;
    display: inline-block;
    border: 1px solid #521751;
    border-radius: 3px;
    width: 100px;
    padding: 10px;
    box-sizing: border-box;
    color: #521751;
  }

  .cta a:hover,
  .cta a:active {
    background-color: #521751;
    color: white;
  }
</style>
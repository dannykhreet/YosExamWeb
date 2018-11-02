import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './components/Home.vue'
import DashboardPage from './components/dashboard.vue'
import SignupPage from './components/auth/signup.vue'
import SigninPage from './components/auth/signin.vue'
import NewExam from './components/newExam.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home },
  { path: '/signup', component: SignupPage },
  { path: '/signin', component: SigninPage },
  { path: '/dashboard', component: DashboardPage },
  { path: '/newexam', component: NewExam }
]

export default new VueRouter({mode: 'history', routes})
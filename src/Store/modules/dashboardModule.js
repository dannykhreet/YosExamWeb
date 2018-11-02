import axios from 'axios'
import * as firebase from 'firebase'

export const actionTypes = {
  LOAD_EXAM: 'LOAD_EXAM',
  DELETE_EXAM: 'DELETE_EXAM'
}

export const mutationTypes = {
  LOAD_EXAM: 'LOAD_EXAM',
  DELETE_EXAM: 'DELETE_EXAM'
}

const state = {
  examitems: {},
  deletedExamItem: {}
}

export const getters = {
  examitems: (state) => { return state.examitems },
  deletedExamItem: (state) =>{ return state.deletedExamItem}
}

const actions = {
  [actionTypes.LOAD_EXAM] ({ commit }) {
    return axios.get('/Exams.json')
    .then(response => {
      debugger
      commit(mutationTypes.LOAD_EXAM, response.data)
      debugger
    })
    .catch(error => console.log(error))
  },
  // axios.delete('/universitys.json/', ExamId)
  [actionTypes.DELETE_EXAM] ({ commit }, ExamId) {
    debugger
    return  firebase.database().ref('Exams').child(ExamId).remove()
    .then( res => {
      debugger
      commit(mutationTypes.DELETE_EXAM)
      debugger
    })
    .catch(error => console.log(error))
  }
}
const mutations = {
  [mutationTypes.LOAD_EXAM] (state, examitems) {
    let universities = []
    for (let key in examitems) {
      let university = examitems[key]
      university.Id = key
      universities.push(university)
    }
    state.examitems = examitems
  },
  [mutationTypes.DELETE_EXAM] (state, deleteduniversity) {
    state.deletedExamItem = deleteduniversity
  }
}

export const module = {
  actions,
  mutations,
  state,
  getters
}

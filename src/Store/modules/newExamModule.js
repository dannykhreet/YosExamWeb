import axios from 'axios'
import * as firebase from 'firebase'

export const actionTypes = {
  SEND_EXAM: 'SEND_EXAM'
}

export const mutationTypes = {
  SEND_EXAM: 'SEND_EXAM'
}

const state = {
  examItem: {}
}

export const getters = {
  examItem: (state) => { return state.examItem }
}

// return axios.post('/university.json', university)
const actions = {
  [actionTypes.SEND_EXAM] ({ commit } , examdata) {
    debugger
    const exam = {
        arabicName: examdata.arabicName,
        turkeyName: examdata.turkeyName,
        discription: examdata.discription,
        questions: examdata.questions
      }
      let imageUrl
      let key
    firebase.database().ref('Exams').push(exam)
        .then((data) => {
          key = data.key
          return key
        })
      .then(key => {
        const filename = examdata.image.name
        const ext = filename.slice(filename.lastIndexOf('.'))
          for (let i = 0; i < exam.questions.length; i++) {
            let filequestionname = exam.questions[i].ImageQuestin.name
            let extQuestion = filequestionname.slice(filequestionname.lastIndexOf('.'))
            debugger
            firebase.storage().ref('question/'+'exam'+ key + '/'+ i + '.' + extQuestion).put(examdata.questions[i].ImageQuestin)
            .then(filedata => {
              let imageQuestionPath = filedata.metadata.fullPath;
              // creating ref to our image file and get the url
              return firebase.storage().ref().child(imageQuestionPath).getDownloadURL();
            })
            .then(url => {
              imageUrl = url;
              debugger
              firebase.database().ref('Exams').child(key).child('questions').child(i).child('id').remove();
              return firebase.database().ref('Exams').child(key).child('questions').child(i).update({ImageQuestinUrl: imageUrl });
            })
            .catch(error => console.log(error))
          }
        return firebase.storage().ref('Exams/' + key + '.' + ext).put(examdata.image)
      })
      .then(filedata => {
        let imagePath = filedata.metadata.fullPath;
        // creating ref to our image file and get the url
        return firebase.storage().ref().child(imagePath).getDownloadURL();
      })
      .then(url => {
        imageUrl = url;
        return firebase.database().ref('Exams').child(key).update({examImage: imageUrl });
      })
      .catch(error => console.log(error))
  }
}
const mutations = {
  [mutationTypes.SEND_EXAM] (state, examItem) {
    state.examItem = examItem
  }
}

export const module = {
  actions,
  mutations,
  state,
  getters
}

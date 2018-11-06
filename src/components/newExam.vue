<template>
  <div id="examform">
    <div class="examform-form">
      <div class="text-center">
              <label >بيانات الامتحان</label>
      </div>
        <form @submit.prevent="onSubmit">
                  <div class="row">
                    <div class="input text-right form-group col">
                      <label for="arabicname">الاسم العربي</label>
                      <input
                              type="text"
                              id="arabicname"
                              v-model.trim="arabicName"
                              class="text-right">
                    </div>
                    <div class="input text-right form-group col">
                      <label for="turkeyname"> الاسم التركي</label>
                      <input
                              type="text"
                              id="turkeyname"
                              v-model.trim="turkeyName"
                              class="text-right">
                    </div>
                  </div>
                  <div class="row">
                     <div class="input text-right form-group col">
                          <label  for="Image">صورة الفحص </label>
                     </div>
                  </div>
                  <div class="row">
                      <div class="input text-right form-group col">
                        <label for="Image">الصورة</label>
                        <input
                                type="file"
                                id="Image"
                                ref="fileInput"
                                accept="image/*"
                                @change="onFilePicked"
                                class="text-right">
                      </div>
                      <div class="input input text-right form-group col">
                      <img :src="imageUrl" height="150">
                      </div>
                  </div>
                  <div class="row">
                    <div class="input text-right form-group col ">
                      <div class="input-group-prepend ">
                        <label class="input-group-text"
                              for="Discription">التفاصيل</label>
                      </div>
                      <textarea id="Discription"
                                class="form-control text-right"
                                v-model.trim="discription"
                                style="min-width: 850px; max-width: 850px"
                                aria-label="With textarea"/>
                    </div>
                  </div>
                  <div class="row">
                    <div class="hobbies form-group col">
                      <label class="input-group-text"
                              for="questions">الاسئلة</label>
                          <div class="hobby-list">
                            <div
                                    class="input"
                                    id="questions"
                                    v-for="(NumberInput, index) in questions"
                                    :key="NumberInput.id">
                              <label :for="NumberInput.id"> {{ index+1 }} السؤال</label>
                              <div class="input text-right form-group col">
                                  <label for="ImageQuestin">صورة السؤال</label>
                                  <input
                                          type="file"
                                          :id="NumberInput.ImageQuestin"
                                          ref="fileInput"
                                          accept="image/*"
                                          @change="onFileImageQuestinPicked(NumberInput)"
                                          class="text-right">
                                </div>
                                <div class="input input text-right form-group col">
                                <img :src="NumberInput.ImageQuestinUrl"
                                      :id="NumberInput.id"
                                      height="150">
                              </div>
                              <div class="input text-right form-group col">
                              <label for="answerQuestion">الجواب </label>
                              <select :id="NumberInput.id"
                                      v-model="NumberInput.answerQuestion">
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                                <option value="E">E</option>
                              </select>
                                </div>
                              <button @click="onDeleteQuestion(NumberInput.id)" type="button">X</button>
                            </div>
                          </div>
                       <button @click="onAddQuestion" type="button">أضافة سؤال</button>
                    </div>
                 </div>
                  <div class="row">
                      <div class="submit text-center col">
                        <button type="submit">ارسال</button>
                      </div>
                  </div>
        </form>
    </div>
  </div>
</template>

<script>
  import { actionTypes as newExamActionTypes } from '../Store/modules/newExamModule.js'
  import { actionTypes as examActionTypes } from '../Store/modules/dashboardModule.js'

  import Multiselect from 'vue-multiselect'
  export default {
    components: {
    Multiselect
    },
    data () {
      return {
        arabicName: '',
        turkeyName: '',
        imageUrl: '',
        image: '',
        discription: '',
        questions: [],
      }
    },
    methods: {
      onAddQuestion () {
        const newQuestion = {
          id: Math.random() * Math.random() * 1000,
          ImageQuestin: '',
          ImageQuestinUrl:'',
          answerQuestion:''
        }
        this.questions.push(newQuestion)
      },
      onDeleteQuestion (id) {
        this.questions = this.questions.filter(question => question.id !== id)
      },
       onFilePicked ( event ) {
        const files = event.target.files
        let filename = files[0].name
        if (filename.lastIndexOf('.') <= 0) {
          return alert('Please add a valid file!')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.image = files[0]
      },
       onFileImageQuestinPicked (question) {
        const files = event.target.files
        let filename = files[0].name
        if (filename.lastIndexOf('.') <= 0) {
          return alert('Please add a valid file!')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
        question.ImageQuestinUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        question.ImageQuestin = files[0]
      },
      onSubmit () {
        if (!this.image) {
            return
          }
          debugger
            let ExamData = {
            arabicName: this.arabicName,
            turkeyName: this.turkeyName,
            image: this.image,
            discription: this.discription,
            questions: this.questions
          }
          debugger
          let self = this
          self.$store.dispatch(newExamActionTypes.SEND_EXAM , ExamData)
          self.$store.dispatch(examActionTypes.LOAD_EXAM)
          this.arabicName = ''
          this.turkeyName = ''
          this.image = null
          this.imageUrl = ''
          this.discription = ''
          this.questions = null
          debugger
      }
   }

  }
</script>

 <style scoped >
  .examform-form {
    width: 900px;
    margin: 30px auto;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;

  }


  .input {
    margin: 10px auto;
  }

  .input label {
    display: block;
    color: #4e4e4e;
    margin-bottom: 6px;
  }

  .input.inline label {
    display: inline;
  }

  .input input {
    font: inherit;
    width: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }

  .input.inline input {
    width: auto;
  }

  .input input:focus {
    outline: none;
    border: 1px solid #521751;
    background-color: #eee;
  }

  .input select {
    border: 1px solid #ccc;
    font: inherit;
  }



  .submit button {
    border: 1px solid #521751;
    color: #521751;
    padding: 10px 20px;
    font: inherit;
    cursor: pointer;
  }

  .submit button:hover,
  .submit button:active {
    background-color: #521751;
    color: white;
  }

  .submit button[disabled],
  .submit button[disabled]:hover,
  .submit button[disabled]:active {
    border: 1px solid #ccc;
    background-color: transparent;
    color: #ccc;
    cursor: not-allowed;
  }
</style>
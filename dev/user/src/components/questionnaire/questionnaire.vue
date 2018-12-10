<template>
<div style="overflow-y:hidden !important; height:100vh !important">

  <div class="background indigo">
    <div class="container">
      <div class="container">
        <div class="center white-text">
          <h4>{{displayTitle}}</h4>
        </div>
        <div v-if="questionnaireStatus">
          <div v-if="!userCodeStatus">
            <form @submit.prevent="verifyUserCode" class="card-panel">
              <div class="input-field col s6">
                <i class="material-icons prefix">lock</i>
                <input id="userCode" type="password" class="validate" v-model:value="userCode">
                <label for="userCode">Código</label>
              </div>
              <div class="right-align">
                <button class="btn waves-effect indigo">
                  <i class="material-icons left">send</i>
                  Entrar
                </button>
              </div>
            </form>
          </div>
          <div v-else>
            <div v-if="!questionnaireStarted" class="card-panel" style="min-height:80vh">
              <div class="input-field col s6">
                <input id="first_name" type="text" class="validate">
                <label for="first_name">First Name</label>
              </div>
            </div>
            <div v-else>
              <div v-for="(reactive,index) in reactives">
                <div :id="'cover' + reactive.id" v-if="reactive.status == 1" @click="startQuestion(answersStringToObject(reactive.answersList)[0].aspect,reactive.timer,index)" class="valign-wrapper card-panel indigo lighten-1" style="min-height:80vh">
                  <div class=" white-text center" style="margin:0 auto">
                    <i class="material-icons" style="font-size:6rem">timer</i><br>
                    <h2 class="large-text">Cronómetro</h2>
                    <p>Haz click aquí para mostrar la pregunta</p>
                    <p>Tendrás <strong>{{reactive.timer}}</strong> segundos para contestar </p>
                  </div>
                </div>
                <div v-else-if="reactive.status == 2" :id="'question' + reactive.id" class="card-panel" style="min-height:80vh">
                  <div class="medium-text">{{reactive.title}}</div>
                  <div style="margin:5% 0">
                    <i class="material-icons left">timer</i>
                    La pregunta finalizará en <strong :id="'timer'+reactive.id" class="indigo white-text" style="border-radius: 1rem;padding:2px">{{reactive.timer}}</strong> segundos
                  </div>
                  <form @submit.prevent="answered(reactive.id,answer.aspect,answer.value)" v-for="answer in answersStringToObject(reactive.answersList)">
                    <button class="btn indigo waves-effect waves-light" style="text-align:left !important;width:100%;margin-bottom:5px">
                      {{answer.value}} {{answer.text}}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div v-else class="card-panel" style="min-height:80vh">
          Cuestionario inactivo
        </div>
        <div v-if="finish" class="card-panel">
          <h1 class="large-text">Has terminado</h1>
          <div class="row">
            <div class="col m5">
              <pre>{{aspectsList}}</pre>
            </div>
            <div class="col m5">
              <pre>{{aspectsTotalList}}</pre>
            </div>
          </div>

          <pre>{{calculatedAspects}}</pre>
        </div>

      </div>
    </div>
  </div>

</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'questionnaire',
  data() {
    return {
      user: this.$route.params.user,
      title: this.$route.params.campainName,
      displayTitle: this.urlToString(this.$route.params.campain).toUpperCase(),
      reactives: [],
      aspectsList: {},
      aspectsTotalList: {},
      stopSetInterval: false,
      finish: false,
      calculatedAspects: {},
      isCounted: true,
      questionStarted: true,
      questionnaireStarted: false,
      userCodeStatus: false,
      userCode: '',
      questionnaireStatus: false
    }
  },
  methods: {
    verifyUserCode() {
      let data = {
        user: this.user
      }
      axios.post('https://clima-laboral.human-express.com/php/campains/verifyUserCode.php', this.createFormData(data))
    },
    get() {
      axios.get('https://clima-laboral.human-express.com/php/campains/read.php?query=*&campain=' + this.displayTitle + "&user=" + this.user)
        .then(response => {
          response.data.reactives.forEach(question => {
            question.status = 0;
          })
          response.data.reactives.reverse()[0].status = 1;
          this.reactives = response.data.reactives.reverse();
          this.reactivesLength = response.data.reactives.reverse().length + 1;
          this.questionnaireStatus = response.data.campains;
          console.log(this.questionnaireStatus);


          console.log(response.data.reactives);
        })
    },
    urlToString(string) {
      return string.replace(/-/g, " ");
    },
    answersStringToObject(string) {
      let answersPre = string.replace(/(\r\n\t|\n|\r\t)/g, "").split(";");
      let answers = [];

      answersPre.forEach(answer => {

        answer = answer.split("//");
        let text = answer[0];
        let aspect = answer[1];
        let value = parseInt(answer[2]);

        if (answer[1]) {
          answers.push({
            text,
            aspect,
            value
          });
        }

      });
      return answers;
    },
    startQuestion(aspect, timer, index) {
      if (this.questionStarted) {
        this.questionStarted = false;
        setTimeout(() => {
          this.questionStarted = true;
          console.log(aspect)
          console.log(index);
          this.stopSetInterval = false;
          this.reactives[index].status = 2;
          var timerVar = setInterval(() => {
            if (this.reactives[index].timer > 0) {
              if (this.stopSetInterval) {
                clearInterval(timerVar)
              } else {
                this.reactives[index].timer--;
                console.log(this.reactives[index].timer)
              }
            } else {
              this.reactives.shift()
              if (this.reactives.length > 0) {
                this.reactives[0].status = 1;
                clearInterval(timerVar);
              } else {
                console.log("Haz terminado");
                clearInterval(timerVar);
              }
            }
          }, 1000)
        }, 1010)
      }
    },
    answered(index, aspect, value) {
      this.reactives.shift();


      if (isNaN(this.aspectsList[aspect])) {
        this.aspectsList[aspect] = value;
      } else {
        this.aspectsList[aspect] = this.aspectsList[aspect] + value;
      }

      console.log(this.aspectsList);

      if (this.reactives.length > 0) {
        this.reactives[0].status = 1;
      } else {
        this.finish = true;
      }
    },
    addAspectsTotalList() {
      if (this.isCounted) {
        this.reactives.forEach(reactive => {

          let aspect = this.answersStringToObject(reactive.answersList)[0].aspect;

          console.log(aspect);

          if (isNaN(this.aspectsTotalList[aspect])) {
            this.aspectsTotalList[aspect] = 1;
          } else {
            this.aspectsTotalList[aspect]++
          }

        });
        console.log(this.aspectsTotalList);
        this.isCounted = false;
      }
    },
    calculateAspects() {
      let aspectsCalculated = {};
      Object.keys(this.aspectsTotalList).forEach(key => {
        aspectsCalculated[key] = this.aspectsList[key] / this.aspectsTotalList[key]
        console.log(key)
      })
      console.log(aspectsCalculated);
      this.calculatedAspects = aspectsCalculated;
    },
    createFormData(postData) {
      var formDa = new FormData();
      for (var key in postData) {
        formDa.append(key, postData[key]);
      }
      return formDa;
    }
  },
  watch: {
    reactives(val) {
      this.stopSetInterval = true;
      if (this.reactives.length == 0) {
        this.calculateAspects();
      }
    }
  },
  mounted() {
    this.get();

  },
  updated() {
    this.addAspectsTotalList();
  }
}
</script>

<style></style>

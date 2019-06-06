<template>
  <div>
    <div>
      <form
        @submit.prevent="questionnaireStarted = !questionnaireStarted"
        v-if="!questionnaireStarted"
        class="card-panel"
        style="min-height:80vh"
      >
        <h4>
          <i class="material-icons left">person</i>
          Datos del participante
        </h4>

        <label>Selecciona una entidad</label>
        <select required v-model="entitie" class="browser-default">
          <option value disabled selected>Entidad</option>
          <option
            :value="entitieItem"
            :key="index"
            v-for="(entitieItem, index) in fieldParse(thisCampain.entities)"
          >{{ entitieItem }}</option>
        </select>

        <label>Selecciona un Area / Departamento</label>
        <select required v-model="area" class="browser-default">
          <option value disabled selected>Area / Departamento</option>
          <option
            :value="areaItem"
            :key="index"
            v-for="(areaItem, index) in fieldParse(thisCampain.areas)"
          >{{ areaItem }}</option>
        </select>

        <label>Selecciona tu turno</label>
        <select required v-model="turn" class="browser-default">
          <option value disabled selected>Turno</option>
          <option
            :value="turnItem"
            :key="index"
            v-for="(turnItem, index) in fieldParse(thisCampain.turns)"
          >{{ turnItem }}</option>
        </select>

        <label>Selecciona tu género</label>
        <select required v-model="gender" class="browser-default">
          <option value disabled selected>Género</option>
          <option
            :value="genderItem"
            :key="index"
            v-for="(genderItem, index) in fieldParse(thisCampain.gender)"
          >{{ genderItem }}</option>
        </select>

        <label>Selecciona tu rango de edad</label>
        <select required v-model="age" class="browser-default">
          <option value disabled selected>Rango de edad</option>
          <option
            :value="ageItem"
            :key="index"
            v-for="(ageItem, index) in fieldParse(thisCampain.age)"
          >{{ ageItem }}</option>
        </select>

        <label>Selecciona tu antigüedad en la empresa</label>
        <select required v-model="antiquity" class="browser-default">
          <option value disabled selected>Antigüedad en la empresa</option>
          <option
            :value="antiquityItem"
            :key="index"
            v-for="(antiquityItem, index) in fieldParse(thisCampain.antiquity)"
          >
            {{
            antiquityItem }}
          </option>
        </select>

        <label>Selecciona tu máximo grado de estudios concluidos</label>
        <select required v-model="studies" class="browser-default">
          <option value disabled selected>Estudios concluidos</option>
          <option
            :value="schoolItem"
            :key="index"
            v-for="(schoolItem, index) in fieldParse(thisCampain.school)"
          >
            {{
            schoolItem }}
          </option>
        </select>

        <div class="right-align">
          <button class="btn waves-effect indigo">
            <i class="material-icons left">check</i>
            Comenzar
          </button>
        </div>
      </form>
      <div v-else>
        <div :key="index" v-for="(reactive,index) in reactives">
          <div v-if="reactive.status" class="card-panel" :id="'question' + reactive.id">
            <div class="row">
              <div class="col s3 m2">
                <div :title="reactive.title">
                  <i class="material-icons left indigo-text">info</i>
                  <b>{{reactive.id}}</b>
                </div>
                <br>
                <div :title="'Cronómetro: ' + reactive.timer + 'segundos'">
                  <i class="material-icons left indigo-text">timer</i>
                  <b>{{reactive.timer}} s</b>
                </div>
              </div>
              <div class="col s9 10">
                <b>Respuesta</b>
                <br>
                <br>
                <form
                  style="margin:5px; display:inline-block"
                  @submit.prevent="answered(reactives.id,answer.aspect,answer.value)"
                  :key="indexResponse"
                  v-for="(answer, indexResponse) in answersStringToObject(reactive.answersList)"
                >
                  <button class="btn green waves-effect waves-light">{{answer.value}}</button>
                </form>
                <form @submit.prevent="answeredOnInput(index)">
                  <input id="answeredOnInput" type="text" maxlength="1" v-model="inputForm">
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="finish" class="card-panel">
      <h1 class="large-text">Has terminado</h1>
      <form @submit.prevent="send">
        <div class="input-field">
          <textarea id="textarea1" v-model="suggestion" class="materialize-textarea"></textarea>
          <label for="textarea1">¿Cómo podríamos mejorar?</label>
        </div>
        <p>{{response}}</p>
        <button class="btn waves-effect indigo">
          <i class="material-icons left">send</i>
          Enviar
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "questionnaire",
  props: {
    // questionnaire data
    user: String,
    campain: Object,
    title: String
  },
  data() {
    return {
      questionnaireStatus: this.campain.status,

      // user data
      entitie: "",
      area: "",
      turn: "",
      gender: "",
      age: "",
      antiquity: "",
      studies: "",
      suggestion: "",

      // questionnaire reactives
      reactives: [],
      reactivesAll: [],
      aspectsList: {},
      aspectsTotalList: {},
      stopSetInterval: false,
      finish: false,
      isCounted: true,
      questionStarted: true,
      thisCampain: {},

      // access data
      userCodeStatus: false,
      userCode: "",
      serverCode: "",

      //finish questionnaire
      calculatedAspects: {},
      questionnaireStarted: false,

      // extra data
      campains: 0,
      response: "",

      // reactivos y respuestas
      reactivesAnswers: [],

      // respuesta con input
      inputForm: ""
    };
  },
  methods: {
    send() {
      this.response = "";
      this.buttonDisabled = true;
      let data = {
        entitie: this.entitie,
        area: this.area,
        turn: this.turn,
        gender: this.gender,
        age: this.age,
        antiquity: this.antiquity,
        studies: this.studies,
        suggestion: this.suggestion.replace(/(\r\n\t|\n|\r\t)/g, ""),
        aspects: JSON.stringify(this.calculatedAspects),
        user: this.user,
        title: this.title.toLowerCase(),
        numberOfParticipants: this.campain.numberOfParticipants,
        campain: this.campain,
        reactivesAnswers: JSON.stringify(this.reactivesAnswers)
      };
      axios
        .post(
          "https://clima-laboral.human-express.com/php/questionnaire/create.php",
          this.createFormData(data)
        )
        .then(response => {
          console.log(response.data);
          if (response.data.status) {
            M.toast({
              html: response.data.message
            });
            setTimeout(() => {
              location.reload();
            }, 1000);
          } else {
            this.response = response.data.message;
          }
        })
        .catch(error => {
          this.response =
            "No se pudo procesar la información, intentalo de nuevo más tarde";
          M.toast({
            html:
              "No se pudo procesar la información, intentalo de nuevo más tarde"
          });
        });
    },
    entitiesParse(entities) {
      return entities.split(",");
    },
    verifyUserCode() {
      if (this.userCode == this.serverCode) {
        this.userCodeStatus = true;
        M.toast({
          html: "Bienvenido"
        });
      } else {
        M.toast({
          html: "Código incorrecto"
        });
      }
    },
    get() {
      axios
        .get(
          "https://clima-laboral.human-express.com/php/campains/read.php?query=*&campain=" +
            this.title +
            "&user=" +
            this.user
        )
        .then(response => {
          response.data.reactives.forEach(question => {
            question.status = false;
          });
          response.data.reactives.reverse()[0].status = true;
          let reactives = response.data.reactives.reverse();
          this.reactives = reactives;
          this.reactivesAll = reactives;
          this.reactivesLength = response.data.reactives.reverse().length + 1;
          this.campains = response.data.campains;

          let campains = JSON.parse(this.campains.campains);
          campains.forEach(campain => {
            if (campain.title.toLowerCase() == this.title.toLowerCase()) {
              this.thisCampain = campain;
              this.questionnaireStatus = campain.status;
              this.serverCode = campain.userCode;
            }
          });
          console.log(campains);
          console.log(response.data);
        });
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
          console.log(aspect);
          console.log(index);
          this.stopSetInterval = false;
          this.reactives[index].status = 2;
          var timerVar = setInterval(() => {
            if (this.reactives[index].timer > 0) {
              if (this.stopSetInterval) {
                clearInterval(timerVar);
              } else {
                this.reactives[index].timer--;
                console.log(this.reactives[index].timer);
              }
            } else {
              this.reactives.shift();
              if (this.reactives.length > 0) {
                this.reactives[0].status = 1;
                clearInterval(timerVar);
              } else {
                console.log("Haz terminado");
                clearInterval(timerVar);
              }
            }
          }, 1000);
        }, 1010);
      }
    },
    fieldParse(field) {
      return field.split(",");
    },
    answered(index, aspect, value) {
      this.reactivesAnswers.push({
        // guardar las respuestas de cada pregunta
        aspect,
        value
      });

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
    answeredOnInput(index) {
      let reactive = this.reactivesAll[index];

      let answers = this.answersStringToObject(reactive.answersList);
      console.log(this.reactivesAll);

      if (parseInt(this.inputForm) > 5) {
        this.inputForm = 5;
      } else {
        answers.forEach(answer => {
          console.log(this.inputForm, answer.value);

          if (parseInt(this.inputForm) == parseInt(answer.value)) {
            this.answered(undefined, answer.aspect, answer.value);
            this.inputForm = "";
          }
        });
      }
    },
    calculateAspects() {
      let aspectsCalculated = {};
      Object.keys(this.aspectsTotalList).forEach(key => {
        aspectsCalculated[key] =
          this.aspectsList[key] / this.aspectsTotalList[key];
        console.log(key);
      });
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
  }
};
</script>

<style>
select {
  border-radius: 2rem;
  background: #f1f1f1;
}
</style>

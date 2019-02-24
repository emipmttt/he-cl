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

                <p class="left-align">
                  <b class="medium-text">Te damos la Bienvenida a la Encuesta de Clima Laboral</b><br>
                  <span class="normal-text">
                    Toda la información que proporciones es estrictamente Confidencial y Anónima</span><br>
                  <i> "Con tu participación podemos hacer grandes cosas”</i>
                </p>
                <ol>

                  <li>Asegúrate de contar con el número de acceso para resolver la encuesta</li>
                  <li>Conexión a Internet</li>
                  <li>Resolver en computadora personal o laptop</li>
                  <li>Toma en cuenta que son 45 preguntas a contestar en un tiempo promedio de 8 minutos como mínimo</li>
                  <li>Lee y contesta con total naturalidad y confianza</li>
                  <li>Cualquier situación contactar a Recursos Humanos</li>

                </ol>

                <div class="divider"></div>

                <div class="input-field col s6">
                  <i class="material-icons prefix">lock</i>
                  <input id="userCode" type="password" class="validate" v-model:value="userCode">
                  <label for="userCode">Código de acceso</label>
                </div>
                <div class="right-align">
                  <a href="https://www.google.com/" class="btn-flat waves-effect red-text">
                    <i class="material-icons left">close</i>
                    Salir
                  </a>
                  <button class="btn waves-effect indigo">
                    <i class="material-icons left">send</i>
                    Entrar
                  </button>
                </div>
              </form>
            </div>
            <div v-else>
              <form @submit.prevent="questionnaireStarted = !questionnaireStarted" v-if="!questionnaireStarted" class="card-panel"
                style="min-height:80vh">

                <h4>
                  <i class="material-icons left">person</i>
                  Datos del participante
                </h4>

                <label>Selecciona una entidad</label>
                <select required v-model:value="entitie" class="browser-default">
                  <option value="" disabled selected>Entidad</option>
                  <option :value="entitieItem" v-for="entitieItem in fieldParse(thisCampain.entities)">{{ entitieItem
                    }}</option>
                </select>

                <label>Selecciona un Area / Departamento</label>
                <select required v-model:value="area" class="browser-default">
                  <option value="" disabled selected>Area / Departamento</option>
                  <option :value="areaItem" v-for="areaItem in fieldParse(thisCampain.areas)">{{ areaItem }}</option>
                </select>

                <label>Selecciona tu turno</label>
                <select required v-model:value="turn" class="browser-default">
                  <option value="" disabled selected>Turno</option>
                  <option :value="turnItem" v-for="turnItem in fieldParse(thisCampain.turns)">{{ turnItem }}</option>
                </select>

                <label>Selecciona tu género</label>
                <select required v-model:value="gender" class="browser-default">
                  <option value="" disabled selected>Género</option>
                  <option :value="genderItem" v-for="genderItem in fieldParse(thisCampain.gender)">{{ genderItem }}</option>
                </select>

                <label>Selecciona tu rango de edad</label>
                <select required v-model:value="age" class="browser-default">
                  <option value="" disabled selected>Rango de edad</option>
                  <option :value="ageItem" v-for="ageItem in fieldParse(thisCampain.age)">{{ ageItem }}</option>
                </select>

                <label>Selecciona tu antigüedad en la empresa</label>
                <select required v-model:value="antiquity" class="browser-default">
                  <option value="" disabled selected>Antigüedad en la empresa</option>
                  <option :value="antiquityItem" v-for="antiquityItem in fieldParse(thisCampain.antiquity)">{{
                    antiquityItem }}</option>

                </select>

                <label>Selecciona tu máximo grado de estudios concluidos</label>
                <select required v-model:value="studies" class="browser-default">
                  <option value="" disabled selected>Estudios concluidos</option>
                  <option :value="schoolItem" v-for="schoolItem in fieldParse(thisCampain.school)">{{
                    schoolItem }}</option>
                </select>

                <div class="right-align">
                  <button class="btn waves-effect indigo">
                    <i class="material-icons left">check</i>
                    Comenzar
                  </button>
                </div>

              </form>
              <div v-else>
                <div v-for="(reactive,index) in reactives">
                  <div v-if="reactive.timer > 0">
                    <div v-if="reactive.status == 1" :id="'cover' + reactive.id" @click="startQuestion(answersStringToObject(reactive.answersList)[0].aspect,reactive.timer,index)"
                      class="valign-wrapper card-panel indigo lighten-1" style="min-height:80vh">
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
                        La pregunta finalizará en <strong :id="'timer'+reactive.id" class="indigo white-text" style="border-radius: 1rem;padding:2px">{{reactive.timer}}</strong>
                        segundos
                      </div>
                      <form @submit.prevent="answered(reactive.id,answer.aspect,answer.value)" v-for="answer in answersStringToObject(reactive.answersList)">
                        <button class="btn indigo waves-effect waves-light" style="text-align:left !important;width:100%;margin-bottom:5px">
                          {{answer.value}} {{answer.text}}
                        </button>
                      </form>
                    </div>
                  </div>
                  <div v-else :id="'question' + reactive.id" class="card-panel" style="min-height:80vh">
                    <div v-if="reactive.status == 1" :id="'cover' + reactive.id">
                      <div class="medium-text">{{reactive.title}}</div>
                      <br>
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

          </div>
          <div v-else class="card-panel center grey-text valign-wrapper" style="min-height:80vh">
            <h4>Cuestionario inactivo</h4>
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
        // questionnaire data
        user: this.$route.params.user,
        title: this.$route.params.campainName,
        displayTitle: this.urlToString(this.$route.params.campain).toUpperCase(),
        questionnaireStatus: false,

        // user data
        entitie: '',
        area: '',
        turn: '',
        gender: '',
        age: '',
        antiquity: '',
        studies: '',
        suggestion: '',

        // questionnaire reactives
        reactives: [],
        aspectsList: {},
        aspectsTotalList: {},
        stopSetInterval: false,
        finish: false,
        isCounted: true,
        questionStarted: true,
        thisCampain: {},

        // access data
        userCodeStatus: false,
        userCode: '',
        serverCode: '',

        //finish questionnaire
        calculatedAspects: {},
        questionnaireStarted: false,

        // extra data
        campains: 0,
        response: '',

        // reactivos y respuestas
        reactivesAnswers: []
      }
    },
    methods: {
      send() {
        this.response = '';
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
          title: this.displayTitle.toLowerCase(),
          reactivesAnswers: JSON.stringify(this.reactivesAnswers)

        }
        axios
          .post('https://clima-laboral.human-express.com/php/questionnaire/create.php', this.createFormData(data))
          .then(response => {
            console.log(response.data);
            if (response.data.status) {
              M.toast({
                html: response.data.message
              });
              setTimeout(() => {
                location.href = "https://google.com";
              }, 1000)
            } else {
              this.response = response.data.message;
            }
          })
          .catch(error => {
            this.response = "No se pudo procesar la información, intentalo de nuevo más tarde";
            M.toast({
              html: "No se pudo procesar la información, intentalo de nuevo más tarde"
            })
          })
      },
      fieldParse(field) {
        return field.split(',')
      },
      verifyUserCode() {
        if (this.userCode == this.serverCode) {
          this.userCodeStatus = true;
          M.toast({
            html: 'Bienvenido'
          })
        } else {
          M.toast({
            html: 'Código de acceso incorrecto'
          })

        }
      },
      get() {
        console.clear();
        axios.get('https://clima-laboral.human-express.com/php/campains/read.php?query=*&campain=' + this.displayTitle +
            "&user=" + this.user)
          .then(response => {
            response.data.reactives.forEach(question => {
              question.status = 0;
            })
            response.data.reactives.reverse()[0].status = 1;
            this.reactives = response.data.reactives.reverse();
            this.reactivesLength = response.data.reactives.reverse().length + 1;
            this.campains = response.data.campains;

            let campains = JSON.parse(this.campains.campains);
            campains.forEach(campain => {
              if (campain.title.toLowerCase() == this.displayTitle.toLowerCase()) {
                this.thisCampain = campain;
                this.questionnaireStatus = campain.status;
                this.serverCode = campain.userCode;
              }
            })
            console.log(campains);
            console.log(response.data);
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

        this.reactivesAnswers.push({ // guardar las respuestas de cada pregunta
          aspect,
          value
        });

        this.reactives.shift(); // eliminar de la vista la pregunta respondida

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

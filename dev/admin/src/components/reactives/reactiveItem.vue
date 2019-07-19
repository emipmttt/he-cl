<template>
<div>

  <div v-if="!deleted" class="card-panel ">

    <div v-if="edit">
      <form @submit.prevent="send">
        <div class="input-field">
          <i class="material-icons prefix">bookmark</i>
          <input :id="'title' + id" max-length="500" type="text" class="validate" required v-model:value="title">
          <label :for="'title' + id">Título</label>
        </div>
        <div class="input-field">
          <i class="material-icons prefix">list</i>
          <textarea :id="'textarea' +  id" maxlength="1000" class="materialize-textarea validate" v-model="answersList" required></textarea>
          <label :for="'textarea' + id">Lista de respuestas</label>
          <table class="striped" v-if="answersStringToObject(answersList).length > 0">
            <thead>
              <tr>
                <th>
                  <i class="material-icons left">list</i>
                  Respuesta
                </th>
                <th>
                  <i class="material-icons left">bookmark</i>
                  Aspecto
                </th>
                <th>
                  <i class="material-icons left">check</i>
                  Valor
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="answer in answersStringToObject(answersList)">
                <td>{{answer.text}}</td>
                <td>{{answer.aspect}}</td>
                <td>{{answer.value}}</td>
              </tr>
            </tbody>

          </table>
        </div>

        <div class="row">
          <div class="col s12 m6" style="padding: 0px">
            <div class=" input-field">
              <i class=" material-icons prefix">timer</i>
              <input id="timer" type="number" min="0" max="99" class="validate" v-model:value="timer">
              <label for="timer">Cronómetro (s)</label>
            </div>
          </div>
          <div class="col s12 m6">
            <div class="valign-wrapper right" style="height:80px">
              <loading v-if="buttonDisabled == 1" class="preloader" />
              <button :disabled="buttonDisabled == 1" class="btn waves-effect indigo">
                <i class="material-icons left">done</i>
                Actualizar
              </button>
            </div>

          </div>
        </div>
      </form>

    </div>
    <div v-else="edit">
      <div class="row">
        <div class="col s12 m9">
          <div class="row">
            <div class="col s2 m3 l2">
              <i class="material-icons">bookmark</i>
            </div>
            <div class="col s10 m9 l10">
              <strong>{{title}}</strong>
            </div>
          </div>
        </div>
        <div class="col s12 m3">
          <div class="row" title="Cronómetro (s)">
            <div class="col s2 m3 l2">
              <i class="material-icons">timer</i>
            </div>
            <div class="col s10 m9 l10">
              {{timer}} s
            </div>
          </div>
        </div>
      </div>
      <table class="striped" title="Lista de respuestas">
        <thead>
          <tr>
            <th>
              <i class="material-icons left">list</i>
              Respuesta
            </th>
            <th>
              <i class="material-icons left">bookmark</i>
              Aspecto
            </th>
            <th>
              <i class="material-icons left">check</i>
              Valor
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="answer in answersStringToObject(answersList)">
            <td> {{answer.text}} </td>
            <td> {{answer.aspect}} </td>
            <td> {{answer.value}} </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="right-align">
      <button class="btn-flat indigo-text" @click="toEdit" title="Ver / Editar">
        <i class="material-icons">edit</i>
      </button>
      <button class="btn-flat red-text" @click="deleteElement" title="Eliminar">
        <i class="material-icons">close</i>
      </button>
    </div>
    <p class="center"> {{response}} </p>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import loading from '@/components/loading';
export default {
  name: 'reactive-item',
  props: {
    reactive: Object
  },
  data() {
    return {
      // view
      id: this.reactive.id,
      title: this.reactive.title,
      answersList: this.reactive.answersList,
      timer: this.reactive.timer,
      response: '',

      //edit
      edit: false,
      buttonDisabled: false,

      //delete

      deleted: false

    }
  },
  methods: {
    send() {
      this.buttonDisabled = true;
      let data = {
        id: this.id,
        title: this.title,
        answersList: this.answersList,
        timer: this.timer
      };
      console.log(data);
      axios.post('https://nom035.human-express.com/php/reactives/update.php', this.createFormData(data))
        .then(response => {
          this.buttonDisabled = false;
          console.log(response.data);
          if (response.data.status) {
            this.$emit('update:change');
            M.toast({
              html: response.data.message
            });
            this.edit = false;
          } else {
            this.response = response.data.message;
          }
        })
        .catch(error => {
          this.buttonDisabled = false;
          this.response = "No se pudo enviar la información" + error;
        })
    },
    deleteElement() {

      if (confirm("Haz click en Aceptar para eliminar el reactivo")) {
        let data = {
          id: this.id
        };

        axios.post("https://nom035.human-express.com/php/reactives/delete.php", this.createFormData(data))
          .then(element => {
            M.toast({
              html: 'Se ha eliminado el reactivo'
            });
            this.deleted = true;
          })
          .catch(error => {

            this.response = "Algo salió mal: " + error;

          });
      }

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
    toEdit() {
      this.edit = !this.edit;
      if (this.edit) {
        setTimeout(() => {
          M.updateTextFields();
          M.textareaAutoResize(document.getElementById('textarea' + this.id));
        }, 1);
      }
    },
    createFormData(postData) {
      var formDa = new FormData();
      for (var key in postData) {
        formDa.append(key, postData[key]);
      }
      return formDa;
    }
  },
  components: {
    loading
  },
  mounted() {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

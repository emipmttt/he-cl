<template>
<div>
  <div class="container">
    <h1 class="large-text">
      <i class="material-icons left">bookmarks</i>
      Reactivos
    </h1>
    <form v-show="create" @submit.prevent="send" id="createReactive">

      <div class="input-field">
        <i class="material-icons prefix">bookmark</i>
        <input id="title" max-length="500" type="text" class="validate" required v-model:value="title">
        <label for="title">Título</label>
      </div>
      <div class="input-field">
        <i class="material-icons prefix">list</i>
        <textarea id="answersList" maxlength="1000" class="materialize-textarea validate" v-model="answersList" required></textarea>
        <label for="answersList">Respuesta</label>
        <table v-if="answersStringToObject(answersList).length> 0">
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
            <loading v-if="buttonDisabled" class="preloader" />
            <button :disabled="buttonDisabled" class="btn waves-effect indigo">
              <i class="material-icons left">add</i>
              Crear
            </button>
          </div>

        </div>
      </div>

      <p class="center"> {{response}} </p>


    </form>
    <div class="divider"></div>

    <form>
      <div class="input-field">
        <i class="material-icons prefix">search</i>
        <input type="text" v-model:value="search" placeholder="Buscar">
      </div>
    </form>

    <div v-if="reactives.length">
      <div>
        <reactive-item @update:change="get" v-for="(reactive, index) in filteredReactives" :key="reactive.id" :reactive=" reactive" />
      </div>
    </div>
    <div v-else class=" center">
      <loading />
    </div>


  </div>

  <!-- create reactive -->


  <div class="fixed-action-btn">
    <a class="btn-floating btn-large indigo waves-effect" @click="showCreateForm">
      <i class="large material-icons">add</i>
    </a>
  </div>

</div>
</template>

<script>
import axios from 'axios';
import reactiveItem from '@/components/reactives/reactiveItem';
import loading from '@/components/loading';
export default {
  name: 'reactives',

  data() {
    return {
      //show create new reactive
      create: false,
      //send new reactive
      title: '',
      answersList: '',
      //Bajo//1;\nMedio//2;\nAceptable//3;\nBueno//4;\nExcelente//5 <= template
      timer: null,
      response: '',
      buttonDisabled: false,
      // show all reactives
      search: '',
      reactives: []

    }
  },
  methods: {
    showCreateForm() {
      this.create = !this.create;
      if (this.create) window.scroll(0, 0);
    },
    send() {
      this.reactives = [];
      this.buttonDisabled = true;
      let data = {
        title: this.title,
        answersList: this.answersList,
        timer: this.timer
      };
      console.log(data);
      axios.post('https://nom035.human-express.com/php/reactives/create.php', this.createFormData(data))
        .then(response => {
          this.buttonDisabled = false;
          console.log(response.data);
          if (response.data.status) {
            M.toast({
              html: response.data.message
            });
            this.reactives = response.data.reactives;
          } else {
            this.response = response.data.message;
          }
          this.search = ''
        })
        .catch(error => {
          this.buttonDisabled = false;
          this.response = "No se pudo enviar la información";
        })
    },
    get() {
      axios.get('https://nom035.human-express.com/php/reactives/read.php?query=*')
        .then(response => {
          this.reactives = response.data.reactives;
          console.log(response);
        })
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
    createFormData(postData) {
      var formDa = new FormData();
      for (var key in postData) {
        formDa.append(key, postData[key]);
      }
      return formDa;
    }
  },
  components: {
    reactiveItem,
    loading
  },
  mounted() {
    this.get();
    setTimeout(() => {
      M.updateTextFields();
      M.textareaAutoResize(document.getElementById('answersList'));
    }, 10);
  },
  computed: {
    filteredReactives() {
      console.log(this.reactives);
      return this.reactives.filter(reactive => {
        return reactive.title.toLowerCase().includes(this.search.toLowerCase()) ||
          reactive.answersList.toLowerCase().includes(this.search.toLowerCase()) ||
          reactive.timer.toLowerCase().includes(this.search.toLowerCase());
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

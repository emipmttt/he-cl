<template>
<div>
  <div class="card-panel">

    <div class="row">
      <div class="col s12 m6">
        <div class="valign-wrapper">
          <i class="material-icons" style="margin-right:20px">domain</i>
          {{name}}
          <br>
        </div>
        <div class="valign-wrapper">
          <i class="material-icons" style="margin-right:20px">email</i>
          {{email}}
        </div>
      </div>
      <div class="col s12 m6">
        <button data-target="createCampain" class="btn waves-effect waves-light indigo white-text button-action modal-trigger">
          <i class="material-icons left">add</i>
          Crear Diagnóstico
        </button>
        <button @click="showCampain = !showCampain" class="btn waves-effect waves-light pink white-text button-action">
          <i class="material-icons left">turned_in_not</i>
          Ver Diagnósticos
        </button>
      </div>
    </div>
    <div v-if="showCampain">
      <table class="striped">
        <thead>
          <tr>
            <th> <i class="material-icons left">assignment_turned_in</i> Diagnóstico</th>
            <th> <i class="material-icons left">people</i> Participantes</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="campain in campains">
            <td>{{campain.title}}</td>
            <td>{{campain.numberOfParticipants}}</td>
            <td>
              {{campain.status}}
              <div class="switch" style="display:inline-block" title="Activar/Desactivar">
                <label>
                  <input type="checkbox" v-model="campain.status">
                  <span class="lever"></span>
                </label>
              </div>
              <router-link :to="'campain/'+id+'/'+campain.numberOfParticipants+'/'+toUrl(campain.title)" class="btn waves-effect indigo" title="Modificar">
                <i class="material-icons">edit</i>
              </router-link>

            </td>
          </tr>

        </tbody>
      </table>
      <div>
      </div>
    </div>
  </div>

  <div id="createCampain" class="modal modal-fixed-footer" style="overflow-x: hidden">
    <form @submit.prevent="send">
      <div class="modal-content" style="overflow-x: hidden">
        <h4> <i class="material-icons">add</i> Crear diagnóstico</h4>
        <p>Nueva diagnóstico para <strong class="indigo-text">{{name}}</strong></p>
        <p>Una nueva diagnóstico clonará el <strong>cuestionario base actual</strong> y posteriormente podrá ser
          modificado</p>
        <div class="row">
          <div class="col s12">
            <div class="input-field">
              <i class="material-icons prefix">assignment_turned_in</i>
              <input v-model:value="title" id="title" type="text" class="validate" required>
              <label for="title">Nombre de la diagnóstico</label>
            </div>
            <div class="input-field">
              <i class="material-icons prefix">people</i>
              <input v-model:value="numberOfParticipants" id="numberOfParticipants" type="number" class="validate" required>
              <label for="numberOfParticipants">Número de participantes</label>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <span class="indigo-text"> {{response}} </span>
        <a class="btn-flat waves-effect modal-close">
          Cancelar
        </a>
        <a v-if="buttonDisabled">
          <loading class="preloader" />
        </a>

        <button :disabled="buttonDisabled" class="btn waves-effect indigo">
          <i class="material-icons left">add</i>
          Crear
        </button>
      </div>
    </form>
  </div>

</div>
</template>

<script>
import axios from 'axios';
import loading from '@/components/loading';
export default {
  name: 'user-item',
  props: {
    user: Object
  },
  data() {
    return {
      // view
      id: this.user.id,
      name: this.user.name,
      email: this.user.email,
      campains: JSON.parse(this.user.campains),
      showCampain: false,
      // create new campain
      title: '',
      numberOfParticipants: '',
      response: '',

      //edit
      edit: false,
      buttonDisabled: false,
    }
  },
  methods: {
    send() {
      this.response = '';
      this.buttonDisabled = true;
      let data = {
        user: this.id,
        title: this.title,
        numberOfParticipants: this.numberOfParticipants,
        status: false
      }
      axios
        .post('https://clima-laboral.human-express.com/php/campains/create.php', this.createFormData(data))
        .then(response => {
          this.buttonDisabled = false;
          console.log(response.data);
          if (response.data.status) {
            this.$emit('update:change');
            var instance = M.Modal.getInstance(document.querySelector("#createCampain"));
            instance.close();
            this.buttonDisabled = false;
            M.toast({
              html: response.data.message
            });
          } else {
            this.response = response.data.message;
          }
        })
        .catch(error => {
          this.buttonDisabled = false;
          this.response = "No se pudo procesar la información, intentalo de nuevo más tarde";
          M.toast({
            html: "No se pudo procesar la información, intentalo de nuevo más tarde"
          })
        })
    },
    toUrl(string) {
      return string.replace(/ /g, "-").toLowerCase();
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
  mounted() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, {});
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.button-action {
  margin-bottom: 10px
}
</style>

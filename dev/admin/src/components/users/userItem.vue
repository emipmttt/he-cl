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
        <div class="col s12 m6 right-align">

          <button title="Crear Diagnóstico" :data-target="'createCampain' + id" class="btn waves-effect waves-light indigo white-text button-action modal-trigger">
            <i class="material-icons valign-wrapper">add</i>
          </button>
          <button title="Ver Diagnósticos" @click="show('campains')" class="btn waves-effect waves-light pink white-text button-action">
            <i class="material-icons valign-wrapper">turned_in_not</i>
          </button>
          <button title="Eliminar usuario" @click="show('edit')" class="btn waves-effect waves-light red darken-1 white-text button-action">
            <i class="material-icons valign-wrapper">close</i>
          </button>

        </div>
      </div>
      <div v-if="shown == 'edit'" class="center">

        <form @submit.revent="deleteUser" style="padding:10px;border-radius:1rem">
          <p style="font-weight: bold">
            ¿Realmente deseas eliminar este usuario?
          </p>
          <button class="btn red waves-effect">Eliminar Usuario</button>
        </form>
      </div>
      <div v-if="shown == 'campains'">
        <table class="striped">
          <thead>
            <tr>
              <th> <i class="material-icons left">assignment_turned_in</i> Diagnóstico</th>
              <th> <i class="material-icons left">people</i> Participantes</th>
              <th> </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(campain,index) in campains">
              <td>{{campain.title}}</td>
              <td>{{campain.numberOfParticipants}}</td>
              <td>
                <div class="switch" style="display:inline-block" title="Activar/Desactivar">
                  <label>
                    <input type="checkbox" :checked="campain.status == true || campain.status == 'true'" @click.prevent="changeStatus(campain.status,index)">
                    <span class="lever"></span>
                  </label>
                </div>
                <router-link :to="'campain/'+id+'/'+campain.numberOfParticipants+'/'+toUrl(campain.title)" class="btn waves-effect indigo"
                  title="Modificar">
                  <i class="material-icons">edit</i>
                </router-link>
                <button @click="deleteCampain(campain.title)" class="btn waves-effect red" title="Eliminar diagnóstico">
                  <i class="material-icons">close</i>
                </button>

              </td>
            </tr>

          </tbody>
        </table>
        <div>
        </div>
      </div>
    </div>

    <div :id="'createCampain'+id" class="modal modal-fixed-footer" style="overflow-x: hidden">
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
                <input v-model:value="numberOfParticipants" id="numberOfParticipants" type="number" class="validate"
                  required>
                <label for="numberOfParticipants">Número de participantes</label>
              </div>

              <div class="input-field">
                <input v-model:value="entities" id="entities" type="text" class="validate" required>
                <label for="entities">Entidades</label>
              </div>

              <div class="input-field">
                <input v-model:value="areas" id="areas" type="text" class="validate" required>
                <label for="areas">Area/Departamento</label>
              </div>

              <div class="input-field">
                <input v-model:value="turns" id="turns" type="text" class="validate" required>
                <label for="turns">Turno</label>
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
        shown: 'none',
        // create new campain
        title: '',
        numberOfParticipants: '',
        response: '',

        // participant data options
        entities: '',
        areas: '',
        turns: '',

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
          entities: this.entities.split(','),
          areas: this.areas.split(','),
          turns: this.turns.split(',')
        };

        console.log(data);

        axios
          .post('https://clima-laboral.human-express.com/php/campains/create.php', this.createFormData(data))
          .then(response => {
            this.buttonDisabled = false;
            console.log(response.data);
            if (response.data.status) {
              let instance = M.Modal.getInstance(document.querySelector("#createCampain" + this.id));
              instance.close();
              this.buttonDisabled = false;
              M.toast({
                html: response.data.message
              });
              location.reload();
            } else {
              this.response = response.data.message;
            }
          })
          .catch(error => {
            console.log(error);

            this.buttonDisabled = false;
            this.response = "No se pudo procesar la información, intentalo de nuevo más tarde" + error;
            M.toast({
              html: "No se pudo procesar la información, intentalo de nuevo más tarde"
            })
          })
      },
      deleteUser() {
        if (confirm("Eliminar usuario")) {
          let data = {
            user: this.id,
          }

          console.log(data);

          axios
            .post('https://clima-laboral.human-express.com/php/users/delete.php', this.createFormData(data))
            .then(response => {
              console.log(response.data);
              if (response.data.status) {
                M.toast({
                  html: response.data.message
                });
                location.reload();
              } else {
                M.toast({
                  html: response.data.message
                });
              }
            })
            .catch(error => {
              console.log(error);
              this.buttonDisabled = false;
              this.response = "No se pudo procesar la información, intentalo de nuevo más tarde";
              M.toast({
                html: "No se pudo procesar la información, intentalo de nuevo más tarde"
              })
            })
        }
      },
      deleteCampain(campain) {
        if (confirm("Eliminar diagnóstico")) {
          let data = {
            user: this.id,
            campain
          }

          console.log(data);

          axios
            .post('https://clima-laboral.human-express.com/php/campains/delete.php', this.createFormData(data))
            .then(response => {
              console.log(response.data);
              if (response.data.status) {
                M.toast({
                  html: response.data.message
                });
                location.reload();
              } else {
                M.toast({
                  html: response.data.message
                });
              }
            })
            .catch(error => {
              console.log(error);
              this.buttonDisabled = false;
              this.response = "No se pudo procesar la información, intentalo de nuevo más tarde";
              M.toast({
                html: "No se pudo procesar la información, intentalo de nuevo más tarde"
              })
            })
        }
      },
      updateStatus() {

        let data = {
          user: this.id,
          campains: JSON.stringify(this.campains)
        }

        axios
          .post('https://clima-laboral.human-express.com/php/campains/update.php', this.createFormData(data))
          .then(response => {
            console.log(response.data);
            if (response.data.status) {
              this.$emit('update:change');
            }
            M.toast({
              html: response.data.message
            });
          })
          .catch(error => {
            M.toast({
              html: "No se pudo procesar la información, intentalo de nuevo más tarde " + error
            })
          })
      },
      toUrl(string, index) {
        return string.replace(/ /g, "-").toLowerCase();
      },
      changeStatus(status, index) {
        if (status == 'false' || status == false) {
          if (!confirm("Haz click en aceptar para ACTIVAR el diagnóstico")) {} else {
            this.campains[index].status = true;
            this.updateStatus();
          }
        } else if (status == 'true' || status == true) {
          if (!confirm("Haz click en aceptar para DESACTIVAR el diagnóstico")) {} else {
            this.campains[index].status = false;
            this.updateStatus();
          }
        }
      },
      show(option) {
        if (this.shown == option) {
          this.shown = 'none';
        } else {
          this.shown = option;
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

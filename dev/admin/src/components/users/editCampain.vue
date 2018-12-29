<template>
  <div :id="'editCampain' + index" class="modal modal-fixed-footer" style="overflow-x: hidden">
    <form @submit.prevent="sendEdit">
      <div class="modal-content " style="overflow-x: hidden">
        <h4> <i class="material-icons">edit</i> Editar diagnóstico <b class="indigo-text">{{campain.title}}</b></h4>
        <div class="row">
          <div class="col s12">
            <div class="input-field">
              <input v-model:value="participants" :id="'editnumberOfParticipants'+index" type="text" class="validate"
                required>
              <label :for="'editnumberOfParticipants'+index">Número de participantes</label>
            </div>

            <div class="input-field">
              <input v-model:value="campain.entities" :id="'editentities'+index" type="text" class="validate" required>
              <label :for="'editentities'+index">Entidades</label>
            </div>

            <div class="input-field">
              <input v-model:value="campain.areas" id="'editareas'+index" type="text" class="validate" required>
              <label for="'editareas'+index">Area/Departamento</label>
            </div>

            <div class="input-field">
              <input v-model:value="campain.turns" id="'editturns'+index" type="text" class="validate" required>
              <label for="'editturns'+index">Turno</label>
            </div>

            <div class="input-field">
              <input v-model:value="campain.gender" id="'editgender'+index" type="text" class="validate" required>
              <label for="'editgender'+index">Genero</label>
            </div>

            <div class="input-field">
              <input v-model:value="campain.age" id="'editage'+index" type="text" class="validate" required>
              <label for="'editage'+index">Rango de edad</label>
            </div>

            <div class="input-field">
              <input v-model:value="campain.antiquity" id="'editantiquity'+index" type="text" class="validate" required>
              <label for="'editantiquity'+index">Antiguedad en la empresa</label>
            </div>

            <div class="input-field">
              <input v-model:value="campain.school" id="'editschool'+index" type="text" class="validate" required>
              <label for="'editschool'+index">Estudios Concluidos</label>
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
          <i class="material-icons left">check</i>
          guardar
        </button>
      </div>
    </form>
  </div>
</template>

<script>
  import loading from '@/components/loading';
  import axios from 'axios';
  export default {
    props: {
      campainProp: Object,
      campains: Array,
      index: Number,
      user: String
    },
    name: 'edit-campain',
    data() {
      return {
        response: '',
        buttonDisabled: false,
        campain: this.campainProp,
        participants: ''
      }
    },
    methods: {

      sendEdit() {
        let campainToEdit = this.campains.findIndex(element => {
          return element.title == this.campain.title
        });

        this.campain.numberOfParticipants = this.participants;

        this.campains[campainToEdit] = this.campain;
        console.log(this.campains);

        this.response = '';
        this.buttonDisabled = true;

        let data = {
          campains: this.campains,
          user: this.user
        };

        console.log(data);

        axios
          .post('https://clima-laboral.human-express.com/php/campains/update.php', this.createFormData(data))
          .then(response => {
            this.buttonDisabled = false;
            console.log(response.data);
            this.buttonDisabled = false;
            if (response.data.status) {
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
      createFormData(postData) {
        var formDa = new FormData();
        for (var key in postData) {
          formDa.append(key, postData[key]);
        }
        return formDa;
      }

    },
    mounted() {
      var elems = document.querySelectorAll('.modal');
      var instances = M.Modal.init(elems, {});
      document.getElementById("editnumberOfParticipants" + this.index).value = this.campain.numberOfParticipants;
      M.updateTextFields();
    },
    components: {
      loading
    }
  }

</script>

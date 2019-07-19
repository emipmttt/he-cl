<template>
  <tr v-if="!deleted">
    <td> {{rangeNum}} </td>
    <td> {{diagnosis}} </td>
    <td> {{recommendations}} </td>
    <td>
      <button data-target="modalEdit" class="btn-flat indigo-text modal-trigger" @click="toEdit" title="Editar">
        <i class="material-icons">edit</i>
      </button>
      <button class="btn-flat red-text" @click="deleteElement" title="Eliminar">
        <i class="material-icons">close</i>
      </button>

      <div id="modalEdit" class="modal modal-fixed-footer">
        <div class="modal-content">
          <h4>Actualizar</h4>
          <form @submit.prevent="send">
            <div class="input-field">
              <i class="material-icons prefix">assignment_ind</i>
              <input class="validate" v-bind:id="'diagnosis' + id" v-model:value="diagnosis" type="text" maxlength="700"
                required>
              <label v-bind:for="'diagnosis' + id">Diagnóstico</label>
            </div>
            <div class="input-field">
              <i class="material-icons prefix">assignment</i>
              <input class="validate" v-bind:id="'recommendations' + id" v-model:value="recommendations" type="text"
                maxlength="700" required>
              <label v-bind:for="'recommendations' + id">Recomendaciones</label>
            </div>

            <div class="row">
              <div class="col s12 m6">
                <label>Rango</label>
                <select class="browser-default" v-model:value="rangeNum" required>
                  <option value="" disabled selected>Selecciona un Rango</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>

              {{ response }}
            </div>
            <div class="right">
              <loading v-if="buttonDisabled == 1" class="preloader" />
              <button :disabled="buttonDisabled == 1" class="btn waves-effect indigo">
                <i class="material-icons left">done</i>
                Actualizar
              </button>
            </div>
          </form>
        </div>

      </div>

    </td>
  </tr>
  <div v-else></div>

</template>
<script>
  import axios from 'axios';
  import loading from '@/components/loading';
  export default {
    name: 'textualrangeitem',
    props: {
      textualRange: Object
    },
    data() {
      return {
        // view
        id: this.textualRange.id,
        rangeNum: this.textualRange.rangeNum,
        diagnosis: this.textualRange.diagnosis,
        recommendations: this.textualRange.recommendations,
        dependency: this.textualRange.dependency,
        typeDependency: this.textualRange.typeDependency,
        response: '',
        buttonDisabled: false,
        //delete
        deleted: false,
        //edit
        edit: false
      }
    },
    methods: {
      send() {
        this.buttonDisabled = true;
        let data = {
          id: this.id,
          rangeNum: this.rangeNum,
          diagnosis: this.diagnosis,
          recommendations: this.recommendations,
          dependency: this.dependency,
          typeDependency: this.typeDependency,
        };
        console.log(data);
        axios.post('https://nom035.human-express.com/php/textualRanges/update.php', this.createFormData(data))
          .then(response => {
            this.buttonDisabled = false;
            console.log(response.data);
            if (response.status) {
              this.$emit('update:change');
              M.toast({
                html: response.data.message
              });
              var instance = M.Modal.getInstance(document.getElementById('modalEdit'));
              instance.close();
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
        if (confirm("Haz click en Aceptar para eliminar el rango")) {
          let data = {
            id: this.id
          };
          axios.post("https://nom035.human-express.com/php/textualRanges/delete.php", this.createFormData(data))
            .then(element => {
              M.toast({
                html: 'Se ha eliminado el textualRangeo'
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
          let value = parseInt(answer[1]);
          if (answer[1]) {
            answers.push({
              text,
              value
            });
          }
        });
        return answers;
      },
      toEdit() {
        if (this.state == 0 || this.state == 2) {
          this.state = 1;
          setTimeout(() => {
            M.updateTextFields();
            // M.textareaAutoResize(document.getElementById('textarea' + this.id));
          }, 1);
        } else if (this.state == 1) {
          this.state = 0;
        }
      },
      toEdit() {
        this.edit = !this.edit;
        M.updateTextFields();

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
      loading,
    },
    mounted() {
      var elems = document.querySelectorAll('.modal');
      var instances = M.Modal.init(elems, {});
    }
  };

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

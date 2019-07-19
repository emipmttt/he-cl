<template>
  <div>

    <div v-if="!deleted" class="card-panel ">
      <div v-if="state == 0">
        <div class="row">
          <div class="col s2 m3 l2">
            <i class="material-icons">bookmark</i>
          </div>
          <div class="col s10 m9 l10">
            <strong>{{title}}</strong>
          </div>
        </div>
      </div>
      <div v-else-if="state == 1">
        <form @submit.prevent="send">
          <div class="input-field">
            <i class="material-icons prefix">bookmark</i>
            <input :id="'title' + id" max-length="150" type="text" class="validate" required v-model:value="title">
            <label :for="'title' + id">Título</label>
          </div>
          <div class="row">
            <div class="col s12">f
              <div class="valign-wrapper right" style="height:80px">
                <loading v-if="buttonDisabled" class="preloader" />
                <button :disabled="buttonDisabled" class="btn waves-effect indigo">
                  <i class="material-icons left">done</i>
                  Actualizar
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div v-else-if="state == 2">
        <div class="row">
          <div class="col s2 m3 l2">
            <i class="material-icons">bookmark</i>
          </div>
          <div class="col s10 m9 l10">
            <strong>{{title}}</strong>
          </div>
        </div>
        <textual-ranges :aspect="aspect" />
      </div>
      <div class="right-align">
        <button class="btn-flat indigo-text" @click="toRange" title="Tabla de rangos">
          <i class="material-icons">star_half</i>
        </button>
        <button class="btn-flat indigo-text" @click="toEdit" title="Editar">
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
  import textualRanges from '@/components/aspects/textualRanges';
  export default {
    name: 'aspect-item',
    props: {
      aspect: Object
    },
    data() {
      return {
        // view
        id: this.aspect.id,
        title: this.aspect.title,
        response: '',
        state: 0,
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
        };
        console.log(data);
        axios.post('https://clima-laboral.human-express.com/php/aspects/update.php', this.createFormData(data))
          .then(response => {
            this.buttonDisabled = false;
            console.log(response.data);
            if (response.status) {
              this.$emit('update:change');
              M.toast({
                html: response.data.message
              });
              this.state = 0;
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
        if (confirm("Haz click en Aceptar para eliminar el aspecto")) {
          let data = {
            id: this.id
          };
          axios.post("https://clima-laboral.human-express.com/php/aspects/delete.php", this.createFormData(data))
            .then(element => {
              M.toast({
                html: 'Se ha eliminado el aspecto'
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
      toRange() {
        if (this.state == 0 || this.state == 1) {
          this.state = 2;
        } else if (this.state == 2) {
          this.state = 0;
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
      loading,
      textualRanges
    },
    mounted() {}
  };

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

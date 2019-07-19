<template>

  <div>
    <form @submit.prevent="send">
      <div class="input-field">
        <i class="material-icons prefix">assignment_ind</i>
        <input class="validate" v-bind:id="'diagnosis' + aspectId" v-model:value="diagnosis" type="text" maxlength="700"
          required>
        <label v-bind:for="'diagnosis' + aspectId">Diagnóstico</label>
      </div>
      <div class="input-field">
        <i class="material-icons prefix">assignment</i>
        <input class="validate" v-bind:id="'recommendations' + aspectId" v-model:value="recommendations" type="text"
          maxlength="700" required>
        <label v-bind:for="'recommendations' + aspectId">Recomendaciones</label>
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
        <div class="col s12 m6">
          <div class="valign-wrapper right" style="height:80px">
            <loading v-if="buttonDisabled == 1" class="preloader" />
            <button :disabled="buttonDisabled == 1" class="btn waves-effect indigo">
              <i class="material-icons left">add</i>
              Crear
            </button>
          </div>
        </div>
        <p class="indigo-text"> {{ response }} </p>
      </div>

    </form>
    <div class="divider"></div>

    <table>
      <thead>
        <tr>
          <th>
            <i class="material-icons left">assessment</i>
            Rango
          </th>
          <th>
            <i class="material-icons left">assignment_ind</i>
            Diagnóstico
          </th>
          <th>
            <i class="material-icons left">assignment</i>
            Recomendaciones
          </th>
          <th>
            Acciones
          </th>
        </tr>
      </thead>
      <tbody>
        <tr is="textualRangeItem" @update:change="get" :key="textualRange.id" v-for="textualRange in textualRanges"
          :textualRange="textualRange">
        </tr>
      </tbody>
    </table>
  </div>

</template>
<script>
  import axios from 'axios';
  import loading from '@/components/loading';
  import textualRangeItem from '@/components/aspects/textualRangeItem';
  export default {
    name: 'textual-rangeNums',
    props: {
      aspect: Object
    },
    data() {
      return {
        title: this.aspect.title,
        aspectId: this.aspect.id,
        diagnosis: '',
        recommendations: '',
        rangeNum: '',
        textualRanges: [],

        //create form
        response: '',
        buttonDisabled: false,
        deleted: false

      }
    },
    methods: {
      send() {
        let data = {
          dependency: this.aspectId,
          diagnosis: this.diagnosis,
          recommendations: this.recommendations,
          rangeNum: this.rangeNum,
          typeDependency: 'aspect'
        }
        console.log(data);
        this.buttonDisabled = true;
        axios
          .post('https://nom035.human-express.com/php/textualRanges/create.php', this.createFormData(data))
          .then(response => {
            this.buttonDisabled = false;
            console.log(response);
            if (response.data.status) {
              M.toast({
                html: response.data.message
              });
              this.get();
              this.response = '';
            } else {
              this.response = response.data.message;
            }
          })
          .catch(error => {
            this.buttonDisabled = false;
            this.response = "No se pudo enviar la información" + error;

          })
      },
      get() {
        axios.get('https://nom035.human-express.com/php/textualRanges/read.php?query=dependency&dependency=' +
            this.aspectId +
            '&typeDependency=aspect')
          .then(response => {
            this.textualRanges = response.data.textualRanges;
            console.log(response);
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
    components: {
      loading,
      textualRangeItem
    },
    mounted() {
      this.get();
    }
  }

</script>
<style scoped></style>

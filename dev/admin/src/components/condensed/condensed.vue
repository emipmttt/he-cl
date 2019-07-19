<template>
  <div>
    <div class="container">
      <h1 class="large-text">
        <i class="material-icons left">group_work</i>
        Condensados
      </h1>
      <form v-show="create" @submit.prevent="send" id="createReactive">

        <div class="input-field">
          <i class="material-icons prefix">group_work</i>
          <input id="title" max-length="150" type="text" class="validate" required v-model:value="title">
          <label for="title">Título</label>
        </div>


        <div class="input-field col s12">
          <select multiple v-model:value="aspectsSelected">
            <option value="" disabled selected>Selecciona aspectos</option>
            <option v-for="aspect in aspects" :value="aspect.id"> {{aspect.title}} </option>
          </select>
          <label>Aspectos</label>
        </div>

        <div class="row">
          <div class="col s12">
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

      <div v-if="condensed.length">
        <div>
          <condensed-item @update:change="get" v-for="(condensed_, index) in filteredAspects" :key="condensed_.id"
            :condensed_="condensed_" />
        </div>
      </div>
      <div v-else class=" center">
        <loading />
      </div>


    </div>

    <!-- create aspect -->


    <div class="fixed-action-btn">
      <a class="btn-floating btn-large indigo waves-effect" @click="showCreateForm">
        <i class="large material-icons">add</i>
      </a>
    </div>

  </div>
</template>

<script>
  import axios from 'axios';
  import condensedItem from '@/components/condensed/condensedItem';
  import loading from '@/components/loading';
  export default {
    name: 'condensed',
    data() {
      return {
        //show create new aspect
        create: false,
        //send new aspect
        title: '',
        condensed: [],
        aspects: [],
        aspectsSelected: [],
        //Bajo//1;\nMedio//2;\nAceptable//3;\nBueno//4;\nExcelente//5 <= template
        response: '',
        buttonDisabled: false,
        // show all condensed
        search: ''

      }
    },
    methods: {
      showCreateForm() {
        this.create = !this.create;
        if (this.create) window.scroll(0, 0);
      },
      send() {
        this.condensed = [];
        this.buttonDisabled = true;
        let data = {
          title: this.title,
          aspects: JSON.stringify(this.aspectsSelected)
        };
        console.log(data);
        axios.post('https://nom035.human-express.com/php/condensed/create.php', this.createFormData(data))
          .then(response => {
            this.buttonDisabled = false;
            console.log(response.data);
            if (response.status) {
              M.toast({
                html: response.data.message
              });
              this.condensed = response.data.condensed;
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
        axios.get('https://nom035.human-express.com/php/condensed/read.php?query=*')
          .then(response => {
            this.condensed = response.data.condensed;
            console.log(response);

          })
      },
      getAspects() {
        axios.get('https://nom035.human-express.com/php/aspects/read.php?query=*')
          .then(response => {
            this.aspects = response.data.aspects;
            console.log(response.data);
            console.log(this.aspects);
            setTimeout(() => {
              var elems = document.querySelectorAll('select');
              var instances = M.FormSelect.init(elems, {});
            }, 10);
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
      condensedItem,
      loading
    },
    mounted() {
      this.get();
      this.getAspects();
      setTimeout(() => {
        M.updateTextFields();
        // M.textareaAutoResize(document.getElementById('answersList'));
      }, 10);
    },
    computed: {
      filteredAspects() {
        console.log(this.condensed);
        return this.condensed.filter(condensed_ => {
          return condensed_.title.toLowerCase().includes(this.search.toLowerCase())
        })
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

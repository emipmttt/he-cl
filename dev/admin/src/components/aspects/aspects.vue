<template>
  <div>
    <div class="container">
      <h1 class="large-text">
        <i class="material-icons left">bookmark</i>
        Aspectos
      </h1>
      <form v-show="create" @submit.prevent="send" id="createReactive">

        <div class="input-field">
          <i class="material-icons prefix">bookmark</i>
          <input id="title" max-length="150" type="text" class="validate" required v-model:value="title">
          <label for="title">Título</label>
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

      <div v-if="aspects.length">
        <div>
          <aspect-item @update:change="get" v-for="(aspect, index) in filteredAspects" :key="aspect.id" :aspect="aspect" />
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
  import aspectItem from '@/components/aspects/aspectItem';
  import loading from '@/components/loading';
  export default {
    name: 'aspects',
    data() {
      return {
        //show create new aspect
        create: false,
        //send new aspect
        title: '',
        //Bajo//1;\nMedio//2;\nAceptable//3;\nBueno//4;\nExcelente//5 <= template
        response: '',
        buttonDisabled: false,
        // show all aspects
        search: '',
        aspects: []
      }
    },
    methods: {
      showCreateForm() {
        this.create = !this.create;
        if (this.create) window.scroll(0, 0);
      },
      send() {
        this.aspects = [];
        this.buttonDisabled = true;
        let data = {
          title: this.title,
        };
        console.log(data);
        axios.post('https://nom035.human-express.com/php/aspects/create.php', this.createFormData(data))
          .then(response => {
            this.buttonDisabled = false;
            console.log(response.data);
            if (response.data.status) {
              M.toast({
                html: response.data.message
              });
              this.aspects = response.data.aspects;
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
        axios.get('https://nom035.human-express.com/php/aspects/read.php?query=*')
          .then(response => {
            this.aspects = response.data.aspects;
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
      aspectItem,
      loading
    },
    mounted() {
      this.get();
      setTimeout(() => {
        M.updateTextFields();
        // M.textareaAutoResize(document.getElementById('answersList'));
      }, 10);
    },
    computed: {
      filteredAspects() {
        console.log(this.aspects);
        return this.aspects.filter(aspect => {
          return aspect.title.toLowerCase().includes(this.search.toLowerCase())
        })
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

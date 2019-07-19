<template>
<div>
  <div class="container">
    <div class="right" title="número de participantes">
      <i class="material-icons left">people</i> {{numberOfParticipants}}
    </div>
    <h1 class="large-text">
      <i class="material-icons left">assignment_turned_in</i>
      {{displayTitle}}
    </h1>

    <form>
      <div class="input-field">
        <i class="material-icons prefix">search</i>
        <input type="text" v-model:value="search" placeholder="Buscar">
      </div>
    </form>
    <div v-if="reactives.length">
      <div>
        <reactive-item @update:change="get" v-for="(reactive, index) in filteredReactives" :key="reactive.id" :reactive=" reactive" :campainData="$route.params" />
      </div>
    </div>
    <div v-else class=" center">
      <loading />
    </div>


  </div>

</div>
</template>

<script>
import axios from 'axios';
import reactiveItem from '@/components/users/reactiveItem';
import loading from '@/components/loading';
export default {
  name: 'campain',
  data() {
    return {
      // campain
      user: this.$route.params.user,
      title: this.$route.params.campainName,
      displayTitle: this.urlToString(this.$route.params.campainName).toUpperCase(),

      numberOfParticipants: this.$route.params.numberOfParticipants,
      // show all reactives

      reactives: [],
      search: ''
    }
  },
  methods: {
    showCreateForm() {
      this.create = !this.create;
      if (this.create) window.scroll(0, 0);
    },
    get() {
      axios.get('https://nom035.human-express.com/php/campains/read.php?query=*&campain=' + this.displayTitle + "&user=" + this.user)
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
    urlToString(string) {
      return string.replace(/-/g, " ");
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
    console.log(this.reactives);
    this.get();
    setTimeout(() => {
      M.updateTextFields();
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

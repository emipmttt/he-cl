<template>
  <div class="container">
    <h1 class="large-text">
      <i class=" material-icons">assignment_turned_in</i>
      {{ displayTitle }} | <span class="green-text">CAPTURA MASIVA</span>
    </h1>
    <div>
      <div v-if="thisCampain.status">
        <questionnaire :campain="thisCampain" :title="displayTitle" :user="user" />
      </div>
      <div v-else class="center white grey-text valign-wrapper card-panel" style="min-height:80vh">
        <h4>Cuestionario inactivo</h4>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  import questionnaire from '@/components/questionnaire/questionnaire';
  export default {
    name: 'masiveCapture',
    data() {
      return {
        // campain data 
        user: this.$route.params.user,
        displayTitle: this.urlToString(this.$route.params.campain).toUpperCase(),
        reactives: [],
        campains: [],
        thisCampain: {}
      }
    },
    methods: {
      get() {
        axios.get('https://clima-laboral.human-express.com/php/campains/read.php?query=*&campain=' + this.displayTitle +
            "&user=" + this.user)
          .then(response => {
            response.data.reactives.forEach(question => {
              question.status = 0;
            })
            response.data.reactives.reverse()[0].status = 1;
            this.reactives = response.data.reactives.reverse();
            this.reactivesLength = response.data.reactives.reverse().length + 1;
            this.campains = response.data.campains;

            let campains = JSON.parse(this.campains.campains);
            campains.forEach(campain => {
              if (campain.title.toLowerCase() == this.displayTitle.toLowerCase()) {
                this.thisCampain = campain;
              }
            })
            console.log(campains);
            console.log(response.data);
          })
      },
      verifyCampain() {
        axios.get('https://clima-laboral.human-express.com/php/questionnaire/read.php?query=verify&campain=' +
            this.displayTitle + "&user=" + this.user + "&numberOfParticipants=" + this.thisCampain.numberOfParticipants
          )
          .then(response => {
            console.log('https://clima-laboral.human-express.com/php/questionnaire/read.php?query=verify&campain=' +
              this.displayTitle + "&user=" + this.user + "&numberOfParticipants=" + this.thisCampain.numberOfParticipants
            )
            this.thisCampain.status = response.data.status;
          })
      },
      urlToString(string) {
        return string.replace(/-/g, " ");
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
    mounted() {
      this.get();
    },
    updated() {
      this.verifyCampain();
      console.log(this.thisCampain.status);
    },
    components: {
      questionnaire
    }
  }

</script>
<style scoped></style>

var app = new Vue({
  el: '#app',
  data: {
    // campain data
    campain: '',
    category: '',
    displayCategory: '',
    user: 0,
    // status
    status: 0,
    message: '',
    // questionnaires
    questionnaires: [],
    // results
    results: []

  },
  methods: {
    get() {
      axios.get(`https://nom035.human-express.com/php/monitoring/monitoring.php?user=${this.user}&campain=${this.urlToString(this.campain)}`)
        .then(response => {
          this.users = response.data.users;
          console.log(response.data);
          if (response.data.status) {
            this.status = 1;
            this.questionnaires = response.data.questionnaires;
            this.aspects = response.data.aspects;
            this.condensed = response.data.condensed;
            this.getQuery();
            this.buildResults(this.questionnaires);
          } else {
            this.status = 2;
            this.message = response.data.message;
          }
        })
        .catch(error => {
          console.log(error);
          this.status = 2;
          this.message = 'Ha ocurrido un error: ' + error;
        })
    },
    urlToString(string) {
      return string.replace(/-/g, " ");
    },
    getQuery() {

    },
    getURLData() {
      let url = location.href.split("/");
      url.splice(0, 4);
      switch (url[0]) {
        case 'entidad':
          this.category = 'entitie';
          break;
        case 'area':
          this.category = 'area';
          break;
        case 'turno':
          this.category = 'turn';
          break;
        case 'genero':
          this.category = 'gender';
          break;
        case 'edad':
          this.category = 'age';
          break;
        case 'antiguedad':
          this.category = 'antiquity';
          break;
        case 'estudios':
          this.category = 'studies';
          break;
      }
      this.displayCategory = url[0];
      this.user = url[1];
      this.campain = decodeURIComponent(escape(unescape(url[2])));
    },
    buildResults(questionnaires) {

      console.log(questionnaires);
      let categoryList = [];
      questionnaires.forEach(questionnaire => {
        categoryList.push(questionnaire[this.category]);
      });
      var unique = (value, index, self) => {
        return self.indexOf(value) === index;
      }
      categoryList = categoryList.filter(unique);

      var questionnaireList = [];

      categoryList.forEach((category, index) => {
        console.log(index);

        questionnaireList.push({
          category,
          questionnaires: []
        });
        questionnaires.forEach(questionnaire => {
          if (questionnaire[this.category] == category) {
            questionnaireList[index].questionnaires.push(questionnaire);
          }
        })
      })

      console.log(questionnaireList);

      this.results = questionnaireList;

      this.results.forEach((result, index) => {
        let labels = [];

        setTimeout(() => {
          let ctx = document.getElementById('resultsChart' + index).getContext('2d');
          let resultsChart = new Chart(ctx, {
            type: 'horizontalBar',
            data: {
              labels: result.category,
              datasets: [{
                label: "Monitoreo",
                backgroundColor: '#4caf50',
                data: [0, 0, 3],
              }]
            },
            options: {

              scales: {
                xAxes: [{
                  ticks: {
                    beginAtZero: true,
                    max: 100
                  }

                }]
              }
            }
          });
        }, 100)

      })


      // let aspectsSumary = {};
      // var numberQuestionnaires = 0;

      // this.questionnaires.forEach(questionnaire => { // sumary
      //   numberQuestionnaires++;
      //   let aspects = JSON.parse(questionnaire.aspects);
      //   Object.keys(aspects).forEach(key => {
      //     if (isNaN(aspectsSumary[key])) {
      //       aspectsSumary[key] = aspects[key];
      //     } else {
      //       aspectsSumary[key] = aspectsSumary[key] + aspects[key];
      //     }
      //   })
      // });

      // Object.keys(aspectsSumary).forEach(key => {
      //   aspectsSumary[key] = parseFloat(aspectsSumary[key] / numberQuestionnaires).toFixed(2);
      // });

      // this.aspects = aspectsSumary;
    },
    renderChart() {
      var ctx = document.getElementById("myChart").getContext('2d');
      var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
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
    this.getURLData();
    this.get();
  },
});
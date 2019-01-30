var app = new Vue({
  el: "#app",
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
    aspectsPre: [],
    condensed: [],
    textualRanges: [],
    // results
    results: [],
    globalData: {}
  },
  methods: {
    getCampainData() {
      axios.get(`https://clima-laboral.human-express.com/php/monitoring/results.php?user=${this.user}&campain=${this.urlToString(this.campain)}`)
        .then(response => {
          this.users = response.data.users;
          if (response.data.status) {

            this.status = 1;
            this.questionnaires = response.data.questionnaires;
            this.aspectsPre = response.data.aspects;
            this.condensed = response.data.condensed;
            this.textualRanges = response.data.textualRanges;
            if (this.category == 'global') {
              this.buildResultsGlobal();
            }
            this.buildResults(this.category);
          } else {
            this.status = 2;
            this.message = response.data.message;
          }
        })
        .catch(error => {
          this.status = 2;
          this.message = 'Ha ocurrido un error: ' + error;
        })
    },
    urlToString(string) {
      return string.replace(/-/g, " ");
    },
    getURLData() {
      let url = location.href.split("/");
      url.splice(0, 4);
      switch (url[0]) {
        case 'global':
          this.category = 'global';
          break;
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
    buildResults(category) {

      this.aspects.forEach((aspect, index) => {
        var good = 0;
        var bad = 0;

        this.questionnaires.forEach(questionnaire => {
          let aspectCalification = JSON.parse(questionnaire.aspects)[aspect];
          if (aspectCalification < 3) {
            bad++;
          } else {
            good++;
          }
        })

        var goodPorcentage = ((good / this.questionnaires.length) * 100).toFixed(1);
        var badPorcentage = ((bad / this.questionnaires.length) * 100).toFixed(1);

        if (this.category == 'global') {
          setTimeout(() => {
              let ctx = document.getElementById('aspect-chart-' + index).getContext('2d');
              let aspectChart = new Chart(ctx, {
                type: 'pie',
                data: {
                  labels: [`De 1 a 2 - ${badPorcentage} %`, `De 3 a 5 - ${goodPorcentage} %`],
                  datasets: [{
                    data: [bad, good],
                    backgroundColor: ["#bcd6ff", "#3f51b5"]
                  }]
                },
              });
            },
            100);
        }


      });

    },
    buildResultsGlobal() {

      let aspects = {};
      let aspectsParticipants = 0;

      this.questionnaires.forEach(questionnaire => {
        let aspect = JSON.parse(questionnaire.aspects);
        Object.keys(aspect).sort().forEach(key => {

          if (isNaN(aspects[key])) {
            aspects[key] = aspect[key];
          } else {
            aspects[key] += aspect[key];
          }

        });

        aspectsParticipants++;
      });

      var labels = [];
      var data = [];
      var backgroundColor = [];
      var total = 0;

      var globalData = [];

      Object.keys(aspects).forEach(key => {
        total += (aspects[key] / aspectsParticipants);
        aspects[key] = (((aspects[key] / aspectsParticipants) / 5) * 100).toFixed(1);
        labels.push(key);
        backgroundColor.push("#bcd6ff");
        data.push(aspects[key]);

        globalData.push({
          aspect: key,
          value: aspects[key]
        })

      });

      this.globalData = globalData;
      console.log(aspects)

      labels.push("Total");
      backgroundColor.push("#3f51b5");
      data.push((((total / Object.keys(aspects).length) / 5) * 100).toFixed(1));

      setTimeout(() => {
          let ctx = document.getElementById('aspect-chart-global').getContext('2d');
          let aspectChartGlobal = new Chart(ctx, {
            type: 'bar',
            data: {
              labels,
              datasets: [{
                label: "Porcentaje %",
                data,
                backgroundColor,
              }]
            },
            options: {
              responsive: true,
              scales: {
                xAxes: [{
                  max: 100
                }],

                yAxes: [{
                  ticks: {
                    beginAtZero: true,
                    max: 100,
                  }
                }]
              }
            }
          });
        },
        100);

      var sortLabels = [];
      var sortData = [];

      globalData.sort((a, b) => {
        if (a.value > b.value) return 1;
        if (a.value < b.value) return -1;
      });

      globalData.forEach(element => {
        sortData.push(element.value);
        sortLabels.push(element.aspect);
      })

      sortLabels.push("Total");
      sortData.push((((total / Object.keys(aspects).length) / 5) * 100).toFixed(1));


      setTimeout(() => {
          let ctx = document.getElementById('aspect-chart-global-sort').getContext('2d');
          let aspectChartGlobal = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: sortLabels,
              datasets: [{
                label: "Porcentaje %",
                data: sortData,
                backgroundColor,
              }]
            },
            options: {
              responsive: true,
              scales: {
                xAxes: [{
                  max: 100
                }],

                yAxes: [{
                  ticks: {
                    beginAtZero: true,
                    max: 100,
                  }
                }]
              }
            }
          });
        },
        100);
    },
    createFormData(postData) {
      var formDa = new FormData();
      for (var key in postData) {
        formDa.append(key, postData[key]);
      }
      return formDa;
    }
  },
  computed: {
    aspects() {
      let aspects = [];
      this.aspectsPre.forEach(aspect => {
        aspects.push(aspect.title);
      });
      return aspects.sort();
    },
    aspectsToUse() {
      return this.aspectsPre;
    }
  },
  mounted() {
    this.getURLData();
    this.getCampainData();
  },
})
Vue.component("global-parcial-chart", {
  template: `
  
<div>
  <canvas :id="'entitie-global-chart-'+type" style="width:100%"></canvas>
  <div v-for="(data,index) in dataText.totalValues">
    {{dataText.labels[index]}}: <b>{{dataText.totalValues[index]}}%</b>
  </div>
</div>
      
  `,
  props: ["data", "type"],
  data() {
    return {
      condensed: [],
      valuesBuilt: [],
      dataText: ""
    }
  },
  methods: {

    buildDataToUse() {
      var params = [];

      console.log(this.data)
      this.data.forEach(element => {
        params.push(element[this.type]);
      });

      console.log(params)

      var unique = (value, index, self) => {
        return self.indexOf(value) === index;
      }
      params = params.filter(unique);

      var paramsBuilt = [];

      params.forEach(param => {

        let uniqueQuestionnaires = (value, index, array) => {
          return value[this.type] == param;
        }

        let questionnaires = this.data.filter(uniqueQuestionnaires);

        paramsBuilt.push({
          title: param,
          questionnaires
        })

      });

      console.log(this.type);

      // console.log(params);
      // console.log(paramsBuilt);
      // console.log(this.data);
      // console.log("______________________________");

      this.buildChart(paramsBuilt);

    },

    buildChart(params) {
      console.clear();

      console.log(params);
      var labels = [];
      var datasets = [{
        label: "Porcentaje %",
        data: [],
        backgroundColor: "#3f51b5"
      }];

      this.valuesBuilt = params;
      var totalValues = [];
      var labels = [];

      params.forEach(param => {

        console.log(param);

        let aspects = {};
        let aspectsParticipants = 0;

        param.questionnaires.forEach(questionnaire => {
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

        var data = [];
        var backgroundColor = [];
        var total = 0;

        var globalData = [];
        labels.push(param.title);

        Object.keys(aspects).forEach(key => {
          total += (aspects[key] / aspectsParticipants);
          aspects[key] = (((aspects[key] / aspectsParticipants) / 5) * 100).toFixed(1);
          // labels.push(key);
          // backgroundColor.push("#bcd6ff");
          // data.push(aspects[key]);

          globalData.push({
            aspect: key,
            value: aspects[key]
          })

        });

        this.dataText = {
          labels,
          totalValues
        };

        // labels.push("Total");
        // backgroundColor.push("#3f51b5");
        // data.push((((total / Object.keys(aspects).length) / 5) * 100).toFixed(1));
        totalValues.push((((total / Object.keys(aspects).length) / 5) * 100).toFixed(1))


      });
      setTimeout(() => {
          let ctx = document.getElementById('entitie-global-chart-' + this.type).getContext('2d');
          let aspectChartGlobal = new Chart(ctx, {
            type: 'bar',
            data: {
              labels,
              datasets: [{
                label: "Porcentaje %",
                data: totalValues,
                backgroundColor: "#3f51b5",
              }]
            },
            options: {
              responsive: true,
              scales: {
                xAxes: [{
                  ticks: {
                    fontSize: 16,
                    autoSkip: true,
                  }
                }],

                yAxes: [{
                  ticks: {
                    beginAtZero: true,
                    max: 100,
                    fontSize: 20,
                  }
                }]
              }
            }
          });
        },
        100);
    }

    // buildChart(params) {
    //   console.log(params);
    //   var labels = [];
    //   var datasets = [{
    //     label: "Porcentaje %",
    //     data: [],
    //     backgroundColor: "#3f51b5"
    //   }];

    //   params.forEach(param => {

    //     labels.push(param.title);

    //     var porcentagePre = 0;
    //     var porcentageMaxPre = param.questionnaires.length;

    //     param.questionnaires.forEach(questionnaire => {
    //       let aspectsResults = JSON.parse(questionnaire.aspects)
    //       Object.keys(aspectsResults).forEach(key => {
    //         porcentagePre += aspectsResults[key];
    //       })
    //     })
    //     console.log(porcentagePre, porcentageMaxPre)
    //     datasets[0].data.push(((porcentagePre / porcentageMaxPre)).toFixed(1));

    //   });



    //   setTimeout(() => {
    //       let ctx = document.getElementById('entitie-global-chart-' + this.type).getContext('2d');
    //       let aspectChartGlobal = new Chart(ctx, {
    //         type: 'bar',
    //         data: {
    //           labels,
    //           datasets,
    //         },
    //         options: {
    //           responsive: true,
    //           scales: {
    //             xAxes: [{
    //               ticks: {
    //                 fontSize: 16,
    //                 autoSkip: true,
    //               }
    //             }],

    //             yAxes: [{
    //               ticks: {
    //                 beginAtZero: true,
    //                 max: 100,
    //                 fontSize: 20,
    //               }
    //             }]
    //           }
    //         }
    //       });
    //     },
    //     100);
    // }

  },
  mounted() {
    this.buildDataToUse();
  }
})
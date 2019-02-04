Vue.component("global-parcial-chart", {
  template: `
  
<div>
  <canvas :id="'entitie-global-chart-'+type" style="width:100%"></canvas>
</div>
      
  `,
  props: ["data", "type"],
  data() {
    return {
      condensed: [],
      valuesBuilt: []
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
      console.log(params);
      var labels = [];
      var datasets = [{
        label: "Porcentaje %",
        data: [],
        backgroundColor: "#3f51b5"
      }];

      params.forEach(param => {

        labels.push(param.title);

        var porcentagePre = 0;
        var porcentageMaxPre = param.questionnaires.length;

        param.questionnaires.forEach(questionnaire => {
          let aspectsResults = JSON.parse(questionnaire.aspects)
          Object.keys(aspectsResults).forEach(key => {
            porcentagePre += aspectsResults[key];
          })
        })
        datasets[0].data.push(((porcentagePre / porcentageMaxPre) * 2).toFixed(1));

      });



      setTimeout(() => {
          let ctx = document.getElementById('entitie-global-chart-' + this.type).getContext('2d');
          let aspectChartGlobal = new Chart(ctx, {
            type: 'bar',
            data: {
              labels,
              datasets,
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

  },
  mounted() {
    this.buildDataToUse();
  }
})
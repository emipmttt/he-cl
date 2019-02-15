Vue.component("parcial-chart", {
  template: `
  
<div>
  <div v-for="value in valuesBuilt">
    Gráfica {{value.title}}
    <canvas :id="'entitie-global-chart-'+value.title" style="width:100%"></canvas>

    

    <textual-range :data="globalData"></textual-range>

  </div>
</div>
      
  `,
  props: ["data", "type"],
  data() {
    return {
      condensed: [],
      valuesBuilt: [],
      globalData: []

    }
  },
  methods: {

    buildDataToUse() {
      var params = [];

      this.data.forEach(element => {
        params.push(element[this.type]);
      });

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

      this.valuesBuilt = params;

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

        labels.push("Total");
        backgroundColor.push("#3f51b5");
        data.push((((total / Object.keys(aspects).length) / 5) * 100).toFixed(1));

        setTimeout(() => {
            let ctx = document.getElementById('entitie-global-chart-' + param.title).getContext('2d');
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

      });

    }

  },
  mounted() {
    this.buildDataToUse();
  }
})
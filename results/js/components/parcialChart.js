Vue.component("parcial-chart", {
  template: `
  
<div>
  <div v-for="value in valuesBuilt">
    Gráfica {{value.title}}
    <canvas :id="'entitie-global-chart-'+value.title" style="width:100%"></canvas>
    <textual-range :textual-range-data="textualRangeData[value.title]"></textual-range>

  </div>
</div>
      
  `,
  props: ["data", "type"],
  data() {
    return {
      condensed: [],
      valuesBuilt: [],
      globalData: [],
      textualRangeData: {}

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
      // console.log(paramsBuilt);

      // console.log(this.type);

      // console.log(params);
      // console.log(paramsBuilt);
      // console.log(this.data);
      // console.log("______________________________");

      this.buildChart(paramsBuilt);

    },
    answered(aspect, value) {

      if (isNaN(this.aspectsList[aspect])) {
        this.aspectsList[aspect] = value;
      } else {
        this.aspectsList[aspect] = this.aspectsList[aspect] + value;
      }

    },
    addAspectsTotalList() {
      JSON.parse(this.questionnaires[0].reactivesAnswers).forEach(reactive => {
        let aspect = reactive.aspect;

        // console.log(aspect);

        if (isNaN(this.aspectsTotalList[aspect])) {
          this.aspectsTotalList[aspect] = 1;
        } else {
          this.aspectsTotalList[aspect]++;
        }
      });
      // console.log(this.aspectsTotalList);
    },
    calculateAspects() {
      let aspectsCalculated = {};
      Object.keys(this.aspectsTotalList).forEach(key => {
        aspectsCalculated[key] =
          this.aspectsList[key] / this.aspectsTotalList[key];
      });
      this.calculatedAspects = aspectsCalculated;
    },



    buildChart(params) {
      // console.log(params);
      var labels = [];
      var datasets = [{
        label: "Porcentaje %",
        data: [],
        backgroundColor: "#3f51b5"
      }];

      this.valuesBuilt = params;

      params.forEach(param => {

        let reactives = JSON.parse(param.questionnaires[0].reactivesAnswers);
        let aspectsLength = {}
        let aspectsValues = {}
        let reactivesValues = {};
        let reactivesLength = {};
        // obtener valores;
        for (let index = 0; index < reactives.length; index++) {


          let reactiveMedia = 0;
          let aspect = "";

          param.questionnaires.forEach(questionnaire => {

            let reactive = JSON.parse(questionnaire.reactivesAnswers)[index];

            reactiveMedia += ((5 * (reactive.value * 10)) / 5);
            aspect = reactive.aspect;


          })
          if (isNaN(reactivesValues[aspect])) {
            reactivesValues[aspect] = (reactiveMedia / param.questionnaires.length) / 10;
          } else {
            reactivesValues[aspect] += (reactiveMedia / param.questionnaires.length) / 10;
          }
          if (isNaN(reactivesLength[aspect])) {
            reactivesLength[aspect] = 1;
          } else {
            reactivesLength[aspect]++;
          }

        }

        let aspectsMedia = {}
        Object.keys(reactivesValues).forEach(reactive => {
          aspectsMedia[reactive] = (((reactivesValues[reactive] / reactivesLength[reactive]) * 100) / 5).toFixed(2)
        })

        // console.log(aspectsMedia);



        var labels = [];
        var data = [];
        var backgroundColor = [];
        var total = 0;

        var globalData = [];


        Object.keys(aspectsMedia).forEach(key => {
          // console.log(aspects)
          total += parseFloat(aspectsMedia[key]);
          // aspectsMedia[key] = (((aspectsMedia[key] / aspectsParticipants) / 5) * 100).toFixed(1);
          labels.push(key);
          backgroundColor.push("#bcd6ff");
          data.push(aspectsMedia[key]);
        });


        // console.log(this.textualRangeData)


        total = (total / Object.keys(aspectsMedia).length).toFixed(2);

        // this.abcGlobalData = globalData;


        this.globalData = globalData;

        //pasar los datos para el textual range

        console.log(labels, data)
        labels.forEach((aspect, index) => {
          let textualRangeData = this.textualRangeData;

          if (Array.isArray(textualRangeData[param.title])) {
            textualRangeData[param.title].push({
              aspect: aspect,
              value: data[index]
            })
          } else {
            textualRangeData[param.title] = [];
            textualRangeData[param.title].push({
              aspect: aspect,
              value: data[index]
            })
          }

          this.textualRangeData = textualRangeData;
        });

        // pasar los datos para el textual range

        labels.push("Total");
        backgroundColor.push("#3f51b5");
        data.push(total);


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
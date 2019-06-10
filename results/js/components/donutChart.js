Vue.component("donut-chart", {
  template: `
  <div>
    <div style="display: inline-block; min-width: 90%;">
      <h3 class="normal-text"> {{aspect}} </h3>
      <div style="width: 300px; display:inline-block">
        <canvas height="250px" :id="'donutChart' + index"></canvas>
      </div>
      <div style="display:inline-block">
        <table>
            <tr>
              <td>%</td>
              <td>Participantes</td>
            </tr>
            <tr>
              <td><span style="color:#bcd6ff">{{bad.porcentage}}</span></td>
              <td><span style="color:#bcd6ff">{{bad.average}}</span></td>
            </tr>
              <tr>
              <td><span style="color:#3f51b5">{{good.porcentage}}</span></td>
              <td><span style="color:#3f51b5">{{good.average}}</span></td>
            </tr>
          </table>
      </div>
    </div>
  </div>`,
  props: ['questionnaires', 'aspect', 'index'],
  data() {
    return {

    }
  },
  methods: {
    buildChart() {
      let ctx = document.getElementById("donutChart" + this.index).getContext('2d');
      let aspectChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: [`De 1 a 2`, `De 3 a 5`],
          datasets: [{
            data: [this.bad.average, this.good.average],
            backgroundColor: ["#bcd6ff", "#3f51b5"]
          }]
        },
      })
    }
  },
  computed: {
    bad() {

      let bad = 0;
      var length = 0;
      let questionnairesLength = this.questionnaires.length;

      // console.log(questionnairesLength)

      let answerReactives = JSON.parse(this.questionnaires[0].reactivesAnswers);
      // console.log(answerReactives);

      answerReactives.forEach(reactive => {
        if (reactive.aspect == this.aspect) {
          // console.log(reactive.aspect, this.aspect);
          length++
        };
      });

      // console.log(this.questionnaires)
      var badQu = [];
      var badQuL = [];
      var qestaspect = [];
      this.questionnaires.forEach(questionnaire => {
        aspectsnum = 0;
        badQuL++
        // console.log(JSON.parse(questionnaire.reactivesAnswers));
        JSON.parse(questionnaire.reactivesAnswers).forEach((reactive, index, object) => {
          if (reactive.aspect == this.aspect) {
            aspectsnum++;
          }
          if (reactive.aspect == this.aspect && parseInt(reactive.value) < 3 && parseInt(reactive.value) > 0) {
            // console.log(reactive.aspect, this.aspect, reactive.value)
            bad++
            badQu.push(object)
          };
        })
        qestaspect.push(aspectsnum)
      })

      // console.log(this.aspect, qestaspect, qestaspect.reduce(function (a, b) {
      //   return a + b;
      // }));
      // console.log(this.aspect, bad, badQuL, badQu)
      // console.log(this.aspect, bad)
      // console.log(this.aspect, "total: ", qestaspect, " mal: ", bad)
      // console.log(this.aspect, "total: ", qestaspect)

      let average = (bad / length)

      return {
        length,
        average: average.toFixed(2),
        porcentage: ((average / questionnairesLength) * 100).toFixed(2) + "%"
      };

    },
    good() {


      let good = 0;
      let length = 0;
      let questionnairesLength = this.questionnaires.length;


      JSON.parse(this.questionnaires[0].reactivesAnswers).forEach(reactive => {
        if (reactive.aspect == this.aspect) length++;
      })
      var qestaspect = 0;

      this.questionnaires.forEach(questionnaire => {
        JSON.parse(questionnaire.reactivesAnswers).forEach(reactive => {
          if (reactive.aspect == this.aspect) qestaspect++;

          if (reactive.aspect == this.aspect && reactive.value > 2) good++;
        })
      })
      // console.log(this.aspect, good)

      // console.log(this.aspect, "total: ", qestaspect, " bien: ", good)

      let average = (good / length)

      return {
        length,
        average: average.toFixed(2),
        porcentage: ((average / questionnairesLength) * 100).toFixed(2) + "%"
      };

    },
  },
  mounted() {
    this.buildChart();
  }
})
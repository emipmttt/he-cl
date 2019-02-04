Vue.component("condensed-chart", {
  template: `
  
<div>
  <canvas id="condensed-chart" style="width:100%"></canvas>
</div>
      
  `,
  props: ["data", "aspects"],
  data() {
    return {
      condensed: [],
      valuesBuilt: []
    }
  },
  methods: {
    getTextualRanges() {
      axios.get("https://clima-laboral.human-express.com/php/condensed/read.php?query=*")
        .then(response => {
          this.condensed = response.data.condensed;
          this.buildDataToUse();

        })
    },
    buildDataToUse() {

      var condensedBuilt = {}
      var newCondensedBuilt = [];
      var aspectsNum = 0;

      this.condensed.forEach(element => {
        var aspectsTotal = 0;
        var aspects = [];
        JSON.parse(element.aspects).forEach(aspectPre => {
          this.aspects.forEach(aspect => {
            if (aspect.id == aspectPre) {
              this.data.forEach(questionnaire => {
                if (questionnaire.aspect == aspect.title) {
                  aspectsTotal += parseFloat(questionnaire.value);
                  aspects.push({
                    title: aspect.title,
                    value: questionnaire.value,
                  });
                }
              });
            }
          });
        });
        element.aspectsPre = aspects;
        aspectsNum = aspects.length;
        element.aspects = (aspectsTotal / aspectsNum).toFixed(1);
      });

      this.buildCondensed();
    },
    buildCondensed() {
      var labels = [];
      var datasets = [{
        label: "Porcentaje %",
        data: [],
        backgroundColor: "#3f51b5"
      }];

      this.condensed.forEach(element => {
        labels.push(element.title + " " + element.aspects + "%")
        datasets[0].data.push(element.aspects)
      });

      setTimeout(() => {
          let ctx = document.getElementById('condensed-chart').getContext('2d');
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
    this.getTextualRanges();
  }
})
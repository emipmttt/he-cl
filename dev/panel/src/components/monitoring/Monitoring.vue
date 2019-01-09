<template>
  <div class="container">

    <h1 class="large-text">Monitoreo | {{displayTitle}}</h1>
    <div v-if="questionnaires != false">
      <canvas id="monitoringChart"></canvas>
    </div>
    <div v-else class="card-panel">
      <p>Nadie ha participado aún en el diagnóstico</p>
    </div>

  </div>
</template>
<script>
  import axios from 'axios';
  export default {
    name: "Monitoring",
    data() {
      return {
        displayTitle: this.urlToString(this.$route.params.campain).toUpperCase(),
        user: this.$route.params.user,
        questionnaires: false,
        monitoringArray: [],
        totalQuestionnaires: 0
      }
    },
    methods: {
      getMonitoringData() {
        axios
          .get("http://clima-laboral.human-express.com/php/monitoring/monitoring.php?user=" + this.user + "&campain=" +
            this.displayTitle.toLowerCase())
          .then(response => {

            if (response.data.status) {
              this.questionnaires = response.data.questionnaires;
              this.monitoringChart();
            } else {
              console.log(response.data);
            }
          })
          .catch(error => {

          })
      },
      monitoringChart() {

        setTimeout(() => {

          var entities = [];
          var areas = [];

          this.questionnaires.forEach(element => {
            entities.push(element.entitie);
            areas.push(element.area);
          });

          var unique = (value, index, self) => {
            return self.indexOf(value) === index;
          }

          entities = entities.filter(unique);
          areas = areas.filter(unique);
          console.log(entities);
          console.log(areas);

          entities.forEach(entitie => {

            var areasArray = this.questionnaires.filter(element => {
              if (element.entitie == entitie) {
                return element
              }
            })

            var areasNumber = {};

            areasArray.forEach(element => {
              if (isNaN(areasNumber[element.entitie])) {
                areasNumber[element.entitie] = 1;
              } else {
                areasNumber[element.entitie]++
              }

              this.totalQuestionnaires++;

            });


            this.monitoringArray.push({
              entitie,
              areas: areasNumber
            });
          });

          var data = [];

          this.monitoringArray.forEach(element => {
            data.push((element.areas[Object.keys(element.areas)] / this.totalQuestionnaires) * 100);
          })



          console.log(data)

          let ctx = document.getElementById('monitoringChart').getContext('2d');
          let monitoringChart = new Chart(ctx, {
            type: 'horizontalBar',
            data: {
              labels: entities,
              datasets: [{
                label: "Monitoreo",
                backgroundColor: '#4caf50',
                data: data,
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

      },
      urlToString(string) {
        return string.replace(/-/g, " ");
      },
    },
    mounted() {
      this.getMonitoringData();
    }
  }

</script>

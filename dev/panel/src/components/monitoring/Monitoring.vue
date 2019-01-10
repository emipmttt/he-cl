<template>
  <div class="container">

    <h1 class="giant-text">Monitoreo | {{displayTitle}}</h1>

    <div v-if="questionnaires == 'loading'" class="center">
      <loading></loading>
    </div>
    <div v-else-if="questionnaires != false">

      <canvas id="monitoringChartByEntitie"></canvas>

      <h2 class="large-text">Monitoreo por area</h2>
      <div v-for="(element,index) in monitoringByArea">
        <h3 class="medium-text">
          <!-- {{element.entitie}}   -->

          <canvas :id="'monitoringChartByArea'+index"></canvas>


        </h3>
      </div>


    </div>
    <div v-else class="card-panel">
      <p>Nadie ha participado aún en el diagnóstico</p>
    </div>

  </div>
</template>
<script>
  import axios from 'axios';
  import loading from '@/components/loading';
  export default {
    name: "Monitoring",
    data() {
      return {
        displayTitle: this.urlToString(this.$route.params.campain).toUpperCase(),
        user: this.$route.params.user,
        questionnaires: "loading",
        monitoringArray: [],
        totalQuestionnaires: 0,
        monitoringByArea: []
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
              this.monitoringChartByEntitie();
              this.createObjChartByArea();
              this.monitoringChartByArea();
            } else {
              console.log(response.data);
              this.questionnaires = false

            }
          })
          .catch(error => {
            this.questionnaires = false
          })
      },
      createObjChartByArea() {

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

        entities.forEach(entitie => {

          var areasArray = [];
          var questionnaires = [];

          this.questionnaires.forEach(questionnaire => {
            if (questionnaire.entitie == entitie) {
              areasArray.push(questionnaire.area);
              areasArray = areasArray.filter(unique);
            }
          });

          areasArray.forEach(area => {
            var quest = []

            this.questionnaires.forEach(questionnaire => {
              if ((questionnaire.area == area) && (questionnaire.entitie == entitie))
                quest.push(questionnaire);
            })

            var questAreas = [];

            quest.forEach(questElement => {
              questAreas.push(questElement);
            })

            questionnaires.push({
              area,
              questionnaires: questAreas.length
            })

          });

          this.monitoringByArea.push({
            entitie,
            questionnaires
          })

        })

      },
      monitoringChartByEntitie() {

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

          let ctx = document.getElementById('monitoringChartByEntitie').getContext('2d');
          let monitoringChartByEntitie = new Chart(ctx, {
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
      monitoringChartByArea() {

        setTimeout(() => {
          var areas = [];

          this.monitoringByArea.forEach(monitoringElement => {
            var questionnaires = [];
            monitoringElement.questionnaires.forEach(questionnaire => {
              questionnaires.push(questionnaire);
            })
            areas.push({
              entitie: monitoringElement.entitie,
              questionnaires
            })
          });

          areas.forEach((area, index) => {
            console.log(area, index);
            var areas = []
            var questionnaires = []
            var maxNumber = 0;
            area.questionnaires.forEach(areaElement => {
              questionnaires.push(areaElement.questionnaires)
              maxNumber += areaElement.questionnaires;
            })
            area.questionnaires.forEach(areaElement => {
              areas.push(areaElement.area + ": " + ((areaElement.questionnaires / maxNumber) * 100)
                .toFixed(1) + "%");
            });
            console.log(areas)

            let ctx = document.getElementById('monitoringChartByArea' + index).getContext('2d');
            let monitoringChartByEntitie = new Chart(ctx, {
              type: 'horizontalBar',
              data: {
                labels: areas,
                datasets: [{
                  label: area.entitie,
                  backgroundColor: '#5c6bc0',
                  data: questionnaires,
                }]
              },
              options: {

                scales: {
                  xAxes: [{
                    ticks: {
                      beginAtZero: true,
                      max: maxNumber
                    }

                  }]
                }
              }
            });

          });


        }, 100)

      },
      urlToString(string) {
        return string.replace(/-/g, " ");
      },
    },
    mounted() {
      this.getMonitoringData();
    },
    components: {
      loading
    }
  }

</script>

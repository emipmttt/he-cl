<template>
  <div class="container">

    <h1 class="giant-text">Monitoreo | {{displayTitle}}</h1>

    <div v-if="questionnaires == 'loading'" class="center">
      <loading></loading>
    </div>
    <div v-else-if="questionnaires != false">

      <canvas id="monitoringChartByEntitie"></canvas>
      <div v-for="data in dataTextGlobal">
        {{data.element}}: <b>{{data.participants}}</b>
      </div>

      <h2 class="large-text">Monitoreo por Área</h2>
      <div v-for="(element,index) in monitoringByArea">
        <h3 class="medium-text">
        </h3>
        <canvas :id="'monitoringChartByArea'+index"></canvas>
        <div :id="'monitoringTextArea'+index"></div>
        <!-- <div v-if="[element.entitie]" v-for="entitieValue in dataTextParcialPost">
          {{entitieValue.area}}: <b>{{entitieValue.questionnaires}}</b><br>
        </div> -->
      </div>


    </div>
    <div v-else class="card-panel">
      <p>Nadie ha participado aún en el diagnóstico</p>
    </div>

    <div v-show="printStart" @click="print" class="fixed-action-btn">
      <a class="btn-floating btn-large green">
        <i class="large material-icons">print</i>
      </a>
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
        monitoringByArea: [],

        printStart: true,

        //datos para poner en texto en gráfica global
        dataTextGlobal: [],
        dataTextParcial: {},
        updateView: false
      }
    },
    methods: {
      print() {
        let elem = document.getElementById("slide-out");
        let header = document.getElementById("headerhidetoprint");
        var instance = M.Sidenav.getInstance(elem);
        header.style.display = "none";
        instance.close();
        this.printStart = false;
        setTimeout(() => {
          if (window.print()) {
            this.printStart = true;
            instance.open();
            header.style.display = "block";

          } else {
            this.printStart = true;
            instance.open();
            header.style.display = "block";


          }
        }, 100)
      },
      getMonitoringData() {
        axios
          .get("https://clima-laboral.human-express.com/php/monitoring/monitoring.php?user=" + this.user + "&campain=" +
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

        entities.sort()
        areas.sort()
        console.log(areas, entities)

        entities.forEach(entitie => {

          var areasArray = [];
          var questionnaires = [];

          this.questionnaires.forEach(questionnaire => {
            if (questionnaire.entitie == entitie) {
              areasArray.push(questionnaire.area);
              areasArray = areasArray.filter(unique);
            }
          });
          areasArray.sort()
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

          entities.sort()
          areas.sort()

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

          var participantsNumToTitle = [];
          var participantsTitle = [];

          this.monitoringArray.forEach(element => {
            data.push((element.areas[Object.keys(element.areas)] / this.totalQuestionnaires) * 100);
            participantsNumToTitle.push(element.areas[Object.keys(element.areas)]);
          });


          entities.forEach((element, index) => {
            // participantsTitle.push(element + " " + participantsNumToTitle[index])
            participantsTitle.push(element);
            this.dataTextGlobal.push({
              element,
              participants: participantsNumToTitle[index]
            })
          })

          let ctx = document.getElementById('monitoringChartByEntitie').getContext('2d');
          let monitoringChartByEntitie = new Chart(ctx, {
            type: 'horizontalBar',
            data: {
              labels: participantsTitle,
              datasets: [{
                label: "Monitoreo %",
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
            this.dataTextParcial[monitoringElement.entitie] = [0]
          });


          areas.forEach((area, index) => {
            console.log(area, index);
            var areas = []
            var questionnaires = []
            var maxNumber = 0;
            area.questionnaires.forEach(areaElement => {
              questionnaires.push(areaElement.questionnaires)
              maxNumber += areaElement.questionnaires;

              this.dataTextParcial[area.entitie].push({
                area: areaElement.area,
                questionnaires: areaElement.questionnaires
              })

              let datatext = `${ areaElement.area} : <b>${areaElement.questionnaires}</b><br>`;

              document.getElementById('monitoringTextArea' + index).innerHTML += datatext;
              // areas.push(areaElement.area + ": " + areaElement.questionnaires);
              areas.push(areaElement.area);

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
    computed: {
      dataTextParcialPost() {
        return this.dataTextParcial;
      }
    },
    mounted() {
      this.getMonitoringData();
    },
    updated() {
      this.dataTextParcial = this.dataTextParcial
    },
    components: {
      loading
    }
  }

</script>

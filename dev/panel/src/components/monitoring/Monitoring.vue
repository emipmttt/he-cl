<template>
  <div class="container">

    <h1 class="large-text">Monitoreo</h1>
    {{user}} {{displayTitle}}

    <div v-if="questionnaires">
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
        questionnaires: false
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
      initChart() {
        var ctx = document.getElementById('monitoringChart').getContext('2d');
        var monitoringChart = new Chart(ctx, {
          type: 'horizontalBar',
          data: {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [{
              label: "My First dataset",
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
              data: [0, 10, 5, 2, 20, 30, 45],
            }]
          },
          options: options
        });
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

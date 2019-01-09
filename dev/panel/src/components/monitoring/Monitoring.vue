<template>
  <div class="container">

    <h1 class="large-text">Monitoreo</h1>

    <div class="card-panel">
      <p>



      </p>
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
      }
    },
    methods: {
      getMonitoringData() {
        axios
          .get("http://clima-laboral.human-express.com/php/monitoring/monitoring.php?user=" + this.user + "&campain=" +
            this.displayTitle.toLowerCase())
          .then(response => {

          })
          .catch(error => {

          })
      }
    }
  }

</script>

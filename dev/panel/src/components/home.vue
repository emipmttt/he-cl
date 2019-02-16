<template>
  <div>

    <div class="container">
      <div v-if="campainsStatus == 0" class="center">
        <loading />
      </div>
      <div v-else-if="campainsStatus == 1">
        <div v-for="(campain, index) in campains" :key="index">
          <campain-item @update:change="getUserData" :campain="campain" />
        </div>
      </div>
      <div v-else-if="campainsStatus == 2" class="center">
        <p class="grey-text card-panel">
          Aún no hay diagnósticos <br>
          Contáctanos para la asignación de diagnósticos
        </p>
      </div>

    </div>

  </div>
</template>

<script>
  import axios from 'axios';
  import campainItem from '@/components/campainItem';
  import loading from '@/components/loading';
  export default {
    name: 'home',
    data() {
      return {
        // session data
        user: JSON.parse(localStorage.sessionData),
        // campains
        campainsStatus: 0,
        campains: null,
        // search
        search: ''

      }
    },
    methods: {
      getUserData(message) {
        axios
          .post("https://clima-laboral.human-express.com/php/users/read.php?query=user&user=" + this.user.id)
          .then(response => {
            console.log(response.data)
            if (response.data.status) {
              localStorage.sessionData = JSON.stringify(response.data.userData);
              M.toast({
                html: message
              });
              this.campains = JSON.parse(response.data.userData.campains);
              this.verifyCampainsStatus();
            } else {
              M.toast({
                html: response.data.message
              });
              this.campains = false;
            }
          })
          .catch(error => {
            M.toast({
              html: 'No se procesar la información intentalo de nuevo más tarde ' + error
            });
          });
      },
      verifyCampainsStatus() {
        if (Array.isArray(this.campains) && this.campains.length > 0) {
          this.campainsStatus = 1;
          console.log("sípiruli");
        } else {
          this.campainsStatus = 2;
          console.log("nopiruli", this.campains);
        }
      }
    },
    components: {
      campainItem,
      loading
    },
    mounted() {
      console.log(this.campains);
      this.getUserData("¡Bienvenido de nuevo!");
    },
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

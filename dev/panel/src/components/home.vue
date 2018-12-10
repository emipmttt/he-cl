<template>
<div>

  <div class="container">
    <div v-if="campains.length">
      <div v-for="(campain, index) in campains" :key="index">
        <campain-item @update:change="getUserData" :campain="campain" />
      </div>
    </div>
    <div v-else class=" center">
      <loading />
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
      campains: [],
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
          } else {
            M.toast({
              html: response.data.message
            });
          }
        })
        .catch(error => {
          M.toast({
            html: 'No se procesar la información intentalo de nuevo más tarde ' + error
          });
        });
    }
  },
  components: {
    campainItem,
    loading
  },
  mounted() {
    this.campains = JSON.parse(this.user.campains);
    console.log(this.campains);
    this.getUserData("¡Bienvenido de nuevo!");
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

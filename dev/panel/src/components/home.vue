<template>
<div>

  <div class="container">
    <form>
      <div class="input-field">
        <i class="material-icons prefix">search</i>
        <input type="text" v-model:value="search" placeholder="Buscar">
      </div>
    </form>
    <div v-if="campains.length">
      <div>
        <campain-item v-for="(campain, index) in filteredCampains" :key="index" :campain="campain" />
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
    getUserdata() {
      axios
        .post("https://clima-laboral.human-express.com/php/users/read.php?query=user&user=" + this.user.id)
        .then(response => {
          console.log(response.data)
          if (response.data.status) {
            localStorage.sessionData = JSON.stringify(response.data.userData);
            M.toast({
              html: '¡Bienvenido!'
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
    this.getUserdata();
  },
  computed: {
    filteredCampains() {
      console.log(this.campains);
      return this.campains.filter(campain => {
        return campain.title.toLowerCase().includes(this.search.toLowerCase()) ||
          campain.numberOfPaticipants.toLowerCase().includes(this.search.toLowerCase()) ||
          campain.status.toLowerCase().includes(this.search.toLowerCase());
      })
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

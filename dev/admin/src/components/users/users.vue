<template>
<div>
  <div class="container">
    <h1 class="large-text">
      <i class="material-icons left">people</i>
      Clientes
    </h1>

    <div class="divider"></div>

    <form>
      <div class="input-field">
        <i class="material-icons prefix">search</i>
        <input type="text" v-model:value="search" placeholder="Buscar">
      </div>
    </form>

    <div v-if="users.length">
      <div>
        <user-item @update:change="get()" v-for="(user, index) in filteredUsers" :key="user.id" :user="user" />
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
import userItem from '@/components/users/userItem';
import loading from '@/components/loading';
export default {
  name: 'users',

  data() {
    return {
      // show all users
      search: '',
      users: []
    }
  },
  methods: {
    get() {
      axios.get('https://clima-laboral.human-express.com/php/users/read.php?query=*')
        .then(response => {
          this.users = response.data.users;
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        })
    },
    createFormData(postData) {
      var formDa = new FormData();
      for (var key in postData) {
        formDa.append(key, postData[key]);
      }
      return formDa;
    }
  },
  components: {
    userItem,
    loading
  },
  mounted() {
    this.get();
    setTimeout(() => {
      M.updateTextFields();
    }, 10);
  },
  computed: {
    filteredUsers() {
      console.log(this.users);
      return this.users.filter(user => {
        return user.name.toLowerCase().includes(this.search.toLowerCase()) ||
          user.email.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  }
}
//jscaBpler
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

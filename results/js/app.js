var app = new Vue({
  el: '#app',
  data: {
    title: 'Resultados'
  },
  methods: {
    get() {
      axios.get(`https://clima-laboral.human-express.com/php/results/read.php?category=`)
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
  }
});
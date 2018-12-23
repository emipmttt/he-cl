var app = new Vue({
  el: '#app',
  data: {
    // campain data
    campain: '',
    category: '',
    user: 0,
    // status
    status: 0,
    message: '',
    // questionnaires
    questionnaires: []

  },
  methods: {
    get() {
      axios.get(`https://clima-laboral.human-express.com/php/results/read.php?user=${this.user}&campain=${this.campain}`)
        .then(response => {
          this.users = response.data.users;
          console.log(response.data);
          if (response.data.status) {
            this.status = 1;
            this.questionnaires = response.data.questionnaires;
          } else {
            this.status = 2;
            this.message = response.data.message;
          }
        })
        .catch(error => {
          console.log(error);
          this.status = 2;
          this.message = 'Ha ocurrido un error: ' + error;

        })
    },
    getURLData() {
      let url = location.href.split("/");
      url.splice(0, 4);
      switch (url[0]) {
        case 'entidad':
          this.category = 'entitie';
          break;
        case 'entidad':
          this.category = 'entitie';
          break;
      }
      this.user = url[1];
      this.campain = decodeURIComponent(escape(unescape(url[2])));
    },
    createFormData(postData) {
      var formDa = new FormData();
      for (var key in postData) {
        formDa.append(key, postData[key]);
      }
      return formDa;
    }
  },
  mounted() {
    this.getURLData();
    this.get();
  }
});
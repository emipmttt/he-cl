var app = new Vue({
  el: "#app",
  data: {
    // campain data
    campain: '',
    category: '',
    displayCategory: '',
    user: 0,
    // status
    status: 0,
    message: '',
    // questionnaires
    questionnaires: [],
    // results
    results: []
  },
  methods: {
    getCampainData() {
      axios.get(`https://clima-laboral.human-express.com/php/monitoring/results.php?user=${this.user}&campain=${this.urlToString(this.campain)}`)
        .then(response => {
          this.users = response.data.users;
          console.log(response.data);
          if (response.data.status) {
            this.status = 1;
            this.questionnaires = response.data.questionnaires;
            this.aspects = response.data.aspects;
            this.condensed = response.data.condensed;
            // this.buildResults(this.questionnaires);
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
    urlToString(string) {
      return string.replace(/-/g, " ");
    },
    getURLData() {
      let url = location.href.split("/");
      url.splice(0, 4);
      switch (url[0]) {
        case 'global':
          this.category = 'global';
          break;
        case 'entidad':
          this.category = 'entitie';
          break;
        case 'area':
          this.category = 'area';
          break;
        case 'turno':
          this.category = 'turn';
          break;
        case 'genero':
          this.category = 'gender';
          break;
        case 'edad':
          this.category = 'age';
          break;
        case 'antiguedad':
          this.category = 'antiquity';
          break;
        case 'estudios':
          this.category = 'studies';
          break;
      }
      this.displayCategory = url[0];
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
    this.getCampainData();
  },
})
var app = new Vue({
  el: '#app',
  data: {
    // campain data
    campain: '',
    category: '',
    user: 0,

  },
  methods: {
    get() {
      axios.get(`https://clima-laboral.human-express.com/php/results/read.php?category=${this.category}&user=${this.user}&campain=${this.campain}`)
        .then(response => {
          this.users = response.data.users;
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
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
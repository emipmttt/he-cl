<template>
  <div class="card-panel">

    <div class="row">
      <div class="col s12 m3" title="Diagnóstico">
        <i class="material-icons left">assignment_ind</i>
        {{title}}
      </div>
      <div class="col s12 m3" :title="participants + ' de ' + numberOfParticipants + ' particiantes'">
        <i class=" material-icons left">people</i>
        {{participants}} / {{numberOfParticipants}}
      </div>
      <div class="col s12 m3" :title="textualStatus">
        <i class="material-icons left">{{iconStatus}}</i>
        {{displayStatus}}
      </div>
      <div class="col s12 m3" title="Código para usuario">
        <i class="material-icons left">lock</i>
        {{userCode}}
      </div>
    </div>
    <div class="divider"></div>
    <div v-if="status">
      <div class="center">
        <h5 class="green-text">Activo</h5>
        <p class="grey-text text-darken-1">{{textualStatus}}</p>
      </div>
      <div class="divider"></div>
      <br>
      <div class="right-align">
        <router-link :to="'/monitoreo/' + user.id + '/' + toUrl(title)" class="btn-flat waves-effect waves-green">
          <i class="material-icons left">trending_up</i>
          Monitoreo
        </router-link>
        <a :href="'/#/cuestionario/' + user.id + '/' + toUrl(title)" target="_blank" class="btn-flat waves-effect waves-green">
          <i class="material-icons left">person</i>
          individual / en linea
        </a>
        <router-link :to="'captura-masiva/'+ user.id + '/' + toUrl(title)" class="btn waves-effect indigo">
          <i class="material-icons left">people</i>
          Captura masiva
        </router-link>
      </div>
    </div>
    <div v-else class="center grey-text text-darken-1">
      <h5>Inactivo</h5>
      <p>{{textualStatus}}</p>
      <div class="divider"></div>
      <div class="right-align">
        <br>
        <button @click="viewResults = !viewResults" class="btn waves-effect indigo">
          <i class="material-icons left">assessment</i>
          Ver resultados
        </button>
      </div>
    </div>
    <br>
    <div v-if="viewResults">
      <div class="divider"></div>
      <a v-for="(result,index) in results" :key="index" :href="'/resultados#/'+result.category+'/'+user.id+'/'+title"
        class="hoverable grey lighten-3" style="margin:5px;border-radius:2rem;padding:10px 20px;display:inline-block">
        <i class="material-icons left">{{result.icon}}</i>
        {{result.text}}
      </a>
    </div>

  </div>
</template>

<script>
  import axios from "axios";
  export default {
    name: 'campain-item',
    props: {
      campain: Object
    },
    data() {
      return {
        // campain data
        user: JSON.parse(localStorage.sessionData),
        title: this.campain.title,
        numberOfParticipants: this.campain.numberOfParticipants,
        participants: 0,
        status: this.campain.status,
        userCode: this.campain.userCode,

        // visible campain data

        displayStatus: '',
        iconStatus: '',
        textualStatus: '',

        // view results

        viewResults: false,

        //results

        results: [{
          icon: 'place',
          text: 'Entidad',
          category: 'entidad'
        }, {
          icon: 'assignment',
          text: 'Area / Departamento',
          category: 'area'
        }, {
          icon: 'alarm',
          text: 'Turno',
          category: 'turno'
        }, {
          icon: 'wc',
          text: 'Genero',
          category: 'genero'
        }, {
          icon: 'date_range',
          text: 'Rango de edad',
          category: 'edad'
        }, {
          icon: 'school',
          text: 'Estudios concluídos',
          category: 'estudios'
        }, {
          icon: 'calendar_today',
          text: 'Antigüedad en la empresa',
          category: 'antiguedad'
        }]

      }
    },
    methods: {
      get() {
        axios
          .get("https://clima-laboral.human-express.com/php/questionnaire/read.php?query=*&user=" + this.user.id +
            "&campain=" + this.title)
          .then(response => {
            console.log(response.data)
            if (response.data.status) {
              this.participants = response.data.participants;
            } else {
              this.participants = 0;
            }
          })
          .catch(error => {
            M.toast({
              html: 'No se procesar la información intentalo de nuevo más tarde ' + error
            });
          });
      },
      verifyStatus() {
        if (this.campain.status) {
          this.displayStatus = "Activo";
          this.iconStatus = "toggle_on";
          this.textualStatus = "Mientras el diagnóstico esté activo, los participantes podrán resolver cuestionarios"
        } else {
          this.displayStatus = "Inactivo";
          this.iconStatus = "toggle_off";
          this.textualStatus =
            "Mientras el diagnóstico esté inactivo, los participantes no podrán resolver cuestionarios y todos los resultados estarán disponibles"
        }
      },
      toUrl(string, index) {
        return string.replace(/ /g, "-").toLowerCase();
      },
      urlToString(string) {
        return string.replace(/-/g, " ");
      },
    },
    mounted() {
      this.verifyStatus();
      this.get();
      //this.$emit('update:change');
    }
  }

</script>

<style>
</style>

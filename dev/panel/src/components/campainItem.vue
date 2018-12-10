<template>
<div class="card-panel">

  <div class="row">
    <div class="col s12 m4" title="Diagnóstico">
      <i class="material-icons left">assignment_ind</i>
      {{title}}
    </div>
    <div class="col s12 m4" :title="numberOfParticipants + 'particiantes'">
      <i class=" material-icons left">people</i>
      {{numberOfParticipants}}
    </div>
    <div class="col s12 m4" :title="textualStatus">
      <i class="material-icons left">{{iconStatus}}</i>
      {{displayStatus}}
    </div>
  </div>
  <div class="divider"></div>
  <div v-if="status">
    <div class="center">
      <h5 class="green-text">Activo</h5>
      <p>{{textualStatus}}</p>
    </div>
    <div class="divider"></div>
    <br>
    <div class="right-align">
      <a :href="'/#/cuestionario/' + user.id + '/' + toUrl(title)" target="_blank" class="btn-flat waves-effect waves-green">
        <i class="material-icons left">person</i>
        individual / en linea
      </a>
      <button class="btn waves-effect indigo">
        <i class="material-icons left">list</i>
        Captura masiva
      </button>
    </div>
  </div>
  <div v-else class="center grey-text text-darken-1">
    <h5>Diagnóstico inactivo</h5>
    <p>{{textualStatus}}</p>
    <div class="divider"></div>
    <div class="right-align">
      <br>
      <button class="btn waves-effect indigo">
        <i class="material-icons left">assignment</i>
        Ver resultados
      </button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'campain-item',
  props: {
    campain: Object
  },
  data() {
    return {
      user: JSON.parse(localStorage.sessionData),
      title: this.campain.title,
      numberOfParticipants: this.campain.numberOfParticipants,
      status: this.campain.status,
      displayStatus: '',
      iconStatus: '',
      textualStatus: '',
    }
  },
  methods: {
    verifyStatus() {
      if (this.campain.status) {
        this.displayStatus = "Activo";
        this.iconStatus = "toggle_on";
        this.textualStatus = "Mientras el diagnóstico esté activo, los participantes podrán resolver cuestionarios"
      } else {
        this.displayStatus = "Inactivo";
        this.iconStatus = "toggle_off";
        this.textualStatus = "Mientras el diagnóstico esté inactivo, los participantes no podrán resolver cuestionarios y todos los resultados estarán disponibles"
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
    //this.$emit('update:change');
  }
}
</script>

<style>
</style>

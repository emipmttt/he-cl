<template>
  <div id="app">
    <div v-if="isAdmin">
      <ul id="slide-out" class="sidenav sidenav-fixed white">
        <li class="center">
          <img src="./assets/logo.png" alt="human express" class="responsive-img sidenav-logo">
        </li>
        <li>
          <router-link class="sidenav-close" to="/">
            <i class="material-icons">people</i>
            Clientes
          </router-link>
        </li>
        <li>
          <a href="/usuarios">
            <i class="material-icons">person</i>
            Area de clientes</a>
        </li>
        <li>
          <div class="divider"></div>
        </li>
        <li>
          <a class="subheader">Gestión</a>
        </li>
        <li>
          <a href="#!">
            <i class="material-icons">all_inbox</i>
            Exportar
          </a>
        <li>
          <div class="divider"></div>
        </li>
        <li>
          <a class="subheader">Cuestionario base</a>
        </li>
        <li>
          <router-link class="sidenav-close" to="/reactivos">
            <i class="material-icons">bookmarks</i>
            Reactivos
          </router-link>
        </li>
        <li>
          <router-link class="sidenav-close" to="/aspectos">
            <i class="material-icons">bookmark</i>
            Aspectos
          </router-link>
        </li>
        <li>
          <router-link class="sidenav-close" to="/condensados">
            <i class="material-icons">group_work</i>
            Condensados
          </router-link>
        </li>
        <li>
          <div class="divider"></div>
        </li>
        <li>
          <a @click="logout">
            <i class="material-icons">exit_to_app</i>
            Salir
          </a>
        </li>
      </ul>


      <header class="navbar-fixed hide-on-large-only">
        <nav>
          <div class="nav-wrapper grey lighten-4">
            <a class="brand-logo navbar-logo"><img src="./assets/logo.png" alt="human express" class="responsive-img"></a>
            <a data-target="slide-out" class="sidenav-trigger indigo-text"><i class="material-icons">menu</i></a>
          </div>
        </nav>
      </header>

      <main>
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        screen: screen
      }
    },
    methods: {
      logout() {
        sessionStorage.sessionData = 0;
        this.verify();
      },
      verify() {
        if (sessionStorage.sessionData) {
          if (JSON.parse(sessionStorage.sessionData).type) {} else {
            location.href = "/"
          }
        } else {
          location.href = "/"
        }
      }
    },
    computed: {
      isAdmin() {
        if (sessionStorage.sessionData) {
          if (JSON.parse(sessionStorage.sessionData).type) {
            return true
          } else {
            return false
          }
        } else {
          return false
        }
      }
    },
    mounted() {
      this.verify();

      var elems = document.querySelectorAll('.sidenav');
      var instances = M.Sidenav.init(elems, {});
    }
  }

</script>

<style>
  @import './assets/css/global.css';

</style>

<template>
<div id="app">
  <header class="navbar-fixed hide-on-large-only">
    <nav>
      <div class="nav-wrapper grey lighten-4">
        <a class="brand-logo navbar-logo"><img src="@/assets/logo.png" alt="human express" class="responsive-img"></a>
        <a data-target="slide-out" class="sidenav-trigger indigo-text"><i class="material-icons">menu</i></a>
      </div>
    </nav>
  </header>

  <ul id="slide-out" class="sidenav sidenav-fixed">
    <li>
      <div class="user-view">
        <div class="background indigo lighten-1 center">
          <img src="@/assets/logo.png" style="width:70%;margin:5px 0 ">
        </div>
        <br>
        <a><span class="white-text name">{{user.name}}</span></a>
        <a><span class="white-text email">{{user.email}}</span></a>
      </div>
    </li>
    <li><a><i class="material-icons">assignment_turned_in</i>Diagnósticos</a></li>
    <li>
      <div class="divider"></div>
    </li>
    <!-- <li><a class="subheader">Subheader</a></li>
      <li><a class="waves-effect" href="#!">Third Link With Waves</a></li> -->
  </ul>

  <main>
    <router-view />
  </main>
</div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      user: JSON.parse(localStorage.sessionData)
    }
  },
  mounted() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {});
  }
}
</script>

<style> @import './assets/css/global.css';</style>

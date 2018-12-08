<template>
<div>

  <div class="container">
    {{user}}
    <div v-for="campain in user.campains">
      LEe
    </div>
  </div>

</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'home',
  data() {
    return {
      user: JSON.parse(localStorage.sessionData)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

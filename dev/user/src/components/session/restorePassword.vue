<template>
  <div>

    <div class="row" style="min-height:100vh;margin:0">
      <div class="col s12 m6 indigo valign-wrapper" style="min-height:100vh;box-shadow: 1px 2px 50px rgba(0,0,0,.5)">
        <div class="container">
          <div class="card-panel grey lighten-4">

            <div class="center hide-on-large-only">
              <img src="@/assets/logo.png" style="width: 60%">
              <br>
              <br>
            </div>

            <div class="container-">
              <form @submit.prevent="restore">
                <div class="large-text">
                  <i class="material-icons left large-text">person</i>
                  Cambiar contraseña
                </div>

                <div class="input-field">
                  <i class="material-icons prefix">email</i>
                  <input v-model:value="email" id="email" type="email" class="validate" required>
                  <label for="email">Correo Electrónico</label>
                </div>
                <div class="input-field">
                  <i class="material-icons prefix">email</i>
                  <input v-model:value="password" id="password" type="password" class="validate" required>
                  <label for="password">Contraseña</label>
                </div>
                <div class="input-field">
                  <i class="material-icons prefix">password</i>
                  <input v-model:value="passwordConfirm" id="passwordConfirm" type="password" class="validate" required>
                  <label for="passwordConfirm">Confirmar contraseña</label>
                </div>
                <div class="center"> {{response}} </div>

                <div class="row">
                  <div class="col s12">
                    <div class="valign-wrapper right" style="height:80px">
                      <loading v-if="buttonDisabled" class="preloader" />
                      <button :disabled="buttonDisabled" class="btn waves-effect indigo">
                        <i class="material-icons left">send</i>
                        Cambiar contraseña
                      </button>
                    </div>
                    <br>
                    <router-link to="/" class="btn-flat waves-effect indigo-text right">
                      <i class="material-icons left">lock</i>
                      Conozco mi contraseña
                    </router-link>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="s12 m6 indigo lighten-1 center">
        <div class="valign-wrapper" style="min-height:100vh;">
          <div style="width: 100%">
            <img src="@/assets/logo.png" style="width: 60%">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import loading from '@/components/loading';
  export default {
    name: 'reestore',
    data() {
      return {
        //restore data
        code: this.$route.params.code,
        email: '',
        password: '',
        passwordConfirm: '',
        //form data
        buttonDisabled: false,
        response: '',
      }
    },
    methods: {
      restore() {

        this.buttonDisabled = true;
        this.response = '';

        let data = {
          code: this.code,
          email: this.email,
          password: this.password,
          passwordConfirm: this.passwordConfirm,

          action: 'restore'
        }

        axios
          .post("https://clima-laboral.human-express.com/php/session/restore.php", this.createFormData(data))
          .then(response => {
            this.buttonDisabled = false;
            if (response.data.status) {
              M.toast({
                html: response.data.message
              });
            } else {
              M.toast({
                html: response.data.message
              });
            }
            this.response = response.data.message;
          })
          .catch(error => {
            this.buttonDisabled = false;
            M.toast({
              html: 'No se procesar la información intentalo de nuevo más tarde'
            });
            this.response = 'No se procesar la información intentalo de nuevo más tarde';
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
      loading
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>

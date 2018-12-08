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
            <form v-if="mode" @submit.prevent="login">
              <div class="large-text">
                <i class="material-icons left large-text">person</i>
                Acceder
              </div>

              <div class="input-field">
                <i class="material-icons prefix">email</i>
                <input v-model:value="emailLogin" id="emailLogin" type="email" class="validate" required>
                <label for="emailLogin">Correo Electrónico</label>
              </div>

              <div class="input-field">
                <i class="material-icons prefix">lock</i>
                <input v-model:value="passwordLogin" id="passwordLogin" type="password" class="validate" required>
                <label for="passwordLogin">Contraseña</label>
              </div>
              <div class="center">{{responseLogin}}</div>
              <div class="row">
                <div class="col s12">
                  <div class="valign-wrapper right" style="height:80px">
                    <div @click="mode = !mode" class="btn-flat waves-effect indigo-text">
                      <i class="material-icons left">person_add</i>
                      Registrate
                    </div>
                    <loading v-if="buttonDisabled" class="preloader" />
                    <button :disabled="buttonDisabled" class="btn waves-effect indigo">
                      <i class="material-icons left">send</i>
                      Entrar
                    </button>
                  </div>
                  <br>
                  <router-link to="solicitar-cambio" class="btn-flat waves-effect indigo-text right">
                    <i class="material-icons left">lock</i>
                    Olvidé mi contraseña
                  </router-link>
                </div>
              </div>

            </form>
            <form v-if="!mode" @submit.prevent="signin">
              <div class="large-text">
                <i class="material-icons left large-text">person_add</i>
                Regístrate
              </div>

              <div class="input-field">
                <i class="material-icons prefix">domain</i>
                <input maxlength="200" v-model:value="nameSignin" id="nameSignin" type="text" class="validate" required>
                <label for="nameSignin">Organización</label>
              </div>

              <div class="input-field">
                <i class="material-icons prefix">email</i>
                <input maxlength="200" v-model:value="emailSignin" id="emailSignin" type="email" class="validate" required>
                <label for="emailSignin">Correo Electrónico</label>
              </div>

              <div class="input-field">
                <i class="material-icons prefix">lock</i>
                <input maxlength="200" v-model:value="passwordSignin" id="passwordSignin" type="password" class="validate" required>
                <label for="passwordSignin">Contraseña</label>
              </div>

              <div class="input-field">
                <i class="material-icons prefix">lock</i>
                <input maxlength="200" v-model:value="passwordConfirmSignin" id="passwordConfirmSignin" type="password" class="validate" required>
                <label for="passwordConfirmSignin">Confirmar contraseña</label>
              </div>
              <div class="center">{{responseSignin}}</div>
              <div class="row">
                <div class="col s12">
                  <div class="valign-wrapper right" style="height:80px">

                    <div @click="mode = !mode" class="btn-flat waves-effect indigo-text">
                      <i class="material-icons left">person</i>
                      Ya tengo una cuenta
                    </div>
                    <loading v-if="buttonDisabled" class="preloader" />
                    <button :disabled="buttonDisabled" class="btn waves-effect indigo">
                      <i class="material-icons left">person_add</i>
                      Entrar
                    </button>
                  </div>
                  <br>
                  <router-link to="solicitar-cambio" class="btn-flat waves-effect indigo-text right">
                    <i class="material-icons left">lock</i>
                    Olvidé mi contraseña
                  </router-link>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="s12 m6 indigo lighten-1 center valign-wrapper center " style="min-height:100vh;">
      <div style="width: 100%">
        <img src="@/assets/logo.png" style="width: 60%">
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import loading from '@/components/loading';
export default {
  name: 'session',
  data() {
    return {
      //signin data
      nameSignin: '',
      emailSignin: '',
      passwordSignin: '',
      passwordConfirmSignin: '',
      responseSignin: '',

      //login data
      emailLogin: '',
      passwordLogin: '',
      responseLogin: '',

      //form data
      buttonDisabled: false,

      // login or signin, true:login, false:signin
      mode: true
    }
  },
  methods: {
    signin() {

      this.buttonDisabled = true;
      this.responseSignin = '';

      if (this.passwordSignin == this.passwordConfirmSignin) {
        let data = {
          name: this.nameSignin,
          email: this.emailSignin,
          password: this.passwordSignin
        }
        axios
          .post("https://clima-laboral.human-express.com/php/session/signin.php", this.createFormData(data))
          .then(response => {
            console.log(response.data)
            this.buttonDisabled = false;
            if (response.data.status) {
              localStorage.sessionData = response.data.userData;
              M.toast({
                html: '¡Bienvenido!'
              });
              this.$router.push('/panel');
            } else {
              M.toast({
                html: response.data.message
              });
            }
            this.responseSignin = response.data.message;
          })
          .catch(error => {
            this.buttonDisabled = false;
            M.toast({
              html: 'No se procesar la información intentalo de nuevo más tarde'
            });
            this.responseSignin = 'No se procesar la información intentalo de nuevo más tarde' + error;
          })
      } else {
        this.responseSignin = 'Ambas contraseñas deben coincidir';
        M.toast({
          html: 'Ambas contraseñas deben coincidir'
        });
        this.buttonDisabled = false;

      }
    },
    login() {
      this.buttonDisabled = true;
      this.responseLogin = '';

      let data = {
        email: this.emailLogin,
        password: this.passwordLogin
      }

      axios
        .post("https://clima-laboral.human-express.com/php/session/login.php", this.createFormData(data))
        .then(response => {
          console.log(response.data)
          this.buttonDisabled = false;
          if (response.data.status) {
            localStorage.sessionData = response.data.userData;
            M.toast({
              html: '¡Bienvenido!'
            });
            this.$router.push('/panel');
          } else {
            M.toast({
              html: response.data.message
            });
          }
          this.responseLogin = response.data.message;
        })
        .catch(error => {
          this.buttonDisabled = false;
          M.toast({
            html: 'No se procesar la información intentalo de nuevo más tarde'
          });
          this.responseLogin = 'No se procesar la información intentalo de nuevo más tarde ' + error;
        });
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

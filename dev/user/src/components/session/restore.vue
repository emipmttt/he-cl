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
              <form @submit.prevent="request">
                <div class="large-text">
                  <i class="material-icons left large-text">person</i>
                  Cambiar contraseña
                </div>

                <p class=" left-align hide-on-med-and-up">
                  Solicita un cambio de contraseña si has olvidado tu contraseña<br><br>
                  Te enviaremos un mensaje a tu correo electrónico con un enlace para que puedas asignar tu nueva
                  contraseña<br><br>
                  Debes ser rápido pues el enlace sólo durará activo 15 minútos.<br><br>
                  Después de eso deberás solicitar otro cambio en esta página si aún deseas cambiar tu contraseña
                </p>

                <div class="input-field">
                  <i class="material-icons prefix">email</i>
                  <input v-model:value="email" id="email" type="email" class="validate" required>
                  <label for="email">Correo Electrónico</label>
                </div>
                <div class="center"> {{response}} </div>

                <div class="row">
                  <div class="col s12">
                    <div class="valign-wrapper right" style="height:80px">
                      <loading v-if="buttonDisabled" class="preloader" />
                      <button :disabled="buttonDisabled" class="btn waves-effect indigo">
                        <i class="material-icons left">send</i>
                        Solicitar cambio
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
            <div class="container">
              <p class="indigo-text text-lighten-4 left-align hide-on-small-only">
                Solicita un cambio de contraseña si has olvidado tu contraseña<br><br>
                Te enviaremos un mensaje a tu correo electrónico con un enlace para que puedas asignar tu nueva
                contraseña<br><br>
                Debes ser rápido pues el enlace sólo durará activo 15 minútos.<br><br>
                Después de eso deberás solicitar otro cambio en esta página si aún deseas cambiar tu contraseña
              </p>
            </div>
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
        email: '',

        //form data
        buttonDisabled: false,
        response: '',
      }
    },
    methods: {
      request() {

        this.buttonDisabled = true;
        this.response = '';

        let data = {
          email: this.email,
          action: 'request'
        }

        axios
          .post("https://clima-laboral.human-express.com/php/session/restore.php", this.createFormData(data))
          .then(response => {
            this.buttonDisabled = false;
            if (response.data.status) {
              M.toast({
                html: 'Te hemos enviado un correo electrónico'
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

webpackJsonp([1],{"7Otq":function(t,e,a){t.exports=a.p+"user/img/logo.de0ec56.png"},Di4z:function(t,e){},Lepv:function(t,e){},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("7+uW"),i={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var n=a("VU/8")({name:"App"},i,!1,function(t){a("Lepv")},null,null).exports,r=a("/ocq"),o=a("mvHQ"),l=a.n(o),c=a("mtWM"),v=a.n(c),d={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"lds-ring"},[e("div"),this._v(" "),e("div"),this._v(" "),e("div"),this._v(" "),e("div")])}]};var u=a("VU/8")({name:"loading"},d,!1,function(t){a("yWe1")},"data-v-9f49528e",null).exports,m={name:"session",data:function(){return{nameSignin:"",emailSignin:"",passwordSignin:"",passwordConfirmSignin:"",responseSignin:"",emailLogin:"",passwordLogin:"",responseLogin:"",buttonDisabled:!1,mode:!0}},methods:{signin:function(){var t=this;if(this.buttonDisabled=!0,this.responseSignin="",this.passwordSignin==this.passwordConfirmSignin){var e={name:this.nameSignin,email:this.emailSignin,password:this.passwordSignin};v.a.post("https://clima-laboral.human-express.com/php/session/signin.php",this.createFormData(e)).then(function(e){console.log(e.data),t.buttonDisabled=!1,e.data.status?(localStorage.sessionData=l()(e.data.userData),M.toast({html:"¡Bienvenido!"}),0==e.data.userData.type?location.href="/usuario":1==e.data.userData.type&&(location.href="/administrar")):M.toast({html:e.data.message}),t.responseSignin=e.data.message}).catch(function(e){t.buttonDisabled=!1,M.toast({html:"No se pudo procesar la información intentalo de nuevo más tarde"}),t.responseSignin="No se procesar la información intentalo de nuevo más tarde"+e})}else this.responseSignin="Ambas contraseñas deben coincidir",M.toast({html:"Ambas contraseñas deben coincidir"}),this.buttonDisabled=!1},login:function(){var t=this;this.buttonDisabled=!0,this.responseLogin="";var e={email:this.emailLogin,password:this.passwordLogin};v.a.post("https://clima-laboral.human-express.com/php/session/login.php",this.createFormData(e)).then(function(e){console.log(e.data),t.buttonDisabled=!1,e.data.status?(localStorage.sessionData=l()(e.data.userData),M.toast({html:"¡Bienvenido!"}),0==e.data.userData.type?location.href="/usuario":1==e.data.userData.type&&(location.href="/administrar")):M.toast({html:e.data.message}),t.responseLogin=e.data.message}).catch(function(e){t.buttonDisabled=!1,M.toast({html:"No se procesar la información intentalo de nuevo más tarde"}),t.responseLogin="No se procesar la información intentalo de nuevo más tarde "+e})},createFormData:function(t){var e=new FormData;for(var a in t)e.append(a,t[a]);return e}},components:{loading:u}},p={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"row",staticStyle:{"min-height":"100vh",margin:"0"}},[a("div",{staticClass:"col s12 m6 indigo valign-wrapper",staticStyle:{"min-height":"100vh","box-shadow":"1px 2px 50px rgba(0,0,0,.5)"}},[a("div",{staticClass:"container"},[a("div",{staticClass:"card-panel grey lighten-4"},[t._m(0),t._v(" "),a("div",{staticClass:"container-"},[t.mode?a("form",{on:{submit:function(e){return e.preventDefault(),t.login(e)}}},[t._m(1),t._v(" "),a("div",{staticClass:"input-field"},[a("i",{staticClass:"material-icons prefix"},[t._v("email")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model:value",value:t.emailLogin,expression:"emailLogin",arg:"value"}],staticClass:"validate",attrs:{id:"emailLogin",type:"email",required:""},domProps:{value:t.emailLogin},on:{input:function(e){e.target.composing||(t.emailLogin=e.target.value)}}}),t._v(" "),a("label",{attrs:{for:"emailLogin"}},[t._v("Correo Electrónico")])]),t._v(" "),a("div",{staticClass:"input-field"},[a("i",{staticClass:"material-icons prefix"},[t._v("lock")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model:value",value:t.passwordLogin,expression:"passwordLogin",arg:"value"}],staticClass:"validate",attrs:{id:"passwordLogin",type:"password",required:""},domProps:{value:t.passwordLogin},on:{input:function(e){e.target.composing||(t.passwordLogin=e.target.value)}}}),t._v(" "),a("label",{attrs:{for:"passwordLogin"}},[t._v("Contraseña")])]),t._v(" "),a("div",{staticClass:"center"},[t._v(t._s(t.responseLogin))]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col s12"},[a("div",{staticClass:"valign-wrapper right",staticStyle:{height:"80px"}},[a("div",{staticClass:"btn-flat waves-effect indigo-text",on:{click:function(e){t.mode=!t.mode}}},[a("i",{staticClass:"material-icons left"},[t._v("person_add")]),t._v("\n                      Registrate\n                    ")]),t._v(" "),t.buttonDisabled?a("loading",{staticClass:"preloader"}):t._e(),t._v(" "),a("button",{staticClass:"btn waves-effect indigo",attrs:{disabled:t.buttonDisabled}},[a("i",{staticClass:"material-icons left"},[t._v("send")]),t._v("\n                      Entrar\n                    ")])],1),t._v(" "),a("br"),t._v(" "),a("router-link",{staticClass:"btn-flat waves-effect indigo-text right",attrs:{to:"solicitar-cambio"}},[a("i",{staticClass:"material-icons left"},[t._v("lock")]),t._v("\n                    Olvidé mi contraseña\n                  ")])],1)])]):t._e(),t._v(" "),t.mode?t._e():a("form",{on:{submit:function(e){return e.preventDefault(),t.signin(e)}}},[t._m(2),t._v(" "),a("div",{staticClass:"input-field"},[a("i",{staticClass:"material-icons prefix"},[t._v("domain")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model:value",value:t.nameSignin,expression:"nameSignin",arg:"value"}],staticClass:"validate",attrs:{maxlength:"200",id:"nameSignin",type:"text",required:""},domProps:{value:t.nameSignin},on:{input:function(e){e.target.composing||(t.nameSignin=e.target.value)}}}),t._v(" "),a("label",{attrs:{for:"nameSignin"}},[t._v("Organización")])]),t._v(" "),a("div",{staticClass:"input-field"},[a("i",{staticClass:"material-icons prefix"},[t._v("email")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model:value",value:t.emailSignin,expression:"emailSignin",arg:"value"}],staticClass:"validate",attrs:{maxlength:"200",id:"emailSignin",type:"email",required:""},domProps:{value:t.emailSignin},on:{input:function(e){e.target.composing||(t.emailSignin=e.target.value)}}}),t._v(" "),a("label",{attrs:{for:"emailSignin"}},[t._v("Correo Electrónico")])]),t._v(" "),a("div",{staticClass:"input-field"},[a("i",{staticClass:"material-icons prefix"},[t._v("lock")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model:value",value:t.passwordSignin,expression:"passwordSignin",arg:"value"}],staticClass:"validate",attrs:{maxlength:"200",id:"passwordSignin",type:"password",required:""},domProps:{value:t.passwordSignin},on:{input:function(e){e.target.composing||(t.passwordSignin=e.target.value)}}}),t._v(" "),a("label",{attrs:{for:"passwordSignin"}},[t._v("Contraseña")])]),t._v(" "),a("div",{staticClass:"input-field"},[a("i",{staticClass:"material-icons prefix"},[t._v("lock")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model:value",value:t.passwordConfirmSignin,expression:"passwordConfirmSignin",arg:"value"}],staticClass:"validate",attrs:{maxlength:"200",id:"passwordConfirmSignin",type:"password",required:""},domProps:{value:t.passwordConfirmSignin},on:{input:function(e){e.target.composing||(t.passwordConfirmSignin=e.target.value)}}}),t._v(" "),a("label",{attrs:{for:"passwordConfirmSignin"}},[t._v("Confirmar contraseña")])]),t._v(" "),a("div",{staticClass:"center"},[t._v(t._s(t.responseSignin))]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col s12"},[a("div",{staticClass:"valign-wrapper right",staticStyle:{height:"80px"}},[a("div",{staticClass:"btn-flat waves-effect indigo-text",on:{click:function(e){t.mode=!t.mode}}},[a("i",{staticClass:"material-icons left"},[t._v("person")]),t._v("\n                      Ya tengo una cuenta\n                    ")]),t._v(" "),t.buttonDisabled?a("loading",{staticClass:"preloader"}):t._e(),t._v(" "),a("button",{staticClass:"btn waves-effect indigo",attrs:{disabled:t.buttonDisabled}},[a("i",{staticClass:"material-icons left"},[t._v("person_add")]),t._v("\n                      Entrar\n                    ")])],1),t._v(" "),a("br"),t._v(" "),a("router-link",{staticClass:"btn-flat waves-effect indigo-text right",attrs:{to:"solicitar-cambio"}},[a("i",{staticClass:"material-icons left"},[t._v("lock")]),t._v("\n                    Olvidé mi contraseña\n                  ")])],1)])])])])])]),t._v(" "),t._m(3)])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"center hide-on-large-only"},[e("img",{staticStyle:{width:"60%"},attrs:{src:a("7Otq")}}),this._v(" "),e("br"),this._v(" "),e("br")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"large-text"},[e("i",{staticClass:"material-icons left large-text"},[this._v("person")]),this._v("\n                Acceder\n              ")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"large-text"},[e("i",{staticClass:"material-icons left large-text"},[this._v("person_add")]),this._v("\n                Regístrate\n              ")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"s12 m6 indigo lighten-1 center valign-wrapper center ",staticStyle:{"min-height":"100vh"}},[e("div",{staticStyle:{width:"100%"}},[e("img",{staticStyle:{width:"60%"},attrs:{src:a("7Otq")}})])])}]};var h=a("VU/8")(m,p,!1,function(t){a("zLAK")},"data-v-2f731a7f",null).exports,g={name:"reestore",data:function(){return{email:"",buttonDisabled:!1,response:""}},methods:{request:function(){var t=this;this.buttonDisabled=!0,this.response="";var e={email:this.email,action:"request"};v.a.post("https://clima-laboral.human-express.com/php/session/restore.php",this.createFormData(e)).then(function(e){t.buttonDisabled=!1,e.data.status?M.toast({html:"Te hemos enviado un correo electrónico"}):M.toast({html:e.data.message}),t.response=e.data.message}).catch(function(e){t.buttonDisabled=!1,M.toast({html:"No se pudo procesar la información intentalo de nuevo más tarde"}),t.response="No se procesar la información intentalo de nuevo más tarde"})},createFormData:function(t){var e=new FormData;for(var a in t)e.append(a,t[a]);return e}},components:{loading:u}},f={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"row",staticStyle:{"min-height":"100vh",margin:"0"}},[a("div",{staticClass:"col s12 m6 indigo valign-wrapper",staticStyle:{"min-height":"100vh","box-shadow":"1px 2px 50px rgba(0,0,0,.5)"}},[a("div",{staticClass:"container"},[a("div",{staticClass:"card-panel grey lighten-4"},[t._m(0),t._v(" "),a("div",{staticClass:"container-"},[a("form",{on:{submit:function(e){return e.preventDefault(),t.request(e)}}},[t._m(1),t._v(" "),t._m(2),t._v(" "),a("div",{staticClass:"input-field"},[a("i",{staticClass:"material-icons prefix"},[t._v("email")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model:value",value:t.email,expression:"email",arg:"value"}],staticClass:"validate",attrs:{id:"email",type:"email",required:""},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}}),t._v(" "),a("label",{attrs:{for:"email"}},[t._v("Correo Electrónico")])]),t._v(" "),a("div",{staticClass:"center"},[t._v(" "+t._s(t.response)+" ")]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col s12"},[a("div",{staticClass:"valign-wrapper right",staticStyle:{height:"80px"}},[t.buttonDisabled?a("loading",{staticClass:"preloader"}):t._e(),t._v(" "),a("button",{staticClass:"btn waves-effect indigo",attrs:{disabled:t.buttonDisabled}},[a("i",{staticClass:"material-icons left"},[t._v("send")]),t._v("\n                      Solicitar cambio\n                    ")])],1),t._v(" "),a("br"),t._v(" "),a("router-link",{staticClass:"btn-flat waves-effect indigo-text right",attrs:{to:"/"}},[a("i",{staticClass:"material-icons left"},[t._v("lock")]),t._v("\n                    Conozco mi contraseña\n                  ")])],1)])])])])])]),t._v(" "),t._m(3)])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"center hide-on-large-only"},[e("img",{staticStyle:{width:"60%"},attrs:{src:a("7Otq")}}),this._v(" "),e("br"),this._v(" "),e("br")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"large-text"},[e("i",{staticClass:"material-icons left large-text"},[this._v("person")]),this._v("\n                Cambiar contraseña\n              ")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",{staticClass:" left-align hide-on-med-and-up"},[this._v("\n                Solicita un cambio de contraseña si has olvidado tu contraseña"),e("br"),e("br"),this._v("\n                Te enviaremos un mensaje a tu correo electrónico con un enlace para que puedas asignar tu nueva\n                contraseña"),e("br"),e("br"),this._v("\n                Debes ser rápido pues el enlace sólo durará activo 15 minútos."),e("br"),e("br"),this._v("\n                Después de eso deberás solicitar otro cambio en esta página si aún deseas cambiar tu contraseña\n              ")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"s12 m6 indigo lighten-1 center"},[e("div",{staticClass:"valign-wrapper",staticStyle:{"min-height":"100vh"}},[e("div",{staticStyle:{width:"100%"}},[e("img",{staticStyle:{width:"60%"},attrs:{src:a("7Otq")}}),this._v(" "),e("div",{staticClass:"container"},[e("p",{staticClass:"indigo-text text-lighten-4 left-align hide-on-small-only"},[this._v("\n              Solicita un cambio de contraseña si has olvidado tu contraseña"),e("br"),e("br"),this._v("\n              Te enviaremos un mensaje a tu correo electrónico con un enlace para que puedas asignar tu nueva\n              contraseña"),e("br"),e("br"),this._v("\n              Debes ser rápido pues el enlace sólo durará activo 15 minútos."),e("br"),e("br"),this._v("\n              Después de eso deberás solicitar otro cambio en esta página si aún deseas cambiar tu contraseña\n            ")])])])])])}]};var _=a("VU/8")(g,f,!1,function(t){a("V5EY")},"data-v-3debec23",null).exports,C=a("fZjL"),b=a.n(C),w={name:"questionnaire",data:function(){return{user:this.$route.params.user,title:this.$route.params.campainName,displayTitle:this.urlToString(this.$route.params.campain).toUpperCase(),questionnaireStatus:!1,entitie:"",area:"",turn:"",gender:"",age:"",antiquity:"",studies:"",suggestion:"",reactives:[],aspectsList:{},aspectsTotalList:{},stopSetInterval:!1,finish:!1,isCounted:!0,questionStarted:!0,thisCampain:{},userCodeStatus:!1,userCode:"",serverCode:"",calculatedAspects:{},questionnaireStarted:!1,campains:0,response:"",reactivesAnswers:[]}},methods:{send:function(){var t=this;this.response="",this.buttonDisabled=!0;var e={entitie:this.entitie,area:this.area,turn:this.turn,gender:this.gender,age:this.age,antiquity:this.antiquity,studies:this.studies,suggestion:this.suggestion.replace(/(\r\n\t|\n|\r\t)/g,""),aspects:l()(this.calculatedAspects),user:this.user,title:this.displayTitle.toLowerCase(),reactivesAnswers:l()(this.reactivesAnswers)};v.a.post("https://clima-laboral.human-express.com/php/questionnaire/create.php",this.createFormData(e)).then(function(e){console.log(e.data),e.data.status?(M.toast({html:e.data.message}),setTimeout(function(){location.href="https://google.com"},1e3)):t.response=e.data.message}).catch(function(e){t.response="No se pudo procesar la información, intentalo de nuevo más tarde",M.toast({html:"No se pudo procesar la información, intentalo de nuevo más tarde"})})},fieldParse:function(t){return t.split(",")},verifyUserCode:function(){this.userCode==this.serverCode?(this.userCodeStatus=!0,M.toast({html:"Bienvenido"})):M.toast({html:"Código de acceso incorrecto"})},get:function(){var t=this;console.clear(),v.a.get("https://clima-laboral.human-express.com/php/campains/read.php?query=*&campain="+this.displayTitle+"&user="+this.user).then(function(e){e.data.reactives.forEach(function(t){t.status=0}),e.data.reactives.reverse()[0].status=1,t.reactives=e.data.reactives.reverse(),t.reactivesLength=e.data.reactives.reverse().length+1,t.campains=e.data.campains;var a=JSON.parse(t.campains.campains);a.forEach(function(e){e.title.toLowerCase()==t.displayTitle.toLowerCase()&&(t.thisCampain=e,t.questionnaireStatus=e.status,t.serverCode=e.userCode)}),console.log(a),console.log(e.data)})},urlToString:function(t){return t.replace(/-/g," ")},answersStringToObject:function(t){var e=[];return t.replace(/(\r\n\t|\n|\r\t)/g,"").split(";").forEach(function(t){var a=(t=t.split("//"))[0],s=t[1],i=parseInt(t[2]);t[1]&&e.push({text:a,aspect:s,value:i})}),e},startQuestion:function(t,e,a){var s=this;this.questionStarted&&(this.questionStarted=!1,setTimeout(function(){s.questionStarted=!0,console.log(t),console.log(a),s.stopSetInterval=!1,s.reactives[a].status=2;var e=setInterval(function(){s.reactives[a].timer>0?s.stopSetInterval?clearInterval(e):(s.reactives[a].timer--,console.log(s.reactives[a].timer)):(s.reactives.shift(),s.reactives.length>0?(s.reactives[0].status=1,clearInterval(e)):(console.log("Haz terminado"),clearInterval(e)))},1e3)},1010))},answered:function(t,e,a){this.reactivesAnswers.push({aspect:e,value:a}),this.reactives.shift(),isNaN(this.aspectsList[e])?this.aspectsList[e]=a:this.aspectsList[e]=this.aspectsList[e]+a,console.log(this.aspectsList),this.reactives.length>0?this.reactives[0].status=1:this.finish=!0},addAspectsTotalList:function(){var t=this;this.isCounted&&(this.reactives.forEach(function(e){var a=t.answersStringToObject(e.answersList)[0].aspect;console.log(a),isNaN(t.aspectsTotalList[a])?t.aspectsTotalList[a]=1:t.aspectsTotalList[a]++}),console.log(this.aspectsTotalList),this.isCounted=!1)},calculateAspects:function(){var t=this,e={};b()(this.aspectsTotalList).forEach(function(a){e[a]=t.aspectsList[a]/t.aspectsTotalList[a],console.log(a)}),console.log(e),this.calculatedAspects=e},createFormData:function(t){var e=new FormData;for(var a in t)e.append(a,t[a]);return e}},watch:{reactives:function(t){this.stopSetInterval=!0,0==this.reactives.length&&this.calculateAspects()}},mounted:function(){this.get()},updated:function(){this.addAspectsTotalList()}},S={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{"overflow-y":"hidden !important",height:"100vh !important"}},[a("div",{staticClass:"background indigo"},[a("div",{staticClass:"container"},[a("div",{staticClass:"container"},[a("div",{staticClass:"center white-text"},[a("h4",[t._v(t._s(t.displayTitle))])]),t._v(" "),t.questionnaireStatus?a("div",[t.userCodeStatus?a("div",[t.questionnaireStarted?a("div",t._l(t.reactives,function(e,s){return a("div",[e.timer>0?a("div",[1==e.status?a("div",{staticClass:"valign-wrapper card-panel indigo lighten-1",staticStyle:{"min-height":"80vh"},attrs:{id:"cover"+e.id},on:{click:function(a){t.startQuestion(t.answersStringToObject(e.answersList)[0].aspect,e.timer,s)}}},[a("div",{staticClass:" white-text center",staticStyle:{margin:"0 auto"}},[a("i",{staticClass:"material-icons",staticStyle:{"font-size":"6rem"}},[t._v("timer")]),a("br"),t._v(" "),a("h2",{staticClass:"large-text"},[t._v("Cronómetro")]),t._v(" "),a("p",[t._v("Haz click aquí para mostrar la pregunta")]),t._v(" "),a("p",[t._v("Tendrás "),a("strong",[t._v(t._s(e.timer))]),t._v(" segundos para contestar ")])])]):2==e.status?a("div",{staticClass:"card-panel",staticStyle:{"min-height":"80vh"},attrs:{id:"question"+e.id}},[a("div",{staticClass:"medium-text"},[t._v(t._s(e.title))]),t._v(" "),a("div",{staticStyle:{margin:"5% 0"}},[a("i",{staticClass:"material-icons left"},[t._v("timer")]),t._v("\n                      La pregunta finalizará en "),a("strong",{staticClass:"indigo white-text",staticStyle:{"border-radius":"1rem",padding:"2px"},attrs:{id:"timer"+e.id}},[t._v(t._s(e.timer))]),t._v("\n                      segundos\n                    ")]),t._v(" "),t._l(t.answersStringToObject(e.answersList),function(s){return a("form",{on:{submit:function(a){a.preventDefault(),t.answered(e.id,s.aspect,s.value)}}},[a("button",{staticClass:"btn indigo waves-effect waves-light",staticStyle:{"text-align":"left !important",width:"100%","margin-bottom":"5px"}},[t._v("\n                        "+t._s(s.value)+" "+t._s(s.text)+"\n                      ")])])})],2):t._e()]):a("div",{staticClass:"card-panel",staticStyle:{"min-height":"80vh"},attrs:{id:"question"+e.id}},[1==e.status?a("div",{attrs:{id:"cover"+e.id}},[a("div",{staticClass:"medium-text"},[t._v(t._s(e.title))]),t._v(" "),a("br"),t._v(" "),t._l(t.answersStringToObject(e.answersList),function(s){return a("form",{on:{submit:function(a){a.preventDefault(),t.answered(e.id,s.aspect,s.value)}}},[a("button",{staticClass:"btn indigo waves-effect waves-light",staticStyle:{"text-align":"left !important",width:"100%","margin-bottom":"5px"}},[t._v("\n                        "+t._s(s.value)+" "+t._s(s.text)+"\n                      ")])])})],2):t._e()])])})):a("form",{staticClass:"card-panel",staticStyle:{"min-height":"80vh"},on:{submit:function(e){e.preventDefault(),t.questionnaireStarted=!t.questionnaireStarted}}},[t._m(3),t._v(" "),a("label",[t._v("Selecciona una entidad")]),t._v(" "),a("select",{directives:[{name:"model",rawName:"v-model:value",value:t.entitie,expression:"entitie",arg:"value"}],staticClass:"browser-default",attrs:{required:""},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.entitie=e.target.multiple?a:a[0]}}},[a("option",{attrs:{value:"",disabled:"",selected:""}},[t._v("Entidad")]),t._v(" "),t._l(t.fieldParse(t.thisCampain.entities),function(e){return a("option",{domProps:{value:e}},[t._v(t._s(e))])})],2),t._v(" "),a("label",[t._v("Selecciona un Area / Departamento")]),t._v(" "),a("select",{directives:[{name:"model",rawName:"v-model:value",value:t.area,expression:"area",arg:"value"}],staticClass:"browser-default",attrs:{required:""},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.area=e.target.multiple?a:a[0]}}},[a("option",{attrs:{value:"",disabled:"",selected:""}},[t._v("Area / Departamento")]),t._v(" "),t._l(t.fieldParse(t.thisCampain.areas),function(e){return a("option",{domProps:{value:e}},[t._v(t._s(e))])})],2),t._v(" "),a("label",[t._v("Selecciona tu turno")]),t._v(" "),a("select",{directives:[{name:"model",rawName:"v-model:value",value:t.turn,expression:"turn",arg:"value"}],staticClass:"browser-default",attrs:{required:""},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.turn=e.target.multiple?a:a[0]}}},[a("option",{attrs:{value:"",disabled:"",selected:""}},[t._v("Turno")]),t._v(" "),t._l(t.fieldParse(t.thisCampain.turns),function(e){return a("option",{domProps:{value:e}},[t._v(t._s(e))])})],2),t._v(" "),a("label",[t._v("Selecciona tu género")]),t._v(" "),a("select",{directives:[{name:"model",rawName:"v-model:value",value:t.gender,expression:"gender",arg:"value"}],staticClass:"browser-default",attrs:{required:""},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.gender=e.target.multiple?a:a[0]}}},[a("option",{attrs:{value:"",disabled:"",selected:""}},[t._v("Género")]),t._v(" "),t._l(t.fieldParse(t.thisCampain.gender),function(e){return a("option",{domProps:{value:e}},[t._v(t._s(e))])})],2),t._v(" "),a("label",[t._v("Selecciona tu rango de edad")]),t._v(" "),a("select",{directives:[{name:"model",rawName:"v-model:value",value:t.age,expression:"age",arg:"value"}],staticClass:"browser-default",attrs:{required:""},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.age=e.target.multiple?a:a[0]}}},[a("option",{attrs:{value:"",disabled:"",selected:""}},[t._v("Rango de edad")]),t._v(" "),t._l(t.fieldParse(t.thisCampain.age),function(e){return a("option",{domProps:{value:e}},[t._v(t._s(e))])})],2),t._v(" "),a("label",[t._v("Selecciona tu antigüedad en la empresa")]),t._v(" "),a("select",{directives:[{name:"model",rawName:"v-model:value",value:t.antiquity,expression:"antiquity",arg:"value"}],staticClass:"browser-default",attrs:{required:""},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.antiquity=e.target.multiple?a:a[0]}}},[a("option",{attrs:{value:"",disabled:"",selected:""}},[t._v("Antigüedad en la empresa")]),t._v(" "),t._l(t.fieldParse(t.thisCampain.antiquity),function(e){return a("option",{domProps:{value:e}},[t._v(t._s(e))])})],2),t._v(" "),a("label",[t._v("Selecciona tu máximo grado de estudios concluidos")]),t._v(" "),a("select",{directives:[{name:"model",rawName:"v-model:value",value:t.studies,expression:"studies",arg:"value"}],staticClass:"browser-default",attrs:{required:""},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.studies=e.target.multiple?a:a[0]}}},[a("option",{attrs:{value:"",disabled:"",selected:""}},[t._v("Estudios concluidos")]),t._v(" "),t._l(t.fieldParse(t.thisCampain.school),function(e){return a("option",{domProps:{value:e}},[t._v(t._s(e))])})],2),t._v(" "),t._m(4)])]):a("div",[a("form",{staticClass:"card-panel",on:{submit:function(e){return e.preventDefault(),t.verifyUserCode(e)}}},[t._m(0),t._v(" "),t._m(1),t._v(" "),a("div",{staticClass:"divider"}),t._v(" "),a("div",{staticClass:"input-field col s6"},[a("i",{staticClass:"material-icons prefix"},[t._v("lock")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model:value",value:t.userCode,expression:"userCode",arg:"value"}],staticClass:"validate",attrs:{id:"userCode",type:"password"},domProps:{value:t.userCode},on:{input:function(e){e.target.composing||(t.userCode=e.target.value)}}}),t._v(" "),a("label",{attrs:{for:"userCode"}},[t._v("Código de acceso")])]),t._v(" "),t._m(2)])])]):a("div",{staticClass:"card-panel center grey-text valign-wrapper",staticStyle:{"min-height":"80vh"}},[a("h4",[t._v("Cuestionario inactivo")])]),t._v(" "),t.finish?a("div",{staticClass:"card-panel"},[a("h1",{staticClass:"large-text"},[t._v("Has terminado")]),t._v(" "),a("form",{on:{submit:function(e){return e.preventDefault(),t.send(e)}}},[a("div",{staticClass:"input-field"},[a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.suggestion,expression:"suggestion"}],staticClass:"materialize-textarea",attrs:{id:"textarea1"},domProps:{value:t.suggestion},on:{input:function(e){e.target.composing||(t.suggestion=e.target.value)}}}),t._v(" "),a("label",{attrs:{for:"textarea1"}},[t._v("¿Cómo podríamos mejorar?")])]),t._v(" "),a("p",[t._v(t._s(t.response))]),t._v(" "),t._m(5)])]):t._e()])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("p",{staticClass:"left-align"},[e("b",{staticClass:"medium-text"},[this._v("Te damos la Bienvenida a la Encuesta de Clima Laboral")]),e("br"),this._v(" "),e("span",{staticClass:"normal-text"},[this._v("\n                  Toda la información que proporciones es estrictamente Confidencial y Anónima")]),e("br"),this._v(" "),e("i",[this._v(' "Con tu participación podemos hacer grandes cosas”')])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ol",[a("li",[t._v("Asegúrate de contar con el número de acceso para resolver la encuesta")]),t._v(" "),a("li",[t._v("Conexión a Internet")]),t._v(" "),a("li",[t._v("Resolver en computadora personal o laptop")]),t._v(" "),a("li",[t._v("Toma en cuenta que son 45 preguntas a contestar en un tiempo promedio de 8 minutos como mínimo")]),t._v(" "),a("li",[t._v("Lee y contesta con total naturalidad y confianza")]),t._v(" "),a("li",[t._v("Cualquier situación contactar a Recursos Humanos")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"right-align"},[e("a",{staticClass:"btn-flat waves-effect red-text",attrs:{href:"https://www.google.com/"}},[e("i",{staticClass:"material-icons left"},[this._v("close")]),this._v("\n                  Salir\n                ")]),this._v(" "),e("button",{staticClass:"btn waves-effect indigo"},[e("i",{staticClass:"material-icons left"},[this._v("send")]),this._v("\n                  Entrar\n                ")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h4",[e("i",{staticClass:"material-icons left"},[this._v("person")]),this._v("\n                Datos del participante\n              ")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"right-align"},[e("button",{staticClass:"btn waves-effect indigo"},[e("i",{staticClass:"material-icons left"},[this._v("check")]),this._v("\n                  Comenzar\n                ")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("button",{staticClass:"btn waves-effect indigo"},[e("i",{staticClass:"material-icons left"},[this._v("send")]),this._v("\n              Enviar\n            ")])}]};var x=a("VU/8")(w,S,!1,function(t){a("Di4z")},null,null).exports,y={name:"reestore",data:function(){return{code:this.$route.params.code,email:"",password:"",passwordConfirm:"",buttonDisabled:!1,response:""}},methods:{restore:function(){var t=this;this.buttonDisabled=!0,this.response="";var e={code:this.code,email:this.email,password:this.password,passwordConfirm:this.passwordConfirm,action:"restore"};v.a.post("https://clima-laboral.human-express.com/php/session/restore.php",this.createFormData(e)).then(function(e){t.buttonDisabled=!1,e.data.status,M.toast({html:e.data.message}),t.response=e.data.message}).catch(function(e){t.buttonDisabled=!1,M.toast({html:"No se procesar la información intentalo de nuevo más tarde"}),t.response="No se procesar la información intentalo de nuevo más tarde"})},createFormData:function(t){var e=new FormData;for(var a in t)e.append(a,t[a]);return e}},components:{loading:u}},D={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"row",staticStyle:{"min-height":"100vh",margin:"0"}},[a("div",{staticClass:"col s12 m6 indigo valign-wrapper",staticStyle:{"min-height":"100vh","box-shadow":"1px 2px 50px rgba(0,0,0,.5)"}},[a("div",{staticClass:"container"},[a("div",{staticClass:"card-panel grey lighten-4"},[t._m(0),t._v(" "),a("div",{staticClass:"container-"},[a("form",{on:{submit:function(e){return e.preventDefault(),t.restore(e)}}},[t._m(1),t._v(" "),a("div",{staticClass:"input-field"},[a("i",{staticClass:"material-icons prefix"},[t._v("email")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model:value",value:t.email,expression:"email",arg:"value"}],staticClass:"validate",attrs:{id:"email",type:"email",required:""},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}}),t._v(" "),a("label",{attrs:{for:"email"}},[t._v("Correo Electrónico")])]),t._v(" "),a("div",{staticClass:"input-field"},[a("i",{staticClass:"material-icons prefix"},[t._v("email")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model:value",value:t.password,expression:"password",arg:"value"}],staticClass:"validate",attrs:{id:"password",type:"password",required:""},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}}),t._v(" "),a("label",{attrs:{for:"password"}},[t._v("Contraseña")])]),t._v(" "),a("div",{staticClass:"input-field"},[a("i",{staticClass:"material-icons prefix"},[t._v("password")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model:value",value:t.passwordConfirm,expression:"passwordConfirm",arg:"value"}],staticClass:"validate",attrs:{id:"passwordConfirm",type:"password",required:""},domProps:{value:t.passwordConfirm},on:{input:function(e){e.target.composing||(t.passwordConfirm=e.target.value)}}}),t._v(" "),a("label",{attrs:{for:"passwordConfirm"}},[t._v("Confirmar contraseña")])]),t._v(" "),a("div",{staticClass:"center"},[t._v(" "+t._s(t.response)+" ")]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col s12"},[a("div",{staticClass:"valign-wrapper right",staticStyle:{height:"80px"}},[t.buttonDisabled?a("loading",{staticClass:"preloader"}):t._e(),t._v(" "),a("button",{staticClass:"btn waves-effect indigo",attrs:{disabled:t.buttonDisabled}},[a("i",{staticClass:"material-icons left"},[t._v("send")]),t._v("\n                      Cambiar contraseña\n                    ")])],1),t._v(" "),a("br"),t._v(" "),a("router-link",{staticClass:"btn-flat waves-effect indigo-text right",attrs:{to:"/"}},[a("i",{staticClass:"material-icons left"},[t._v("lock")]),t._v("\n                    Conozco mi contraseña\n                  ")])],1)])])])])])]),t._v(" "),t._m(2)])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"center hide-on-large-only"},[e("img",{staticStyle:{width:"60%"},attrs:{src:a("7Otq")}}),this._v(" "),e("br"),this._v(" "),e("br")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"large-text"},[e("i",{staticClass:"material-icons left large-text"},[this._v("person")]),this._v("\n                Cambiar contraseña\n              ")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"s12 m6 indigo lighten-1 center"},[e("div",{staticClass:"valign-wrapper",staticStyle:{"min-height":"100vh"}},[e("div",{staticStyle:{width:"100%"}},[e("img",{staticStyle:{width:"60%"},attrs:{src:a("7Otq")}})])])])}]};var q=a("VU/8")(y,D,!1,function(t){a("u23w")},"data-v-24b148df",null).exports;s.a.use(r.a);var L=new r.a({routes:[{path:"/",name:"session",component:h},{path:"/solicitar-cambio",name:"restore",component:_},{path:"/reestablecer/:code",name:"restorePassword",component:q},{path:"/cuestionario/:user/:campain",name:"questionnaire",component:x}]});s.a.config.productionTip=!1,new s.a({el:"#app",router:L,components:{App:n},template:"<App/>"})},V5EY:function(t,e){},u23w:function(t,e){},yWe1:function(t,e){},zLAK:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.d024453fcd7ce9f66fff.js.map
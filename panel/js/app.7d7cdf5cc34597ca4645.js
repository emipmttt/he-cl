webpackJsonp([1],{"2F17":function(t,e){},"7Otq":function(t,e,a){t.exports=a.p+"panel/img/logo.de0ec56.png"},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("7+uW"),i={name:"App",data:function(){return{user:JSON.parse(localStorage.sessionData)}},methods:{logout:function(){axios.post("https://clima-laboral.human-express.com/php/session/logout.php").then(function(t){localStorage.clear(),location.href="/"}).catch(function(t){M.toast({html:"No se pudo cerrar sesión: "+t})})}},mounted:function(){var t=document.querySelectorAll(".sidenav");M.Sidenav.init(t,{})}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[t._m(0),t._v(" "),a("ul",{staticClass:"sidenav sidenav-fixed",attrs:{id:"slide-out"}},[a("li",[a("div",{staticClass:"user-view"},[t._m(1),t._v(" "),a("br"),t._v(" "),a("a",[a("span",{staticClass:"white-text name"},[t._v(t._s(t.user.name))])]),t._v(" "),a("a",[a("span",{staticClass:"white-text email"},[t._v(t._s(t.user.email))])])])]),t._v(" "),a("li",[a("router-link",{attrs:{to:"/"}},[a("i",{staticClass:" material-icons"},[t._v("assignment_turned_in")]),t._v(" Diagnósticos\n        ")])],1),t._v(" "),t._m(2),t._v(" "),t._m(3),t._v(" "),a("li",{on:{click:t.logout}},[t._m(4)])]),t._v(" "),a("main",[a("router-view")],1)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("header",{staticClass:"navbar-fixed hide-on-large-only"},[e("nav",[e("div",{staticClass:"nav-wrapper grey lighten-4"},[e("a",{staticClass:"brand-logo navbar-logo"},[e("img",{staticClass:"responsive-img",attrs:{src:a("7Otq"),alt:"human express"}})]),this._v(" "),e("a",{staticClass:"sidenav-trigger indigo-text",attrs:{"data-target":"slide-out"}},[e("i",{staticClass:"material-icons"},[this._v("menu")])])])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"background indigo lighten-1 center"},[e("img",{staticStyle:{width:"70%",margin:"5px 0"},attrs:{src:a("7Otq")}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("li",[e("a",[e("i",{staticClass:"material-icons"},[this._v("phone")]),this._v("Ayuda\n        ")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("li",[e("div",{staticClass:"divider"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("a",[e("i",{staticClass:"material-icons"},[this._v("exit_to_app")]),this._v("Salir\n        ")])}]};var r=a("VU/8")(i,n,!1,function(t){a("2F17")},null,null).exports,o=a("/ocq"),c=a("mvHQ"),l=a.n(c),u=a("mtWM"),v=a.n(u),d={name:"campain-item",props:{campain:Object},data:function(){return{user:JSON.parse(localStorage.sessionData),title:this.campain.title,numberOfParticipants:this.campain.numberOfParticipants,participants:0,status:this.campain.status,userCode:this.campain.userCode,displayStatus:"",iconStatus:"",textualStatus:"",viewResults:!1,results:[{icon:"public",text:"Global",category:"entidad"},{icon:"place",text:"Entidad",category:"entidad"},{icon:"assignment",text:"Area / Departamento",category:"area"},{icon:"alarm",text:"Turno",category:"turno"},{icon:"wc",text:"Genero",category:"genero"},{icon:"date_range",text:"Rango de edad",category:"edad"},{icon:"school",text:"Estudios concluídos",category:"estudios"},{icon:"calendar_today",text:"Antigüedad en la empresa",category:"antiguedad"}]}},methods:{get:function(){var t=this;v.a.get("https://clima-laboral.human-express.com/php/questionnaire/read.php?query=*&user="+this.user.id+"&campain="+this.title).then(function(e){console.log(e.data),e.data.status?t.participants=e.data.participants:t.participants=0}).catch(function(t){M.toast({html:"No se procesar la información intentalo de nuevo más tarde "+t})})},verifyStatus:function(){this.campain.status?(this.displayStatus="Activo",this.iconStatus="toggle_on",this.textualStatus="Mientras el diagnóstico esté activo, los participantes podrán resolver cuestionarios"):(this.displayStatus="Inactivo",this.iconStatus="toggle_off",this.textualStatus="Mientras el diagnóstico esté inactivo, los participantes no podrán resolver cuestionarios y todos los resultados estarán disponibles")},toUrl:function(t,e){return t.replace(/ /g,"-").toLowerCase()},urlToString:function(t){return t.replace(/-/g," ")}},mounted:function(){this.verifyStatus(),this.get()}},p={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"card-panel"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col s12 m3",attrs:{title:"Diagnóstico"}},[a("i",{staticClass:"material-icons left"},[t._v("assignment_ind")]),t._v("\n        "+t._s(t.title)+"\n      ")]),t._v(" "),a("div",{staticClass:"col s12 m3",attrs:{title:t.participants+" de "+t.numberOfParticipants+" particiantes"}},[a("i",{staticClass:" material-icons left"},[t._v("people")]),t._v("\n        "+t._s(t.participants)+" / "+t._s(t.numberOfParticipants)+"\n      ")]),t._v(" "),a("div",{staticClass:"col s12 m3",attrs:{title:t.textualStatus}},[a("i",{staticClass:"material-icons left"},[t._v(t._s(t.iconStatus))]),t._v("\n        "+t._s(t.displayStatus)+"\n      ")]),t._v(" "),a("div",{staticClass:"col s12 m3",attrs:{title:"Código para usuario"}},[a("i",{staticClass:"material-icons left"},[t._v("lock")]),t._v("\n        "+t._s(t.userCode)+"\n      ")])]),t._v(" "),a("div",{staticClass:"divider"}),t._v(" "),t.status?a("div",[a("div",{staticClass:"center"},[a("h5",{staticClass:"green-text"},[t._v("Activo")]),t._v(" "),a("p",{staticClass:"grey-text text-darken-1"},[t._v(t._s(t.textualStatus))])]),t._v(" "),a("div",{staticClass:"divider"}),t._v(" "),a("br"),t._v(" "),a("div",{staticClass:"right-align"},[a("router-link",{staticClass:"btn-flat waves-effect waves-green",attrs:{to:"/monitoreo/"+t.user.id+"/"+t.toUrl(t.title)}},[a("i",{staticClass:"material-icons left"},[t._v("trending_up")]),t._v("\n          Monitoreo\n        ")]),t._v(" "),a("a",{staticClass:"btn-flat waves-effect waves-green",attrs:{href:"/#/cuestionario/"+t.user.id+"/"+t.toUrl(t.title),target:"_blank"}},[a("i",{staticClass:"material-icons left"},[t._v("person")]),t._v("\n          individual / en linea\n        ")]),t._v(" "),a("router-link",{staticClass:"btn waves-effect indigo",attrs:{to:"captura-masiva/"+t.user.id+"/"+t.toUrl(t.title)}},[a("i",{staticClass:"material-icons left"},[t._v("people")]),t._v("\n          Captura masiva\n        ")])],1)]):a("div",{staticClass:"center grey-text text-darken-1"},[a("h5",[t._v("Inactivo")]),t._v(" "),a("p",[t._v(t._s(t.textualStatus))]),t._v(" "),a("div",{staticClass:"divider"}),t._v(" "),a("div",{staticClass:"right-align"},[a("br"),t._v(" "),a("router-link",{staticClass:"btn-flat waves-effect waves-green",attrs:{to:"/monitoreo/"+t.user.id+"/"+t.toUrl(t.title)}},[a("i",{staticClass:"material-icons left"},[t._v("trending_up")]),t._v("\n          Monitoreo\n        ")]),t._v(" "),a("button",{staticClass:"btn waves-effect indigo",on:{click:function(e){t.viewResults=!t.viewResults}}},[a("i",{staticClass:"material-icons left"},[t._v("assessment")]),t._v("\n          Ver resultados\n        ")])],1)]),t._v(" "),a("br"),t._v(" "),t.viewResults?a("div",[a("div",{staticClass:"divider"}),t._v(" "),t._l(t.results,function(e,s){return a("a",{key:s,staticClass:"hoverable grey lighten-3",staticStyle:{margin:"5px","border-radius":"2rem",padding:"10px 20px",display:"inline-block"},attrs:{href:"/resultados#/"+e.category+"/"+t.user.id+"/"+t.toUrl(t.title)}},[a("i",{staticClass:"material-icons left"},[t._v(t._s(e.icon))]),t._v("\n        "+t._s(e.text)+"\n      ")])})],2):t._e()])},staticRenderFns:[]};var m=a("VU/8")(d,p,!1,function(t){a("zDsF")},null,null).exports,h={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"lds-ring"},[e("div"),this._v(" "),e("div"),this._v(" "),e("div"),this._v(" "),e("div")])}]};var f=a("VU/8")({name:"loading"},h,!1,function(t){a("yWe1")},"data-v-9f49528e",null).exports,g={name:"home",data:function(){return{user:JSON.parse(localStorage.sessionData),campainsStatus:0,campains:null,search:""}},methods:{getUserData:function(t){var e=this;v.a.post("https://clima-laboral.human-express.com/php/users/read.php?query=user&user="+this.user.id).then(function(a){console.log(a.data),a.data.status?(localStorage.sessionData=l()(a.data.userData),M.toast({html:t}),e.campains=JSON.parse(a.data.userData.campains),e.verifyCampainsStatus()):(M.toast({html:a.data.message}),e.campains=!1)}).catch(function(t){M.toast({html:"No se procesar la información intentalo de nuevo más tarde "+t})})},verifyCampainsStatus:function(){Array.isArray(this.campains)&&this.campains.length>0?(this.campainsStatus=1,console.log("sípiruli")):(this.campainsStatus=2,console.log("nopiruli",this.campains))}},components:{campainItem:m,loading:f},mounted:function(){console.log(this.campains),this.getUserData("¡Bienvenido de nuevo!")}},_={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"container"},[0==t.campainsStatus?a("div",{staticClass:"center"},[a("loading")],1):1==t.campainsStatus?a("div",t._l(t.campains,function(e,s){return a("div",{key:s},[a("campain-item",{attrs:{campain:e},on:{"update:change":t.getUserData}})],1)})):2==t.campainsStatus?a("div",{staticClass:"center"},[t._m(0)]):t._e()])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("p",{staticClass:"grey-text card-panel"},[this._v("\n          Aún no hay diagnósticos "),e("br"),this._v("\n          Contactanos para la asignación de diagnósticos\n        ")])}]};var C=a("VU/8")(g,_,!1,function(t){a("WEb4")},"data-v-21dda111",null).exports,y=a("fZjL"),b=a.n(y),x={name:"questionnaire",props:{user:String,campain:Object,title:String},data:function(){return{questionnaireStatus:this.campain.status,entitie:"",area:"",turn:"",gender:"",age:"",antiquity:"",studies:"",suggestion:"",reactives:[],aspectsList:{},aspectsTotalList:{},stopSetInterval:!1,finish:!1,isCounted:!0,questionStarted:!0,thisCampain:{},userCodeStatus:!1,userCode:"",serverCode:"",calculatedAspects:{},questionnaireStarted:!1,campains:0,response:""}},methods:{send:function(){var t=this;this.response="",this.buttonDisabled=!0;var e={entitie:this.entitie,area:this.area,turn:this.turn,gender:this.gender,age:this.age,antiquity:this.antiquity,studies:this.studies,suggestion:this.suggestion,aspects:l()(this.calculatedAspects),user:this.user,title:this.title.toLowerCase(),numberOfParticipants:this.campain.numberOfParticipants,campain:this.campain};v.a.post("https://clima-laboral.human-express.com/php/questionnaire/create.php",this.createFormData(e)).then(function(e){console.log(e.data),e.data.status?(M.toast({html:e.data.message}),setTimeout(function(){location.reload()},1e3)):t.response=e.data.message}).catch(function(e){t.response="No se pudo procesar la información, intentalo de nuevo más tarde",M.toast({html:"No se pudo procesar la información, intentalo de nuevo más tarde"})})},entitiesParse:function(t){return t.split(",")},verifyUserCode:function(){this.userCode==this.serverCode?(this.userCodeStatus=!0,M.toast({html:"Bienvenido"})):M.toast({html:"Código incorrecto"})},get:function(){var t=this;v.a.get("https://clima-laboral.human-express.com/php/campains/read.php?query=*&campain="+this.title+"&user="+this.user).then(function(e){e.data.reactives.forEach(function(t){t.status=!1}),e.data.reactives.reverse()[0].status=!0,t.reactives=e.data.reactives.reverse(),t.reactivesLength=e.data.reactives.reverse().length+1,t.campains=e.data.campains;var a=JSON.parse(t.campains.campains);a.forEach(function(e){e.title.toLowerCase()==t.title.toLowerCase()&&(t.thisCampain=e,t.questionnaireStatus=e.status,t.serverCode=e.userCode)}),console.log(a),console.log(e.data)})},urlToString:function(t){return t.replace(/-/g," ")},answersStringToObject:function(t){var e=[];return t.replace(/(\r\n\t|\n|\r\t)/g,"").split(";").forEach(function(t){var a=(t=t.split("//"))[0],s=t[1],i=parseInt(t[2]);t[1]&&e.push({text:a,aspect:s,value:i})}),e},startQuestion:function(t,e,a){var s=this;this.questionStarted&&(this.questionStarted=!1,setTimeout(function(){s.questionStarted=!0,console.log(t),console.log(a),s.stopSetInterval=!1,s.reactives[a].status=2;var e=setInterval(function(){s.reactives[a].timer>0?s.stopSetInterval?clearInterval(e):(s.reactives[a].timer--,console.log(s.reactives[a].timer)):(s.reactives.shift(),s.reactives.length>0?(s.reactives[0].status=1,clearInterval(e)):(console.log("Haz terminado"),clearInterval(e)))},1e3)},1010))},fieldParse:function(t){return t.split(",")},answered:function(t,e,a){this.reactives.shift(),isNaN(this.aspectsList[e])?this.aspectsList[e]=a:this.aspectsList[e]=this.aspectsList[e]+a,console.log(this.aspectsList),this.reactives.length>0?this.reactives[0].status=1:this.finish=!0},addAspectsTotalList:function(){var t=this;this.isCounted&&(this.reactives.forEach(function(e){var a=t.answersStringToObject(e.answersList)[0].aspect;console.log(a),isNaN(t.aspectsTotalList[a])?t.aspectsTotalList[a]=1:t.aspectsTotalList[a]++}),console.log(this.aspectsTotalList),this.isCounted=!1)},calculateAspects:function(){var t=this,e={};b()(this.aspectsTotalList).forEach(function(a){e[a]=t.aspectsList[a]/t.aspectsTotalList[a],console.log(a)}),console.log(e),this.calculatedAspects=e},createFormData:function(t){var e=new FormData;for(var a in t)e.append(a,t[a]);return e}},watch:{reactives:function(t){this.stopSetInterval=!0,0==this.reactives.length&&this.calculateAspects()}},mounted:function(){this.get()},updated:function(){this.addAspectsTotalList()}},S={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",[t.questionnaireStarted?a("div",t._l(t.reactives,function(e,s){return a("div",[e.status?a("div",{staticClass:"card-panel",attrs:{id:"question"+e.id}},[a("div",{staticClass:"row"},[a("div",{staticClass:"col s3 m2"},[a("div",{attrs:{title:e.title}},[a("i",{staticClass:"material-icons left indigo-text"},[t._v("info")]),t._v(" "),a("b",[t._v(t._s(e.id))])]),t._v(" "),a("br"),t._v(" "),a("div",{attrs:{title:"Cronómetro: "+e.timer+"segundos"}},[a("i",{staticClass:"material-icons left indigo-text"},[t._v("timer")]),t._v(" "),a("b",[t._v(t._s(e.timer)+" s")])])]),t._v(" "),a("div",{staticClass:"col s9 10"},[a("b",[t._v("Respuesta")]),a("br"),a("br"),t._v(" "),t._l(t.answersStringToObject(e.answersList),function(e){return a("form",{staticStyle:{margin:"5px",display:"inline-block"},on:{submit:function(a){a.preventDefault(),t.answered(t.reactives.id,e.aspect,e.value)}}},[a("button",{staticClass:"btn green waves-effect waves-light"},[t._v("\n                    "+t._s(e.value)+"\n                  ")])])})],2)])]):t._e()])})):a("form",{staticClass:"card-panel",staticStyle:{"min-height":"80vh"},on:{submit:function(e){e.preventDefault(),t.questionnaireStarted=!t.questionnaireStarted}}},[t._m(0),t._v(" "),a("label",[t._v("Selecciona una entidad")]),t._v(" "),a("select",{directives:[{name:"model",rawName:"v-model:value",value:t.entitie,expression:"entitie",arg:"value"}],staticClass:"browser-default",attrs:{required:""},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.entitie=e.target.multiple?a:a[0]}}},[a("option",{attrs:{value:"",disabled:"",selected:""}},[t._v("Entidad")]),t._v(" "),t._l(t.fieldParse(t.thisCampain.entities),function(e){return a("option",{domProps:{value:e}},[t._v(t._s(e))])})],2),t._v(" "),a("label",[t._v("Selecciona un Area / Departamento")]),t._v(" "),a("select",{directives:[{name:"model",rawName:"v-model:value",value:t.area,expression:"area",arg:"value"}],staticClass:"browser-default",attrs:{required:""},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.area=e.target.multiple?a:a[0]}}},[a("option",{attrs:{value:"",disabled:"",selected:""}},[t._v("Area / Departamento")]),t._v(" "),t._l(t.fieldParse(t.thisCampain.areas),function(e){return a("option",{domProps:{value:e}},[t._v(t._s(e))])})],2),t._v(" "),a("label",[t._v("Selecciona tu turno")]),t._v(" "),a("select",{directives:[{name:"model",rawName:"v-model:value",value:t.turn,expression:"turn",arg:"value"}],staticClass:"browser-default",attrs:{required:""},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.turn=e.target.multiple?a:a[0]}}},[a("option",{attrs:{value:"",disabled:"",selected:""}},[t._v("Turno")]),t._v(" "),t._l(t.fieldParse(t.thisCampain.turns),function(e){return a("option",{domProps:{value:e}},[t._v(t._s(e))])})],2),t._v(" "),a("label",[t._v("Selecciona tu genero")]),t._v(" "),a("select",{directives:[{name:"model",rawName:"v-model:value",value:t.gender,expression:"gender",arg:"value"}],staticClass:"browser-default",attrs:{required:""},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.gender=e.target.multiple?a:a[0]}}},[a("option",{attrs:{value:"",disabled:"",selected:""}},[t._v("Genero")]),t._v(" "),t._l(t.fieldParse(t.thisCampain.gender),function(e){return a("option",{domProps:{value:e}},[t._v(t._s(e))])})],2),t._v(" "),a("label",[t._v("Selecciona tu rango de edad")]),t._v(" "),a("select",{directives:[{name:"model",rawName:"v-model:value",value:t.age,expression:"age",arg:"value"}],staticClass:"browser-default",attrs:{required:""},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.age=e.target.multiple?a:a[0]}}},[a("option",{attrs:{value:"",disabled:"",selected:""}},[t._v("Rango de edad")]),t._v(" "),t._l(t.fieldParse(t.thisCampain.age),function(e){return a("option",{domProps:{value:e}},[t._v(t._s(e))])})],2),t._v(" "),a("label",[t._v("Selecciona tu antigüedad en la empresa")]),t._v(" "),a("select",{directives:[{name:"model",rawName:"v-model:value",value:t.antiquity,expression:"antiquity",arg:"value"}],staticClass:"browser-default",attrs:{required:""},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.antiquity=e.target.multiple?a:a[0]}}},[a("option",{attrs:{value:"",disabled:"",selected:""}},[t._v("Antigüedad en la empresa")]),t._v(" "),t._l(t.fieldParse(t.thisCampain.antiquity),function(e){return a("option",{domProps:{value:e}},[t._v(t._s(e))])})],2),t._v(" "),a("label",[t._v("Selecciona tu máximo grado de estudios concluídos")]),t._v(" "),a("select",{directives:[{name:"model",rawName:"v-model:value",value:t.studies,expression:"studies",arg:"value"}],staticClass:"browser-default",attrs:{required:""},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.studies=e.target.multiple?a:a[0]}}},[a("option",{attrs:{value:"",disabled:"",selected:""}},[t._v("Estudios concluídos")]),t._v(" "),t._l(t.fieldParse(t.thisCampain.school),function(e){return a("option",{domProps:{value:e}},[t._v(t._s(e))])})],2),t._v(" "),t._m(1)])]),t._v(" "),t.finish?a("div",{staticClass:"card-panel"},[a("h1",{staticClass:"large-text"},[t._v("Has terminado")]),t._v(" "),a("form",{on:{submit:function(e){return e.preventDefault(),t.send(e)}}},[a("div",{staticClass:"input-field"},[a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.suggestion,expression:"suggestion"}],staticClass:"materialize-textarea",attrs:{id:"textarea1"},domProps:{value:t.suggestion},on:{input:function(e){e.target.composing||(t.suggestion=e.target.value)}}}),t._v(" "),a("label",{attrs:{for:"textarea1"}},[t._v("¿Cómo podríamos mejorar?")])]),t._v(" "),a("p",[t._v(t._s(t.response))]),t._v(" "),t._m(2)])]):t._e()])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("h4",[e("i",{staticClass:"material-icons left"},[this._v("person")]),this._v("\n          Datos del participante\n        ")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"right-align"},[e("button",{staticClass:"btn waves-effect indigo"},[e("i",{staticClass:"material-icons left"},[this._v("check")]),this._v("\n            Comenzar\n          ")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("button",{staticClass:"btn waves-effect indigo"},[e("i",{staticClass:"material-icons left"},[this._v("send")]),this._v("\n          Enviar\n        ")])}]};var w={name:"masiveCapture",data:function(){return{user:this.$route.params.user,displayTitle:this.urlToString(this.$route.params.campain).toUpperCase(),reactives:[],campains:[],thisCampain:{}}},methods:{get:function(){var t=this;v.a.get("https://clima-laboral.human-express.com/php/campains/read.php?query=*&campain="+this.displayTitle+"&user="+this.user).then(function(e){e.data.reactives.forEach(function(t){t.status=0}),e.data.reactives.reverse()[0].status=1,t.reactives=e.data.reactives.reverse(),t.reactivesLength=e.data.reactives.reverse().length+1,t.campains=e.data.campains;var a=JSON.parse(t.campains.campains);a.forEach(function(e){e.title.toLowerCase()==t.displayTitle.toLowerCase()&&(t.thisCampain=e)}),console.log(a),console.log(e.data)})},verifyCampain:function(){var t=this;v.a.get("https://clima-laboral.human-express.com/php/questionnaire/read.php?query=verify&campain="+this.displayTitle+"&user="+this.user+"&numberOfParticipants="+this.thisCampain.numberOfParticipants).then(function(e){console.log("https://clima-laboral.human-express.com/php/questionnaire/read.php?query=verify&campain="+t.displayTitle+"&user="+t.user+"&numberOfParticipants="+t.thisCampain.numberOfParticipants),t.thisCampain.status=e.data.status})},urlToString:function(t){return t.replace(/-/g," ")},answersStringToObject:function(t){var e=[];return t.replace(/(\r\n\t|\n|\r\t)/g,"").split(";").forEach(function(t){var a=(t=t.split("//"))[0],s=t[1],i=parseInt(t[2]);t[1]&&e.push({text:a,aspect:s,value:i})}),e},createFormData:function(t){var e=new FormData;for(var a in t)e.append(a,t[a]);return e}},mounted:function(){this.get()},updated:function(){this.verifyCampain(),console.log(this.thisCampain.status)},components:{questionnaire:a("VU/8")(x,S,!1,function(t){a("zJbJ")},null,null).exports}},q={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("h1",{staticClass:"large-text"},[a("i",{staticClass:" material-icons"},[t._v("assignment_turned_in")]),t._v("\n      "+t._s(t.displayTitle)+" | "),a("span",{staticClass:"green-text"},[t._v("CAPTURA MASIVA")])]),t._v(" "),a("div",[t.thisCampain.status?a("div",[a("questionnaire",{attrs:{campain:t.thisCampain,title:t.displayTitle,user:t.user}})],1):a("div",{staticClass:"center white grey-text valign-wrapper card-panel",staticStyle:{"min-height":"80vh"}},[a("h4",[t._v("Cuestionario inactivo")])])])])},staticRenderFns:[]};var E=a("VU/8")(w,q,!1,function(t){a("gZVk")},"data-v-567445f2",null).exports,A={name:"Monitoring",data:function(){return{displayTitle:this.urlToString(this.$route.params.campain).toUpperCase(),user:this.$route.params.user,questionnaires:"loading",monitoringArray:[],totalQuestionnaires:0,monitoringByArea:[]}},methods:{getMonitoringData:function(){var t=this;v.a.get("http://clima-laboral.human-express.com/php/monitoring/monitoring.php?user="+this.user+"&campain="+this.displayTitle.toLowerCase()).then(function(e){e.data.status?(t.questionnaires=e.data.questionnaires,t.monitoringChartByEntitie(),t.createObjChartByArea(),t.monitoringChartByArea()):(console.log(e.data),t.questionnaires=!1)}).catch(function(e){t.questionnaires=!1})},createObjChartByArea:function(){var t=this,e=[],a=[];this.questionnaires.forEach(function(t){e.push(t.entitie),a.push(t.area)});var s=function(t,e,a){return a.indexOf(t)===e};e=e.filter(s),a=a.filter(s),e.forEach(function(e){var a=[],i=[];t.questionnaires.forEach(function(t){t.entitie==e&&(a.push(t.area),a=a.filter(s))}),a.forEach(function(a){var s=[];t.questionnaires.forEach(function(t){t.area==a&&t.entitie==e&&s.push(t)});var n=[];s.forEach(function(t){n.push(t)}),i.push({area:a,questionnaires:n.length})}),t.monitoringByArea.push({entitie:e,questionnaires:i})})},monitoringChartByEntitie:function(){var t=this;setTimeout(function(){var e=[],a=[];t.questionnaires.forEach(function(t){e.push(t.entitie),a.push(t.area)});var s=function(t,e,a){return a.indexOf(t)===e};e=e.filter(s),a=a.filter(s),e.forEach(function(e){var a={};t.questionnaires.filter(function(t){if(t.entitie==e)return t}).forEach(function(e){isNaN(a[e.entitie])?a[e.entitie]=1:a[e.entitie]++,t.totalQuestionnaires++}),t.monitoringArray.push({entitie:e,areas:a})});var i=[];t.monitoringArray.forEach(function(e){i.push(e.areas[b()(e.areas)]/t.totalQuestionnaires*100)});var n=document.getElementById("monitoringChartByEntitie").getContext("2d");new Chart(n,{type:"horizontalBar",data:{labels:e,datasets:[{label:"Monitoreo",backgroundColor:"#4caf50",data:i}]},options:{scales:{xAxes:[{ticks:{beginAtZero:!0,max:100}}]}}})},100)},monitoringChartByArea:function(){var t=this;setTimeout(function(){var e=[];t.monitoringByArea.forEach(function(t){var a=[];t.questionnaires.forEach(function(t){a.push(t)}),e.push({entitie:t.entitie,questionnaires:a})}),e.forEach(function(t,e){console.log(t,e);var a=[],s=[],i=0;t.questionnaires.forEach(function(t){s.push(t.questionnaires),i+=t.questionnaires}),t.questionnaires.forEach(function(t){a.push(t.area+": "+t.questionnaires)}),console.log(a);var n=document.getElementById("monitoringChartByArea"+e).getContext("2d");new Chart(n,{type:"horizontalBar",data:{labels:a,datasets:[{label:t.entitie,backgroundColor:"#5c6bc0",data:s}]},options:{scales:{xAxes:[{ticks:{beginAtZero:!0,max:i}}]}}})})},100)},urlToString:function(t){return t.replace(/-/g," ")}},mounted:function(){this.getMonitoringData()},components:{loading:f}},T={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("h1",{staticClass:"giant-text"},[t._v("Monitoreo | "+t._s(t.displayTitle))]),t._v(" "),"loading"==t.questionnaires?a("div",{staticClass:"center"},[a("loading")],1):0!=t.questionnaires?a("div",[a("canvas",{attrs:{id:"monitoringChartByEntitie"}}),t._v(" "),a("h2",{staticClass:"large-text"},[t._v("Monitoreo por area")]),t._v(" "),t._l(t.monitoringByArea,function(t,e){return a("div",[a("h3",{staticClass:"medium-text"},[a("canvas",{attrs:{id:"monitoringChartByArea"+e}})])])})],2):a("div",{staticClass:"card-panel"},[a("p",[t._v("Nadie ha participado aún en el diagnóstico")])])])},staticRenderFns:[]},O=a("VU/8")(A,T,!1,null,null,null).exports;s.a.use(o.a);var P=new o.a({routes:[{path:"/captura-masiva/:user/:campain",name:"masiveCapture",component:E},{path:"/monitoreo/:user/:campain",name:"Monitoring",component:O},{path:"/",name:"home",component:C}]});s.a.config.productionTip=!1,new s.a({el:"#app",router:P,components:{App:r},template:"<App/>"})},WEb4:function(t,e){},gZVk:function(t,e){},yWe1:function(t,e){},zDsF:function(t,e){},zJbJ:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.7d7cdf5cc34597ca4645.js.map
import Vue from 'vue';
import VueSocketio from 'vue-socket.io';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import App from 'viz.vue';

var socketio = require('socket.io-client/dist/socket.io.js')

Vue.use(ElementUI);
Vue.use(VueSocketio, socketio('http://'.concat(location.hostname, ':', location.port), {
  rememberTransport: false,
  transports: ['websocket']
}));

var reload = false;

new Vue({
  el: '#app',
  render: h => h(App),
  sockets:{
    connect: function() {
      if(reload)
      {
        location.reload();
      }
      reload = true;
    }
  }
})

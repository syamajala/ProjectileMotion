import Vue from 'vue'
var io = require('../node_modules/socket.io-client/dist/socket.io.min.js');

var bus = new Vue();
export default bus

var socket = io.connect('http://'.concat(location.hostname, ':', location.port), {
    remeberTransport: false,
    transports: ['websocket']
});

var reload = false;

socket.on('connect', function() {
    if(reload)
    {
        location.reload()
    }

    reload = true;
    socket.emit('loadCesiumData');
});

socket.on('loadCesiumData', function(data) {
    data = JSON.parse(data);
    bus.$emit('loadCesiumData', data);
});

// bus.$on('loadCesiumData', function() {
//     socket.emit('loadCesiumData');
// });

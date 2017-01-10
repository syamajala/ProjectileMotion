<template>
    <div id="cesium">
    <div id="cesiumContainer"></div>
    <div id="toolbaar"></div>
    </div>
</template>

<script>
require('../node_modules/cesium/Build/Cesium/Cesium.js');
require('../node_modules/cesium/Build/Cesium/Widgets/widgets.css');
require('../node_modules/socket.io-client/dist/socket.io.min.js');
require('../node_modules/dat.gui/build/dat.gui.min.js');

export default {
    mounted()
    {
        window.CESIUM_BASE_URL = './static/js/Cesium'
        var Cesium = window.Cesium;

        var viewer = new Cesium.Viewer('cesiumContainer', {
            fullscreenButton: false,
            geocoder: false,
            baseLayerPicker: false,
            imageryProvider : Cesium.createTileMapServiceImageryProvider({
                url : '/images/NaturalEarthII',
                maximumLevel: 5,
                credit : 'Imagery courtesy Natual Earth'}),
        });

        viewer.clock.shouldAnimate = false;
        var scene = viewer.scene;

        scene.skyBox = new Cesium.SkyBox({
            sources : {
                positiveX : '/images/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_px.jpg',
                negativeX : '/images/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_mx.jpg',
                positiveY : '/images/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_py.jpg',
                negativeY : '/images/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_my.jpg',
                positiveZ : '/images/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_pz.jpg',
                negativeZ : '/images/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_mz.jpg',
            }
        });

        scene.globe.enableLighting = true;

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
            socket.emit('loadMessageData', window.location.pathname);
        })

        viewer.screenshot = function() {
            this.render();
            var data = this.canvas.toDataURL('image/jpeg', 1);
            window.open(data);
        }

        var gui = new dat.GUI({ autoPlace: false });
        gui.add(viewer, 'screenshot').name("Screenshot");

        socket.on('loadCesiumData', function(data) {

            data = JSON.parse(data);

            viewer.dataSources.add(Cesium.CzmlDataSource.load(data)).then(function(ds) {

                var entities = ds['entities']['values']
                var ec = new Cesium.EntityCollection(ds)
                for (var i = 0; i < entities.length; i++)
                {
                    var entity = entities[i];
                    if(entity['id'].indexOf('point') == 0)
                    {
                        ec.add(entity)
                    }
                    else if(entity['id'].indexOf('path') == 0)
                    {
                        gui.add(entity, 'show').name(entity['name'])
                    }
                }
                gui.add(ec, 'show').name("Points");
                gui.close();
                var toolbar = document.getElementById('toolbar');
                toolbar.appendChild(gui.domElement);

                viewer.zoomTo(ds);
            });

            viewer.clock.shouldAnimate = true;
        })

        socket.on('loadMessageData', function(mdata) {

            // mdata = JSON.parse(mdata)

            // var rStack = [];

            // function reverseMsg(msg) {
            //     var oFrom = msg.from;
            //     msg.from = msg.to;
            //     msg.to = oFrom;
            //     return msg;
            // };

            // var clock = viewer.clock;
            // clock.onTick.addEventListener(function() {
            //     var time = Cesium.JulianDate.secondsDifference(clock.currentTime, clock.startTime);

            //     if (clock.multiplier > 0) {

            //         if (mdata.length > 0 && time >= mdata[0]["time"])
            //         {
            //             var msg = mdata.shift();
            //             sendMessage(svg, graph, [msg], clock.multiplier);
            //             rStack.push(reverseMsg(msg));
            //         }
            //     }
            //     else if (clock.multiplier < 0)
            //     {

            //         if (rStack.length > 0 && time <= rStack[rStack.length-1]["time"])
            //         {
            //             var msg = rStack.pop();
            //             sendMessage(svg, graph, [msg], Math.abs(clock.multiplier));
            //             mdata.unshift(reverseMsg(msg));
            //         }
            //     }
            // })
            socket.emit('loadCesiumData');
        });

    }
}
</script>

<style>
#cesiumContainer {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
}

#toolbar {
    position: absolute;
    top: 5px;
    left: 5px;
    opacity: 0.6;
}

</style>

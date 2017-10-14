
<template>
    <div id="cesium">
    <div id="cesiumContainer"></div>
    <div id="toolbar"></div>
    </div>
</template>

<script>
require('cesium/Build/Cesium/Cesium.js');
require('cesium/Build/Cesium/Widgets/widgets.css');

export default {

    mounted()
    {
        const dat = require('dat.gui/build/dat.gui.min.js');

        window.CESIUM_BASE_URL = './js/Cesium'
        const Cesium = window.Cesium;

        const viewer = new Cesium.Viewer('cesiumContainer', {
            fullscreenButton: false,
            geocoder: false,
            baseLayerPicker: false,
            imageryProvider : Cesium.createTileMapServiceImageryProvider({
                url : '/images/NaturalEarthII',
                maximumLevel: 5,
                credit : 'Imagery courtesy Natual Earth'}),
        });

        viewer.clock.shouldAnimate = false;
        const scene = viewer.scene;

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

        viewer.screenshot = function() {
            this.render();
            const data = this.canvas.toDataURL('image/jpeg', 1);
            window.open(data);
        }
        var capturer = new CCapture( { format: 'webm', timeLimit: 5, autoSaveTime: 6 });

        viewer.record = function() {
            scene.postRender.addEventListener((scene, time) => {
                capturer.capture(this.canvas);
            });
            capturer.start();

            viewer.clock.multiplier = 2;
            viewer.clock.shouldAnimate = true;
            var stop = true;
            viewer.clock.onTick.addEventListener((time) => {
                if (!viewer.clock.shouldAnimate && stop)
                {
                    stop = false;
                    capturer.stop();
                    capturer.save();
                }
            });
        };

        const gui = new dat.GUI({ autoPlace: false, closeOnTop: true });
        gui.add(viewer, 'record').name("Record");
        gui.add(viewer, 'screenshot').name("Screenshot");

        this.$options.sockets.loadCesiumData = (data) => {
            viewer.dataSources.add(Cesium.CzmlDataSource.load(JSON.parse(data))).then(function(ds) {

                const entities = ds['entities']['values']
                const ec = new Cesium.EntityCollection(ds)

                for (let i = 0; i < entities.length; i++)
                {
                    const entity = entities[i];
                    if(entity['id'].indexOf('point') == 0)
                    {
                        ec.add(entity)
                    }
                    else if(entity['id'].indexOf('path') == 0)
                    {
                        gui.add(entity, 'show').name(entity['name'])
                    }
                }
                ec.show = false;
                gui.add(ec, 'show').name("Points");
                gui.close();
                const toolbar = document.getElementById('toolbar');
                toolbar.appendChild(gui.domElement);

                // viewer.zoomTo(ds);
                viewer.trackedEntity = ds.entities.getById('path');
                // viewer.clock.shouldAnimate = true;
            });
        };

        this.$socket.emit('loadCesiumData');
    }
}
</script>

<style>
#cesium {
    width: 100%;
    height: 100%;
}

#cesiumContainer {
    width: 100%;
    height: 95vh;
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

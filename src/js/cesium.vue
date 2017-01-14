
<template>
    <div id="cesium">
    <div id="cesiumContainer"></div>
    <div id="toolbar"></div>
    </div>
</template>

<script>
require('../node_modules/cesium/Build/Cesium/Cesium.js');
require('../node_modules/cesium/Build/Cesium/Widgets/widgets.css');
import bus from './bus.js'

export default {

    mounted()
    {
        var dat = require('../node_modules/dat.gui/build/dat.gui.min.js');

        window.CESIUM_BASE_URL = './js/Cesium'
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

        viewer.screenshot = function() {
            this.render();
            var data = this.canvas.toDataURL('image/jpeg', 1);
            window.open(data);
        }

        var gui = new dat.GUI({ autoPlace: false });
        gui.add(viewer, 'screenshot').name("Screenshot");

        bus.$on('loadCesiumData', function(data) {

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
    }
}
</script>

<style>
#cesiumContainer {
    width: 100%;
    height: 54em;
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

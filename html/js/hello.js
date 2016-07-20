var viewer = new Cesium.Viewer('cesiumContainer', {
    sceneModePicker : false,
    geocoder : false,
    baseLayerPicker : false,
    imageryProvider : Cesium.createTileMapServiceImageryProvider({
        url : '/js/cesiumjs/Build/Cesium/Assets/Textures/NaturalEarthII',
        maximumLevel: 5,
        credit : 'Imagery courtesy Natual Earth'}),
});

viewer.scene.skyBox = new Cesium.SkyBox({
    sources : {
        positiveX : '/js/cesiumjs/Build/Cesium/Assets/Textures/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_px.jpg',
        negativeX : '/js/cesiumjs/Build/Cesium/Assets/Textures/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_mx.jpg',
        positiveY : '/js/cesiumjs/Build/Cesium/Assets/Textures/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_py.jpg',
        negativeY : '/js/cesiumjs/Build/Cesium/Assets/Textures/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_my.jpg',
        positiveZ : '/js/cesiumjs/Build/Cesium/Assets/Textures/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_pz.jpg',
        negativeZ : '/js/cesiumjs/Build/Cesium/Assets/Textures/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_mz.jpg',
    }
});

var socket = io.connect('http://dev.brokensymlink.net', {
    remeberTransport: false,
    transports: ['websocket']
});

socket.on('loadData', function (data) {
    viewer.dataSources.add(Cesium.CzmlDataSource.load(data));
});

var test = document.getElementById('plot')
Plotly.plot(test, [{
    x: [1, 2, 3, 4, 5],
    y: [1, 2, 4, 8, 16]}], {
        margin: { t: 0 }}
           );

// var test2 = document.getElementById('plot2')
// Plotly.plot(test2, [{
//     x: [1, 2, 3, 4, 5],
//     y: [1, 2, 4, 8, 16]}], {
//         margin: { t: 0 }}
//            );


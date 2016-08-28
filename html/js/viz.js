var viewer = new Cesium.Viewer('cesiumContainer', {
    sceneModePicker : false,
    geocoder : false,
    baseLayerPicker : false,
    imageryProvider : Cesium.createTileMapServiceImageryProvider({
        url : '/images/NaturalEarthII',
        maximumLevel: 5,
        credit : 'Imagery courtesy Natual Earth'}),
});

viewer.scene.skyBox = new Cesium.SkyBox({
    sources : {
        positiveX : '/images/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_px.jpg',
        negativeX : '/images/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_mx.jpg',
        positiveY : '/images/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_py.jpg',
        negativeY : '/images/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_my.jpg',
        positiveZ : '/images/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_pz.jpg',
        negativeZ : '/images/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_mz.jpg',
    }
});

var socket = io.connect('http://dev.brokensymlink.net', {
    remeberTransport: false,
    transports: ['websocket']
});

socket.on('loadData', function (data) {
    data = JSON.parse(data);
    viewer.dataSources.add(Cesium.CzmlDataSource.load(data)).then(function(ds) {
        viewer.trackedEntity = ds.entities.getById('path');
    });
y
});

var test = document.getElementById('plot')
Plotly.plot(test, [{
    x: [1, 2, 3, 4, 5],
    y: [1, 2, 4, 8, 16]}], {
        margin: { t: 0 }}
           );

var test2 = document.getElementById('plot2')
Plotly.plot(test2, [{
    x: [1, 2, 3, 4, 5],
    y: [1, 2, 4, 8, 16]}], {
        margin: { t: 0 }}
           );

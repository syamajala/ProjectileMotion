webpackJsonp([0],{

/***/ 116:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(123)
}
var Component = __webpack_require__(4)(
  /* script */
  __webpack_require__(117),
  /* template */
  __webpack_require__(122),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/seshu/dev/ProjectileMotion/src/js/cesium.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] cesium.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-16ab7866", Component.options)
  } else {
    hotAPI.reload("data-v-16ab7866", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 117:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bus_js__ = __webpack_require__(29);
//
//
//
//
//
//
//
//

__webpack_require__(38);
__webpack_require__(120);


/* harmony default export */ __webpack_exports__["default"] = ({
    mounted: function mounted() {
        var dat = __webpack_require__(31);

        window.CESIUM_BASE_URL = './js/Cesium';
        var Cesium = window.Cesium;

        var viewer = new Cesium.Viewer('cesiumContainer', {
            fullscreenButton: false,
            geocoder: false,
            baseLayerPicker: false,
            imageryProvider: Cesium.createTileMapServiceImageryProvider({
                url: '/images/NaturalEarthII',
                maximumLevel: 5,
                credit: 'Imagery courtesy Natual Earth' })
        });

        viewer.clock.shouldAnimate = false;
        var scene = viewer.scene;

        scene.skyBox = new Cesium.SkyBox({
            sources: {
                positiveX: '/images/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_px.jpg',
                negativeX: '/images/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_mx.jpg',
                positiveY: '/images/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_py.jpg',
                negativeY: '/images/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_my.jpg',
                positiveZ: '/images/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_pz.jpg',
                negativeZ: '/images/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_mz.jpg'
            }
        });

        scene.globe.enableLighting = true;

        viewer.screenshot = function () {
            this.render();
            var data = this.canvas.toDataURL('image/jpeg', 1);
            window.open(data);
        };

        var gui = new dat.GUI({ autoPlace: false });
        gui.add(viewer, 'screenshot').name("Screenshot");

        __WEBPACK_IMPORTED_MODULE_0_bus_js__["a" /* default */].$on('loadCesiumData', function (data) {

            viewer.dataSources.add(Cesium.CzmlDataSource.load(data)).then(function (ds) {

                var entities = ds['entities']['values'];
                var ec = new Cesium.EntityCollection(ds);
                for (var i = 0; i < entities.length; i++) {
                    var entity = entities[i];
                    if (entity['id'].indexOf('point') == 0) {
                        ec.add(entity);
                    } else if (entity['id'].indexOf('path') == 0) {
                        gui.add(entity, 'show').name(entity['name']);
                    }
                }
                gui.add(ec, 'show').name("Points");
                gui.close();
                var toolbar = document.getElementById('toolbar');
                toolbar.appendChild(gui.domElement);

                viewer.zoomTo(ds);
                viewer.clock.shouldAnimate = true;
            });
        });
    }
});

/***/ }),

/***/ 118:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, ".cesium-svgPath-svg{position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden;}.cesium-button{display:inline-block;position:relative;background:#303336;border:1px solid #444;color:#edffff;fill:#edffff;border-radius:4px;padding:5px 12px;margin:2px 3px;cursor:pointer;overflow:hidden;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;user-select:none;}.cesium-button:focus{color:#fff;fill:#fff;border-color:#ea4;outline:none;}.cesium-button:hover{color:#fff;fill:#fff;background:#48b;border-color:#aef;-webkit-box-shadow:0 0 8px #fff;box-shadow:0 0 8px #fff;}.cesium-button:active{color:#000;fill:#000;background:#adf;border-color:#fff;-webkit-box-shadow:0 0 8px #fff;box-shadow:0 0 8px #fff;}.cesium-button:disabled,.cesium-button-disabled,.cesium-button-disabled:focus,.cesium-button-disabled:hover,.cesium-button-disabled:active{background:#303336;border-color:#444;color:#646464;fill:#646464;-webkit-box-shadow:none;box-shadow:none;cursor:default;}.cesium-button option{background-color:#000;color:#eee;}.cesium-button option:disabled{color:#777;}.cesium-button input,.cesium-button label{cursor:pointer;}.cesium-button input{vertical-align:sub;}.cesium-toolbar-button{-webkit-box-sizing:border-box;box-sizing:border-box;width:32px;height:32px;border-radius:14%;padding:0;vertical-align:middle;z-index:0;}.cesium-performanceDisplay-defaultContainer{position:absolute;top:50px;right:10px;text-align:right;}.cesium-performanceDisplay{background-color:rgba(40,40,40,0.7);padding:7px;border-radius:5px;border:1px solid #444;font:bold 12px sans-serif;}.cesium-performanceDisplay-fps{color:#e52;}.cesium-performanceDisplay-ms{color:#de3;}.cesium-animation-theme{visibility:hidden;display:block;position:absolute;z-index:-100;}.cesium-animation-themeNormal{color:#222;}.cesium-animation-themeHover{color:#4488B0;}.cesium-animation-themeSelect{color:#242;}.cesium-animation-themeDisabled{color:#333;}.cesium-animation-themeKnob{color:#222;}.cesium-animation-themePointer{color:#2E2;}.cesium-animation-themeSwoosh{color:#8AC;}.cesium-animation-themeSwooshHover{color:#AEF;}.cesium-animation-svgText{fill:#edffff;font-family:Sans-Serif;font-size:15px;text-anchor:middle;}.cesium-animation-blank{fill:#000;fill-opacity:0.01;stroke:none;}.cesium-animation-rectButton{cursor:pointer;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;user-select:none;}.cesium-animation-rectButton .cesium-animation-buttonGlow{fill:#fff;stroke:none;display:none;}.cesium-animation-rectButton:hover .cesium-animation-buttonGlow{display:block;}.cesium-animation-rectButton .cesium-animation-buttonPath{fill:#edffff;}.cesium-animation-rectButton .cesium-animation-buttonMain{stroke:#444;stroke-width:1.2;}.cesium-animation-rectButton:hover .cesium-animation-buttonMain{stroke:#AEF;}.cesium-animation-rectButton:active .cesium-animation-buttonMain{fill:#ABD6FF;}.cesium-animation-buttonDisabled{-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;user-select:none;}.cesium-animation-buttonDisabled .cesium-animation-buttonMain{stroke:#555;}.cesium-animation-buttonDisabled .cesium-animation-buttonPath{fill:#818181;}.cesium-animation-buttonDisabled .cesium-animation-buttonGlow{display:none;}.cesium-animation-buttonToggled .cesium-animation-buttonGlow{display:block;fill:#2E2;}.cesium-animation-buttonToggled .cesium-animation-buttonMain{stroke:#2E2;}.cesium-animation-buttonToggled:hover .cesium-animation-buttonGlow{fill:#fff;}.cesium-animation-buttonToggled:hover .cesium-animation-buttonMain{stroke:#2E2;}.cesium-animation-shuttleRingG{cursor:pointer;}.cesium-animation-shuttleRingPointer{cursor:pointer;}.cesium-animation-shuttleRingPausePointer{cursor:pointer;}.cesium-animation-shuttleRingBack{fill:#181818;fill-opacity:0.8;stroke:#333;stroke-width:1.2;}.cesium-animation-shuttleRingSwoosh line{stroke:#8AC;stroke-width:3;stroke-opacity:0.2;stroke-linecap:round;}.cesium-animation-knobOuter{cursor:pointer;stroke:#444;stroke-width:1.2;}.cesium-animation-knobInner{cursor:pointer;}.cesium-baseLayerPicker-selected{position:absolute;top:0;left:0;width:100%;height:100%;border:none;}.cesium-baseLayerPicker-dropDown{display:block;position:absolute;-webkit-box-sizing:content-box;box-sizing:content-box;top:auto;right:0;width:320px;max-height:500px;margin-top:5px;background-color:rgba(38,38,38,0.75);border:1px solid #444;padding:6px;overflow:auto;border-radius:10px;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;user-select:none;-webkit-transform:translate(0,-20%);transform:translate(0,-20%);visibility:hidden;opacity:0;-webkit-transition:visibility 0s 0.2s,opacity 0.2s ease-in,-webkit-transform 0.2s ease-in;transition:visibility 0s 0.2s,opacity 0.2s ease-in,-webkit-transform 0.2s ease-in;transition:visibility 0s 0.2s,opacity 0.2s ease-in,transform 0.2s ease-in;transition:visibility 0s 0.2s,opacity 0.2s ease-in,transform 0.2s ease-in,-webkit-transform 0.2s ease-in;}.cesium-baseLayerPicker-dropDown-visible{-webkit-transform:translate(0,0);transform:translate(0,0);visibility:visible;opacity:1;-webkit-transition:opacity 0.2s ease-out,-webkit-transform 0.2s ease-out;transition:opacity 0.2s ease-out,-webkit-transform 0.2s ease-out;transition:opacity 0.2s ease-out,transform 0.2s ease-out;transition:opacity 0.2s ease-out,transform 0.2s ease-out,-webkit-transform 0.2s ease-out;}.cesium-baseLayerPicker-sectionTitle{display:block;font-family:sans-serif;font-size:16pt;text-align:left;color:#edffff;border-bottom:1px solid #888;margin-bottom:4px;}.cesium-baseLayerPicker-choices{display:block;position:relative;top:auto;right:0;}.cesium-baseLayerPicker-item{display:inline-block;vertical-align:top;margin:2px 5px;width:64px;text-align:center;cursor:pointer;}.cesium-baseLayerPicker-itemLabel{display:block;font-family:sans-serif;font-size:8pt;text-align:center;vertical-align:middle;color:#edffff;cursor:pointer;word-wrap:break-word;}.cesium-baseLayerPicker-item:hover .cesium-baseLayerPicker-itemLabel,.cesium-baseLayerPicker-item:focus .cesium-baseLayerPicker-itemLabel{text-decoration:underline;}.cesium-baseLayerPicker-itemIcon{display:inline-block;position:relative;width:inherit;height:auto;background-size:100% 100%;border:solid 1px #444;border-radius:9px;color:#edffff;margin:0;padding:0;cursor:pointer;-webkit-box-sizing:border-box;box-sizing:border-box;}.cesium-baseLayerPicker-item:hover .cesium-baseLayerPicker-itemIcon{border-color:#fff;-webkit-box-shadow:0 0 8px #fff,0 0 8px #fff;box-shadow:0 0 8px #fff,0 0 8px #fff;}.cesium-baseLayerPicker-selectedItem .cesium-baseLayerPicker-itemLabel{color:rgb(189,236,248);}.cesium-baseLayerPicker-selectedItem .cesium-baseLayerPicker-itemIcon{border:double 4px rgb(189,236,248);}.cesium-widget{position:relative;}.cesium-widget,.cesium-widget canvas{width:100%;height:100%;-ms-touch-action:none;touch-action:none;}.cesium-widget-credits{display:block;position:absolute;bottom:0;left:0;color:#fff;font-size:10px;text-shadow:0px 0px 2px #000000;padding-right:5px;}.cesium-widget-credits a,.cesium-widget-credits a:visited{color:#fff;}.cesium-widget-errorPanel{position:absolute;top:0;right:0;bottom:0;left:0;text-align:center;background:rgba(0,0,0,0.7);z-index:99999;}.cesium-widget-errorPanel:before{display:inline-block;vertical-align:middle;height:100%;content:\"\";}.cesium-widget-errorPanel-content{width:75%;display:inline-block;text-align:left;vertical-align:middle;border:1px solid #526F82;border-radius:7px;background-color:black;color:white;font-size:10pt;padding:1em;}.cesium-widget-errorPanel-header{font-size:120%;color:#fe4;}.cesium-widget-errorPanel-scroll{overflow:auto;font-family:monospace;white-space:pre-wrap;padding:0;margin:10px 0;}.cesium-widget-errorPanel-buttonPanel{text-align:center;}.cesium-cesiumInspector{border-radius:5px;-webkit-transition:width ease-in-out 0.25s;transition:width ease-in-out 0.25s;background:rgba(48,51,54,0.8);border:1px solid #444;color:#edffff;display:inline-block;position:relative;padding:4px 12px;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;user-select:none;overflow:hidden;}.cesium-cesiumInspector-button{text-align:center;font-size:11pt;}.cesium-cesiumInspector-visible .cesium-cesiumInspector-button{border-bottom:1px solid #aaa;padding-bottom:3px;}.cesium-cesiumInspector input:enabled,.cesium-cesiumInspector-button{cursor:pointer;}.cesium-cesiumInspector-visible{width:185px;height:auto;}.cesium-cesiumInspector-hidden{width:122px;height:17px;}.cesium-cesiumInspector-show{max-height:500px;}.cesium-cesiumInspector-hide{max-height:0;padding:0 !important;overflow:hidden;}.cesium-cesiumInspector-dropDown{margin:5px 0;font-family:sans-serif;font-size:10pt;width:185px;}.cesium-cesiumInspector-frustumStats{padding-left:10px;padding:5px;background-color:rgba(80,80,80,0.75);}.cesium-cesiumInspector-pickButton{background-color:rgba(0,0,0,0.3);border:1px solid #444;color:#edffff;border-radius:5px;padding:3px 7px;cursor:pointer;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;user-select:none;margin:0 auto;}.cesium-cesiumInspector-pickButton:focus{outline:none;}.cesium-cesiumInspector-pickButton:active,.cesium-cesiumInspector-pickButtonHighlight{color:#000;background:#adf;border-color:#fff;-webkit-box-shadow:0 0 8px #fff;box-shadow:0 0 8px #fff;}.cesium-cesiumInspector-center{text-align:center;}.cesium-cesiumInspector-sectionHeader{font-weight:bold;}.cesium-cesiumInspector-pickSection{border:1px solid #aaa;border-radius:5px;padding:3px;margin-bottom:5px;}.cesium-cesiumInspector-section{margin-bottom:10px;-webkit-transition:max-height 0.25s;transition:max-height 0.25s;}.cesium-cesiumInspector-toggleSwitch{padding:3px;cursor:pointer;}.cesium-cesiumInspector-tileText{padding-bottom:10px;border-bottom:1px solid #aaa;}.cesium-cesiumInspector-relativeText{padding-top:10px;}.cesium-button.cesium-fullscreenButton{display:block;width:100%;height:100%;margin:0;border-radius:0;}.cesium-button.cesium-vrButton{display:block;width:100%;height:100%;margin:0;border-radius:0;}.cesium-viewer-geocoderContainer .cesium-geocoder-input{border:solid 1px #444;background-color:rgba(40,40,40,0.7);color:white;display:inline-block;vertical-align:middle;width:0;height:32px;margin:0;padding:0 32px 0 0;border-radius:0;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-transition:width ease-in-out 0.25s,background-color 0.2s ease-in-out;transition:width ease-in-out 0.25s,background-color 0.2s ease-in-out;-webkit-appearance:none;}.cesium-viewer-geocoderContainer:hover .cesium-geocoder-input{border-color:#aef;-webkit-box-shadow:0 0 8px #fff;box-shadow:0 0 8px #fff;}.cesium-viewer-geocoderContainer .cesium-geocoder-input:focus{border-color:#ea4;background-color:rgba(15,15,15,0.9);-webkit-box-shadow:none;box-shadow:none;outline:none;}.cesium-viewer-geocoderContainer:hover .cesium-geocoder-input,.cesium-viewer-geocoderContainer .cesium-geocoder-input:focus,.cesium-viewer-geocoderContainer .cesium-geocoder-input-wide{padding-left:4px;width:250px;}.cesium-viewer-geocoderContainer .search-results{position:absolute;background-color:#000;color:#eee;overflow-y:auto;opacity:0.8;width:100%;}.cesium-viewer-geocoderContainer .search-results ul{list-style-type:none;margin:0;padding:0;}.cesium-viewer-geocoderContainer .search-results ul li{font-size:14px;padding:3px 10px;}.cesium-viewer-geocoderContainer .search-results ul li:hover{cursor:pointer;}.cesium-viewer-geocoderContainer .search-results ul li.active{background:#48b;}.cesium-geocoder-searchButton{background-color:#303336;display:inline-block;position:absolute;cursor:pointer;width:32px;top:1px;right:1px;height:30px;vertical-align:middle;fill:#edffff;}.cesium-geocoder-searchButton:hover{background-color:#48b;}.cesium-infoBox{display:block;position:absolute;top:50px;right:0;width:40%;max-width:480px;background:rgba(38,38,38,0.95);color:#edffff;border:1px solid #444;border-right:none;border-top-left-radius:7px;border-bottom-left-radius:7px;-webkit-box-shadow:0 0 10px 1px #000;box-shadow:0 0 10px 1px #000;-webkit-transform:translate(100%,0);transform:translate(100%,0);visibility:hidden;opacity:0;-webkit-transition:visibility 0s 0.2s,opacity 0.2s ease-in,-webkit-transform 0.2s ease-in;transition:visibility 0s 0.2s,opacity 0.2s ease-in,-webkit-transform 0.2s ease-in;transition:visibility 0s 0.2s,opacity 0.2s ease-in,transform 0.2s ease-in;transition:visibility 0s 0.2s,opacity 0.2s ease-in,transform 0.2s ease-in,-webkit-transform 0.2s ease-in;}.cesium-infoBox-visible{-webkit-transform:translate(0,0);transform:translate(0,0);visibility:visible;opacity:1;-webkit-transition:opacity 0.2s ease-out,-webkit-transform 0.2s ease-out;transition:opacity 0.2s ease-out,-webkit-transform 0.2s ease-out;transition:opacity 0.2s ease-out,transform 0.2s ease-out;transition:opacity 0.2s ease-out,transform 0.2s ease-out,-webkit-transform 0.2s ease-out;}.cesium-infoBox-title{display:block;height:20px;padding:5px 30px 5px 25px;background:rgba(84,84,84,1.0);border-top-left-radius:7px;text-align:center;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;-webkit-box-sizing:content-box;box-sizing:content-box;}.cesium-infoBox-bodyless .cesium-infoBox-title{border-bottom-left-radius:7px;}button.cesium-infoBox-camera{display:block;position:absolute;top:4px;left:4px;width:22px;height:22px;background:transparent;border-color:transparent;border-radius:3px;padding:0 5px;margin:0;}button.cesium-infoBox-close{display:block;position:absolute;top:5px;right:5px;height:20px;background:transparent;border:none;border-radius:2px;font-weight:bold;font-size:16px;padding:0 5px;margin:0;color:#edffff;}button.cesium-infoBox-close:focus{background:rgba(238,136,0,0.44);outline:none;}button.cesium-infoBox-close:hover{background:#888;color:#000;}button.cesium-infoBox-close:active{background:#a00;color:#000;}.cesium-infoBox-bodyless .cesium-infoBox-iframe{display:none;}.cesium-infoBox-iframe{border:none;width:100%;width:calc(100% - 2px);}span.cesium-sceneModePicker-wrapper{display:inline-block;position:relative;margin:0 3px;}.cesium-sceneModePicker-visible{visibility:visible;opacity:1;-webkit-transition:opacity 0.25s linear;transition:opacity 0.25s linear;}.cesium-sceneModePicker-hidden{visibility:hidden;opacity:0;-webkit-transition:visibility 0s 0.25s,opacity 0.25s linear;transition:visibility 0s 0.25s,opacity 0.25s linear;}.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-none{display:none;}.cesium-sceneModePicker-slide-svg{-webkit-transition:left 2s;transition:left 2s;top:0;left:0;}.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-dropDown-icon{-webkit-box-sizing:border-box;box-sizing:border-box;padding:0;margin:3px 0;}.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-button3D,.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-buttonColumbusView,.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-button2D{margin:0 0 3px 0;}.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-button3D .cesium-sceneModePicker-icon2D{left:100%;}.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-button3D .cesium-sceneModePicker-iconColumbusView{left:200%;}.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-buttonColumbusView .cesium-sceneModePicker-icon3D{left:-200%;}.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-buttonColumbusView .cesium-sceneModePicker-icon2D{left:-100%;}.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-button2D .cesium-sceneModePicker-icon3D{left:-100%;}.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-button2D .cesium-sceneModePicker-iconColumbusView{left:100%;}.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-selected{border-color:#2e2;-webkit-box-shadow:0 0 8px #fff,0 0 8px #fff;box-shadow:0 0 8px #fff,0 0 8px #fff;}span.cesium-projectionPicker-wrapper{display:inline-block;position:relative;margin:0 3px;}.cesium-projectionPicker-visible{visibility:visible;opacity:1;-webkit-transition:opacity 0.25s linear;transition:opacity 0.25s linear;}.cesium-projectionPicker-hidden{visibility:hidden;opacity:0;-webkit-transition:visibility 0s 0.25s,opacity 0.25s linear;transition:visibility 0s 0.25s,opacity 0.25s linear;}.cesium-projectionPicker-wrapper .cesium-projectionPicker-none{display:none;}.cesium-projectionPicker-wrapper .cesium-projectionPicker-dropDown-icon{-webkit-box-sizing:border-box;box-sizing:border-box;padding:0;margin:3px 0;}.cesium-projectionPicker-wrapper .cesium-projectionPicker-buttonPerspective,.cesium-projectionPicker-wrapper .cesium-projectionPicker-buttonOrthographic{margin:0 0 3px 0;}.cesium-projectionPicker-wrapper .cesium-projectionPicker-buttonPerspective .cesium-projectionPicker-iconOrthographic{left:100%;}.cesium-projectionPicker-wrapper .cesium-projectionPicker-buttonOrthographic .cesium-projectionPicker-iconPerspective{left:-100%;}.cesium-projectionPicker-wrapper .cesium-projectionPicker-selected{border-color:#2e2;-webkit-box-shadow:0 0 8px #fff,0 0 8px #fff;box-shadow:0 0 8px #fff,0 0 8px #fff;}.cesium-performance-watchdog-message-area{position:relative;background-color:yellow;color:black;padding:10px;}.cesium-performance-watchdog-message{margin-right:30px;}.cesium-performance-watchdog-message-dismiss{position:absolute;right:0;margin:0 10px 0 0;}.cesium-navigationHelpButton-wrapper{position:relative;display:inline-block;}.cesium-navigation-help{visibility:hidden;position:absolute;top:38px;right:2px;width:250px;border-radius:10px;-webkit-transform:scale(0.01);transform:scale(0.01);-webkit-transform-origin:234px -10px;transform-origin:234px -10px;-webkit-transition:visibility 0s 0.25s,-webkit-transform 0.25s ease-in;transition:visibility 0s 0.25s,-webkit-transform 0.25s ease-in;transition:visibility 0s 0.25s,transform 0.25s ease-in;transition:visibility 0s 0.25s,transform 0.25s ease-in,-webkit-transform 0.25s ease-in;}.cesium-navigation-help-visible{visibility:visible;-webkit-transform:scale(1);transform:scale(1);-webkit-transition:-webkit-transform 0.25s ease-out;transition:-webkit-transform 0.25s ease-out;transition:transform 0.25s ease-out;transition:transform 0.25s ease-out, -webkit-transform 0.25s ease-out;}.cesium-navigation-help-instructions{border:1px solid #444;background-color:rgba(38,38,38,0.75);padding-bottom:5px;border-radius:0 0 10px 10px;}.cesium-click-navigation-help{display:none;}.cesium-touch-navigation-help{display:none;padding-top:5px;}.cesium-click-navigation-help-visible{display:block;}.cesium-touch-navigation-help-visible{display:block;}.cesium-navigation-help-pan{color:#66ccff;font-weight:bold;}.cesium-navigation-help-zoom{color:#65fd00;font-weight:bold;}.cesium-navigation-help-rotate{color:#ffd800;font-weight:bold;}.cesium-navigation-help-tilt{color:#d800d8;font-weight:bold;}.cesium-navigation-help-details{color:#ffffff;}.cesium-navigation-button{color:#fff;background-color:transparent;border-bottom:none;border-top:1px solid #444;border-right:1px solid #444;margin:0;width:50%;cursor:pointer;}.cesium-navigation-button-icon{vertical-align:middle;padding:5px 1px;}.cesium-navigation-button:focus{outline:none;}.cesium-navigation-button-left{border-radius:10px 0 0 0;border-left:1px solid #444;}.cesium-navigation-button-right{border-radius:0 10px 0 0;border-left:none;}.cesium-navigation-button-selected{background-color:rgba(38,38,38,0.75);}.cesium-navigation-button-unselected{background-color:rgba(0,0,0,0.75);}.cesium-navigation-button-unselected:hover{background-color:rgba(76,76,76,0.75);}.cesium-selection-wrapper{position:absolute;width:160px;height:160px;pointer-events:none;visibility:hidden;opacity:0;-webkit-transition:visibility 0s 0.2s,opacity 0.2s ease-in;transition:visibility 0s 0.2s,opacity 0.2s ease-in;}.cesium-selection-wrapper-visible{visibility:visible;opacity:1;-webkit-transition:opacity 0.2s ease-out;transition:opacity 0.2s ease-out;}.cesium-selection-wrapper svg{fill:#2e2;stroke:#000;stroke-width:1.1px;}.cesium-timeline-main{position:relative;left:0;bottom:0;overflow:hidden;border:solid 1px #888;}.cesium-timeline-trackContainer{width:100%;overflow:auto;border-top:solid 1px #888;position:relative;top:0;left:0;}.cesium-timeline-tracks{position:absolute;top:0;left:0;width:100%;}.cesium-timeline-needle{position:absolute;left:0;top:1.7em;bottom:0;width:1px;background:#F00;}.cesium-timeline-bar{position:relative;left:0;top:0;overflow:hidden;cursor:pointer;width:100%;height:1.7em;background:-webkit-gradient(linear,left top, left bottom,from(rgba(116,117,119,0.8)),color-stop(11%, rgba(58,68,82,0.8)),color-stop(46%, rgba(46,50,56,0.8)),color-stop(81%, rgba(53,53,53,0.8)),to(rgba(53,53,53,0.8)));background:linear-gradient(to bottom,rgba(116,117,119,0.8) 0%,rgba(58,68,82,0.8) 11%,rgba(46,50,56,0.8) 46%,rgba(53,53,53,0.8) 81%,rgba(53,53,53,0.8) 100%);}.cesium-timeline-ruler{visibility:hidden;white-space:nowrap;font-size:80%;z-index:-200;}.cesium-timeline-highlight{position:absolute;bottom:0;left:0;background:#08F;}.cesium-timeline-ticLabel{position:absolute;top:0;left:0;white-space:nowrap;font-size:80%;color:#eee;}.cesium-timeline-ticMain{position:absolute;bottom:0;left:0;width:1px;height:50%;background:#eee;}.cesium-timeline-ticSub{position:absolute;bottom:0;left:0;width:1px;height:33%;background:#aaa;}.cesium-timeline-ticTiny{position:absolute;bottom:0;left:0;width:1px;height:25%;background:#888;}.cesium-timeline-icon16{display:block;position:absolute;width:16px;height:16px;background-image:url(" + __webpack_require__(121) + ");background-repeat:no-repeat;}.cesium-viewer{font-family:sans-serif;font-size:16px;overflow:hidden;display:block;position:relative;top:0;left:0;width:100%;height:100%;}.cesium-viewer-cesiumWidgetContainer{width:100%;height:100%;}.cesium-viewer-bottom{display:block;position:absolute;bottom:0;left:0;right:0;padding-right:5px;}.cesium-viewer .cesium-widget-credits{display:inline;position:static;bottom:auto;left:auto;padding-right:0;color:#ffffff;font-size:10px;text-shadow:0 0 2px #000000;}.cesium-viewer-timelineContainer{position:absolute;bottom:0;left:169px;right:29px;height:27px;padding:0;margin:0;overflow:hidden;font-size:14px;}.cesium-viewer-animationContainer{position:absolute;bottom:0;left:0;padding:0;width:169px;height:112px;}.cesium-viewer-fullscreenContainer{position:absolute;bottom:0;right:0;padding:0;width:29px;height:29px;overflow:hidden;}.cesium-viewer-vrContainer{position:absolute;bottom:0;right:0;padding:0;width:29px;height:29px;overflow:hidden;}.cesium-viewer-toolbar{display:block;position:absolute;top:5px;right:5px;}.cesium-viewer-cesiumInspectorContainer{display:block;position:absolute;top:50px;right:10px;}.cesium-viewer-geocoderContainer{position:relative;display:inline-block;margin:0 3px;}", ""]);

// exports


/***/ }),

/***/ 119:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(true);
// imports


// module
exports.push([module.i, "\n#cesium {\n    width: 100%;\n    height: 100%;\n}\n#cesiumContainer {\n    width: 100%;\n    height: 95vh;\n    margin: 0;\n    padding: 0;\n    overflow: hidden;\n}\n#toolbar {\n    position: absolute;\n    top: 5px;\n    left: 5px;\n    opacity: 0.6;\n}\n\n", "", {"version":3,"sources":["/home/seshu/dev/ProjectileMotion/src/js/cesium.vue?ba2fe7f6"],"names":[],"mappings":";AAyFA;IACA,YAAA;IACA,aAAA;CACA;AAEA;IACA,YAAA;IACA,aAAA;IACA,UAAA;IACA,WAAA;IACA,iBAAA;CACA;AAEA;IACA,mBAAA;IACA,SAAA;IACA,UAAA;IACA,aAAA;CACA","file":"cesium.vue","sourcesContent":["\n<template>\n    <div id=\"cesium\">\n    <div id=\"cesiumContainer\"></div>\n    <div id=\"toolbar\"></div>\n    </div>\n</template>\n\n<script>\nrequire('cesium/Build/Cesium/Cesium.js');\nrequire('cesium/Build/Cesium/Widgets/widgets.css');\nimport bus from 'bus.js'\n\nexport default {\n\n    mounted()\n    {\n        var dat = require('dat.gui/build/dat.gui.min.js');\n\n        window.CESIUM_BASE_URL = './js/Cesium'\n        var Cesium = window.Cesium;\n\n        var viewer = new Cesium.Viewer('cesiumContainer', {\n            fullscreenButton: false,\n            geocoder: false,\n            baseLayerPicker: false,\n            imageryProvider : Cesium.createTileMapServiceImageryProvider({\n                url : '/images/NaturalEarthII',\n                maximumLevel: 5,\n                credit : 'Imagery courtesy Natual Earth'}),\n        });\n\n        viewer.clock.shouldAnimate = false;\n        var scene = viewer.scene;\n\n        scene.skyBox = new Cesium.SkyBox({\n            sources : {\n                positiveX : '/images/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_px.jpg',\n                negativeX : '/images/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_mx.jpg',\n                positiveY : '/images/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_py.jpg',\n                negativeY : '/images/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_my.jpg',\n                positiveZ : '/images/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_pz.jpg',\n                negativeZ : '/images/TychoSkymapII.t3_08192x04096/TychoSkymapII.t3_08192x04096_80_mz.jpg',\n            }\n        });\n\n        scene.globe.enableLighting = true;\n\n        viewer.screenshot = function() {\n            this.render();\n            var data = this.canvas.toDataURL('image/jpeg', 1);\n            window.open(data);\n        }\n\n        var gui = new dat.GUI({ autoPlace: false });\n        gui.add(viewer, 'screenshot').name(\"Screenshot\");\n\n        bus.$on('loadCesiumData', function(data) {\n\n            viewer.dataSources.add(Cesium.CzmlDataSource.load(data)).then(function(ds) {\n\n                var entities = ds['entities']['values']\n                var ec = new Cesium.EntityCollection(ds)\n                for (var i = 0; i < entities.length; i++)\n                {\n                    var entity = entities[i];\n                    if(entity['id'].indexOf('point') == 0)\n                    {\n                        ec.add(entity)\n                    }\n                    else if(entity['id'].indexOf('path') == 0)\n                    {\n                        gui.add(entity, 'show').name(entity['name'])\n                    }\n                }\n                gui.add(ec, 'show').name(\"Points\");\n                gui.close();\n                var toolbar = document.getElementById('toolbar');\n                toolbar.appendChild(gui.domElement);\n\n                viewer.zoomTo(ds);\n                viewer.clock.shouldAnimate = true;\n            });\n        })\n    }\n}\n</script>\n\n<style>\n#cesium {\n    width: 100%;\n    height: 100%;\n}\n\n#cesiumContainer {\n    width: 100%;\n    height: 95vh;\n    margin: 0;\n    padding: 0;\n    overflow: hidden;\n}\n\n#toolbar {\n    position: absolute;\n    top: 5px;\n    left: 5px;\n    opacity: 0.6;\n}\n\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 120:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(118);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(13)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../css-loader/index.js!../../../../postcss-loader/lib/index.js!./widgets.css", function() {
			var newContent = require("!!../../../../css-loader/index.js!../../../../postcss-loader/lib/index.js!./widgets.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 121:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAQCAYAAAB3AH1ZAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sIDBITKIVzLEMAAAKNSURBVEjHxdXNSxRhHAfw7zzrqhuoWJnSkrippUVSEKsHI9BTUYdAJA/RoYMREV26rAdn6tAfUARi16hQqkOBQRgUEYFWEC3OwczMjdZd92VmdWfmeelgTjO7q7gb0VzmmZnn85vvPPPMM8B/3qTcE2PPpuTZKB1eWuUQACgXYACYwVFbCTTVeZXB/i55o4LFelcAZfStYD4vpAoPGAGo4GBcQEgSOAUMQyAezwK6iQfDPXnhS/FkHZ+/8VLMWxxqWkfH3gbMRNOYi2roavbja0zHQmoFPYf8ED4Ko4aivm9MOG/u9I8mwrafeK7a/tVrNc/bARYN5noadeq7q0342vXw9CIMU6BmW8rVP9cPBPe52uu+v3O/y9sB4gkTWs6Qsk0mj5ExXMelejvA8WafYmkmGPHanTijdtvif8rx5RiCjdWKs2Cp3jWRDl96KhrbqlBeJqBOLyLQXg0IgbkZDS0dO8EZxZfPSTA9jvDDK3mT0OmP1FXh3XwEEAKdTX5MRWLgjCK4pwH3xt/YnjgLHAv4lHTCAKMMu/wV+KZGob6PoKyMQ0+sgBpZVJZn0NterxQaVqef/DRn+/EXYds/mZx2eVeAW9d65dhCEsaKCb7K8HH0gqTevyh9GDkn0VULRiaLzJKGBu9swfdaiie5RVo9ESURN8E8BE0n7ggACJy8KzghSCzp6DmwWxkaCm24EBXr8wI8Hrkq06QBiRC0t24HALS11IBTCyJl4vb1AXmzpbVYTwoVOXN0h7L8Mwtm8bXPybIQ/5FCX3dA2cr6XowvGCA02CvztAnz9+JiZk1AMxG6fEreSoBiPNmoyNnuWiWVzAIAtISO08E6pZi/3N96AIDn4E3h3P8L/wshP+txtEs4JAAAAABJRU5ErkJggg=="

/***/ }),

/***/ 122:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "cesium"
    }
  }, [_c('div', {
    attrs: {
      "id": "cesiumContainer"
    }
  }), _vm._v(" "), _c('div', {
    attrs: {
      "id": "toolbar"
    }
  })])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-16ab7866", module.exports)
  }
}

/***/ }),

/***/ 123:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(119);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(6)("5f42789e", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/css-loader/index.js?sourceMap!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-16ab7866\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./cesium.vue", function() {
     var newContent = require("!!../node_modules/css-loader/index.js?sourceMap!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-16ab7866\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./cesium.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ })

});
//# sourceMappingURL=0.js.map
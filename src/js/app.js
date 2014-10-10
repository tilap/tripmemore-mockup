/* global L, $, document, ejs */

'use strict';

require('./misc/console-fix');

// Avoid touch delay on mobile devices
// @see https://github.com/ftlabs/fastclick
var attachFastClick = require('../../vendor/fastclick/lib/fastclick.js');
attachFastClick(document.body);

// Leaflet map

// var tileLayer = 'http://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png';
// var tileAttributions = '&copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>';
// var tileLayer = 'http://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}';
// var tileAttributions = 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC';
// var tileLayer = 'http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png';
// var tileAttributions = '&copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>';
var tileLayer = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}';
var tileAttributions = 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012';

L.Icon.Default.imagePath = '/assets/leaflet';

var map = new L.map('map', {
    zoomControl:false,
    center: [48.8587724, 2.346735],
    zoom: 3,
    maxBounds : [
        [90, -100000000],
        [-90, 100000000]
    ],
    attributionControl: false
});

new L.Control.Zoom({ 
    position: 'bottomright' 
}).addTo(map);

new L.control.attribution({
    position: 'bottomleft',
    attribution: tileAttributions
}).addAttribution(tileAttributions).addTo(map);

new L.control.scale({
    imperial: true,
    metric: true,
    position: 'bottomleft'
}).addTo(map);

new L.tileLayer(tileLayer, {
    minZoom: 2,
    maxZoom: 18,
    reuseTiles: false,
    unloadInvisibleTiles: false
}).addTo(map);

// Tooltips
$('*[data-tooltip]').tooltipster({
   animation: 'grow',
   delay: 250,
   theme: 'tooltipster-tripmemore',
   touchDevices: false,
   trigger: 'hover'
});


var data = require('./mockup/pins');

// Ejs
var pinTemplate = document.getElementById('template-pin').innerHTML;

data.forEach(function(pin) {
    var html = ejs.render(pinTemplate, pin);
    $('.pins-wrapper').append(html);
    L.marker([pin.place.ll, pin.place.lg]).addTo(map);
});
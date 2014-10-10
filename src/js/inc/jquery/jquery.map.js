/* global $, L */

'use strict';

module.exports =  {
    el: null,
    $el: null,

    _map: null,
    options: {
        eventDispatcher: null
    },
    init: function(options, element) {
        this.options = $.extend({},this.options,options);

        this.el  = element;
        this.$el = $(element);

        this._init();
        return this;
    },

    _init: function() {
        this._eventSubscribe();
        this._initMap();
    },

    _eventSubscribe: function() {
        var me = this;
        this.options.eventDispatcher.subscribe('listUpdated', function(itemList) {
            me.uiFillList(itemList);
        });
    },

    _initMap: function() {
        // Leaflet map -----------------------------------------------------------------
        var tileLayer = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}';
        var tileAttributions = 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012';

        L.Icon.Default.imagePath = '/assets/leaflet';

        this._map = new L.map('map', {
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
        }).addTo(this._map);

        new L.control.attribution({
            position: 'bottomleft',
            attribution: tileAttributions
        }).addAttribution(tileAttributions).addTo(this._map);

        new L.control.scale({
            imperial: true,
            metric: true,
            position: 'bottomleft'
        }).addTo(this._map);

        new L.tileLayer(tileLayer, {
            minZoom: 2,
            maxZoom: 18,
            reuseTiles: false,
            unloadInvisibleTiles: false
        }).addTo(this._map);

    },
    
    _addPin: function(pin) {
        L.marker([pin.place.ll, pin.place.lg]).addTo(this._map);
    },
    
    uiFillList: function(itemList) {
        var me = this;
        itemList.forEach(function(pin) {
            me._addPin(pin);
        });
    }
};
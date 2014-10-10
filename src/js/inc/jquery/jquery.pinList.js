/* global $, alert, ejs */

'use strict';

var apiResponse = require('./../apiResponse');

module.exports =  {
    el: null,
    $el: null,

    $list: null,
    $title: null,

    options: {
        eventDispatcher: null,
        itemTemplate : ''
    },
    init: function(options, element) {
        this.options = $.extend({},this.options,options);

        this.el  = element;
        this.$el = $(element);

        this.$listWrapper = this.$el.find('*[data-pinlist-list]').first();
        this.$title = this.$el.find('*[data-pinlist-title]').first();
        this._init();
        return this;
    },

    _init: function() {
        this._eventSubscribe();
    },

    _eventSubscribe: function() {
        var me = this;
        this.options.eventDispatcher.subscribe('init', function() {
            me.uiEmptyList();
            // me.load();
            var data = require('../mockup/pins.js');
            me.uiFillList(data);
        });
    },
    load: function(filters) {
        var url = '/api/pins/list',
            type = 'GET',
            filters = filters || {};
        $.ajax({
            url: url,
            type: type,
            data: filters
        })
        .done(function(data) {
            var response = new apiResponse();
            response.init(data);
            switch(response.status) {
                case response.STATUS_ERROR :

                    break;    
                case response.STATUS_SUCCESS :

                    break;
                case response.STATUS_FAIL :

                    break;
                default :
                    
            }
        })
        .error(function(jqXHR, textStatus, err) {
            // @todo manage error
            alert('Errro while fetching data from API (' + textStatus + ')');
            console.log(err);
        });
    },

    uiEmptyList: function() {
        this.$listWrapper.html('');
    },

    uiFillList: function(itemList) {
        var me = this;
        itemList.forEach(function(pin) {
            var html = ejs.render(me.options.itemTemplate, pin);
            me.$listWrapper.append(html);
        });
        this.options.eventDispatcher.trigger('listUpdated', itemList); 
    }
};
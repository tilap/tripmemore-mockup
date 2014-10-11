/* global $, alert, ejs, getFakeData */

'use strict';

var apiResponse = require('./../apiResponse');

// For mockup only
function getFakeData() {
    return [
        {
            _id: 7,
            origin: 'http://tilap.net/',
            date: '2012-02-01 21:30:23',
            place: {
                name: 'Paris',
                ll: 65.8587724,
                lg: 17.346735
            },
            media :{
                type: 'image',
                content: 'http://lorempixel.com/900/400/abstract/'
            }
        },
        {
            _id: 201,
            origin: 'http://pouetpouet.net/',
            date: '2012-02-01 21:30:23',
            place: {
                name: 'Noumea',
                ll: -20.8587724,
                lg: 16.346735
            },
            media :{
                type: 'image',
                content: 'http://lorempixel.com/1600/1200/animals/'
            }
        },
        {
            _id: 3,
            origin: 'http://google.com/',
            date: '2012-02-01 21:30:23',
            place: {
                name: 'Bruxelles',
                ll: 24.8587724,
                lg: 7.346735
            },
            media :{
                type: 'image',
                content: 'http://lorempixel.com/200/200/business/'
            }
        },
        {
            _id: 4,
            origin: 'http://www.evaneos.com/',
            date: '2012-02-01 21:30:23',
            place: {
                name: 'Porte de Clichy',
                ll: 32.8587724,
                lg: 4.346735
            },
            media :{
                type: 'image',
                content: 'http://lorempixel.com/800/600/cats/'
            }
        },
        {
            _id: 5,
            origin: 'http://julie.zirubia.com/',
            date: '2012-02-01 21:30:23',
            place: {
                name: 'Paname',
                ll: 48.8587724,
                lg: 2.346735
            },
            media :{
                type: 'image',
                content: 'http://lorempixel.com/800/600/city/'
            }
        },
        {
            _id: 9,
            origin: 'http://nooneisinnocent.no/',
            date: '2012-02-01 21:30:23',
            place: {
                name: 'Ho Chi Minh City',
                ll: 55.8587724,
                lg: -75.346735
            },
            media :{
                type: 'image',
                content: 'http://lorempixel.com/800/600/food/'
            }
        },
        {
            _id: 22,
            origin: 'http://codingisliving.net/',
            date: '2012-02-01 21:30:23',
            place: {
                name: 'Peperoni Pizza Mogador Hotel',
                ll: 38.8587724,
                lg: 2.946735
            },
            media :{
                type: 'image',
                content: 'http://lorempixel.com/800/600/fashion/'
            }
        },
        {
            _id: 8,
            origin: 'http://why.net/',
            date: '2012-02-01 21:30:23',
            place: {
                name: 'Mi case',
                ll: 38.8587724,
                lg: 4.946735
            },
            media :{
                type: 'image',
                content: 'http://lorempixel.com/1000/600/nature/'
            }
        },
        {
            _id: 99,
            origin: 'http://yeswecan.net/',
            date: '2012-02-01 21:30:23',
            place: {
                name: 'Berlin',
                ll: 38.8587724,
                lg: 12.946735
            },
            media :{
                type: 'image',
                content: 'http://lorempixel.com/800/800/people/'
            }
        },
        {
            _id: 1899,
            origin: 'http://need-a-fresh-redbull.now/',
            date: '2012-02-01 21:30:23',
            place: {
                name: 'Copenhague',
                ll: 38.8587724,
                lg: -7.946735
            },
            media :{
                type: 'image',
                content: 'http://lorempixel.com/600/400/transport/'
            }
        },
        {
            _id: 10122,
            origin: 'http://dont-stop-the-music-babyyyyy.sexy/',
            date: '2012-02-01 21:30:23',
            place: {
                name: 'Neverland',
                ll: 38.8587724,
                lg: 2.946735
            },
            media :{
                type: 'image',
                content: 'http://lorempixel.com/800/600/technics/'
            }
        }
    ];
}

module.exports =  {
    el: null,
    $el: null,

    $list: null,
    $title: null,

    options: {
        eventDispatcher: null,
        itemTemplate : '',
        modal : null
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
            // @todo me.load();
            var data = getFakeData();
            me.uiFillList(data);
        });
    },
    load: function(filters) {
        var url = '/api/pins/list',
            type = 'GET';
        
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
        this.options.eventDispatcher.trigger('listCleared'); 
    },

    uiFillList: function(itemList) {
        var me = this;
        for(var k=0; k<itemList.length; k++) {
            var pin = itemList[k];
            // Todo: create a real object plugin
            var $html = $(ejs.render(me.options.itemTemplate, pin));
            me.$listWrapper.append($html);
        }

        me.$listWrapper.find('*[data-focus-place]')
            .click(function(e) {
                e.preventDefault();

                var pinId = $(this).data('focusPlace');
                me.options.eventDispatcher.trigger('requirePinFocus', itemList[pinId]);
            })
            .dblclick(function(e) {
                e.preventDefault();

                var pinId = $(this).data('focusPlace');
                me.options.eventDispatcher.trigger('requirePinZoom', itemList[pinId]);
            });

        me.$listWrapper.find('*[data-open-place]')
            .click(function(e) {
                e.preventDefault();

                var pinId = $(this).data('openPlace');
                me.options.modal.showItemFromList(itemList, pinId);
            });

        this.options.eventDispatcher.trigger('listUpdated', itemList); 
    }
};
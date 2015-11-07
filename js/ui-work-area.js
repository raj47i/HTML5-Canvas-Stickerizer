
var app;
jQuery(function($){
    'use strict';
    function _loadImage(){
        this._ = new window.FileReader();
        
    };
    app = {
        _: 'div.main',
        $: function(selector){
            return $(selector, this._)
        },
        $canvas: null,
        canvas: null,
        $stickers: null,
        _dialogs: {},
        openDialog: function(name){
            if(name in this._dialogs) {
                this._dialogs[name].dialog('open');
            }else {
                var _dialogs = this._dialogs;
                $('.' + name, 'div.dialogs').first().each(function(){
                    _dialogs[name] = $(this).dialog('open');
                });
            }
        },
        
        fr: null,
        
        showInputMainImage: function(){
            this.$('.image > input[type=file]:first').show();
        },
        
        stickersAddNew: function (title, inFile){
            var tmpReader = new FileReader();
            tmpReader.onload = function (ev) {
                var $img = $('<div class="sticker"><img alt="' + title + '"/><div>' + title + '</div></div>')
                    .appendTo(app.$stickers)
                    .find('img:first')
                    .attr('src', ev.target.result)
                ;
                $img.data('sWidth', $img.width());
                $img.data('sHeight', $img.height());
                $img
                    .width(Math.min($img.width(), app.$stickers.width() - 18))
                    .each(app._stickerHandleDrag)
                ;
            };
            tmpReader.readAsDataURL(inFile, 0, 0);
        },
        _stickerHandleDrag: function(){
            $(this).draggable({
                appendTo: app._,
                cursor: "pointer",
                helper: "clone"
            });
        },
        stickersReset: function(){
            while(this.$stickers[0].children.length > 0){
                this.$stickers[0].removeChild(this.$stickers[0].lastChild);
            }
        },
        resetWorkArea: function(resetStickers){
            resetStickers = (resetStickers === true);
            if(resetStickers){
                this.stickersReset();
            }
            this.$canvas[0].getContext('2d').clearRect(0, 0, this.$canvas[0].width, this.$canvas[0].height);
            this.showInputMainImage();
        },
        
        _mainImg: new Image(),
        mainImgRedraw: function(inFile){
            if(typeof inFile !== 'undefined' && 'file' === inFile.constructor.name.toLowerCase()){
                var tmpReader = new FileReader();
                tmpReader.onload = function (ev) {
                    app._mainImg.src = this.result;
                };
                tmpReader.readAsDataURL(inFile, 0, 0);
            }else{
                this.$canvas[0].width = this.$canvas.width();
                this.$canvas[0].height = Math.max(this.$canvas.height(), this._mainImg.height);
                this.$canvas[0].getContext("2d").drawImage(this._mainImg, 0, 0, this._mainImg.width, this._mainImg.height, 0, 0, this._mainImg.width, this._mainImg.height);
                this.$('.image > input[type=file]:first:visible').hide();
            }
        },

        _init: function(){
            // Check for availability of FileReader API
            if (typeof window.FileReader !== 'function'){
                $(this._).html("Sorry, FileReader isn't supported on this browser yet.");
                return;
            }
            this.$canvas = this.$('.image > canvas');
            this.canvas = this.$canvas[0];
            this.$stickers = this.$('.stickers');
            this._mainImg.onload = function(ev) {
                app.mainImgRedraw();
            };
            this.$canvas.parent().width(Math.max($('div.main').width(), 999) - parseInt(app.$stickers.width()) - 10);
            app.$stickers.css('maxHeight', this.$canvas.height()- 5 + 'px');
            this.$('div.image > input[type=file]:first').on('change', function(ev){
                app.mainImgRedraw(ev.target.files[0]);
            });
            
            
            this.$('div.image > canvas').droppable({
              accept: "img",
              drop: function( event, ui ) {
                var hD = {
                    'width': ui.helper.width(),
                    'height': ui.helper.height()
                };
                var sD = {
                    'width': ui.draggable.data('sWidth'),
                    'height': ui.draggable.data('sHeight')
                };
                $(ui.helper).remove();
                app.$canvas[0].getContext("2d")
                    .drawImage(ui.draggable[0], 0, 0, sD['width'], sD['height'], ui.position.left - 1, ui.position.top - 1, hD['width'], hD['height'])
                ;
              }
            });

        }
    };
    app._init();
});
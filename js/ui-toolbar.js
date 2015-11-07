jQuery(function($){
    'use strict';
    var $t = $( "div.toolbar" )
        .find('> button')
        .button()
        .end()
    ;
    
    /* Start over - Begin */
    $t.on('click', '> button.image-load', function(ev){
        app.$('.image input[type=file]:first').trigger('click');
    });
    
    /* Image Reset - Begin */
    $t.on('click', '> button.image-reset', function(ev){
        app.mainImgRedraw();
    });
    
    
    /* Image Save - Begin */
    $t.on('click', '> button.image-save', function(ev){
        var canvas = $(ev.target).parent('div.toolbar').siblings('div.main').find('.image > canvas:first')[0];
        $('div.dialogs .image-save')
            .find('img:first')
                .attr('src', canvas.toDataURL())
                .end()
            .dialog('open')
        ;
    });


    /* Sticker Reset - Begin */
    $t.on('click', '> button.sticker-reset', function(){
        app.stickersReset();
    });


    /* Sticker Save - Begin */
    $t.on('click', '> button.sticker-new', function(){
        app.openDialog('sticker-new');
    });

});
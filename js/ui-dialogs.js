jQuery(function($){
    'use strict';
    var $d = $( "div.dialogs" );
    /* New Sticker - Begin */
    $d.children('.sticker-new:first').dialog({
        appendTo: $d,
        autoOpen: false,
        height: 'auto',
        width: 400,
        modal: true,
        draggable: false,
        create: function( ev, ui ) {
            $(this).on('change', 'input.file,input.text', function(ev){
                var $t = $(ev.target);
                if( $t.val().length < 3 ){
                    $t.addClass('ui-state-error');
                }else{
                    $t.removeClass('ui-state-error');
                }
            });
        },
        close: function(ev) {
            $(ev.target)
                .find('input')
                    .removeClass( 'ui-state-error' )
                    .end()
                .find('form:first')[0].reset()
            ;
        },
        buttons: {
            Add: function(ev){
                var valid = true
                var $dialog = $(this);
                $dialog.find('input.file,input.text').each(function(){
                    var $t = $(this); // Input
                    if( $t.val().length < 3 ){
                        valid = false;
                        $t.addClass("ui-state-error");
                    }else{
                        $t.removeClass("ui-state-error");
                    }
                });
                if(valid){
                    app.stickersAddNew($dialog.find('input#s_title').val(), $dialog.find('input#s_file')[0].files[0]);
                }
            },
            Cancel: function(ev) {
              $(this).dialog( "close" );
            }
        }
    });
    /* New Sticker - End */
    
    /* Preview & Save - Begin */
    $d.children('.image-save:first').dialog({
        appendTo: $d,
        autoOpen: false,
        modal: true,
        resizable: false,
        width:'auto',
        draggable: false,
        buttons: {
            Close: function(ev) {
                $(this).dialog( "close" );
            }
        },
        open: function(ev, ui){
            $(this)
                .find('img:first').width(app.$canvas.width())
                .end()

                .dialog('option', 'position', {my: "center", at: "center", of: window})
            ;
        }
    });
    /* Preview & Save - End */
});
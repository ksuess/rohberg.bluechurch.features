$(document).ready(function() {
    
    var random_18 = Math.floor((Math.random() * 18) + 1);
    $("#visual-portal-wrapper")
        .css("background-image", "url('/++theme++bluechurch/images/backgrounds/blue_church_" + random_18 + ".jpg')");

    
    
    // "related item" als audio player anzeigen, wenn mp3 oder aehnliches
    var extensions = ["mp3", "wma", "wav", "m4a", "m4b", "m4p", "mpc", "aiff"];
    for (i = 0; i < extensions.length; i++) {
        var related_audio = $('.relatedItems a[href$="'+ extensions[i] +'"]').each(function( index ) {
            var filename = "/"+$(this).attr('href').split("/").slice(3).join("/");
            $(this).parent().html($(this).html() +'<br><audio src="'+ filename +'" controls="controls"></audio>');
        });
    } ;
 
    // // collective.collectionfilter
    // $('.filterLabel').each(function(index) {
    //     var txt = $(this).text();
    //     $(this).text(txt.replace(/-/g, " "));
    // });
    
    
    $("label[for='__ac_name'], label[for='userid']").text("Email");
    
    // Translations
    // $("html[lang='de']");
    $("html[lang='de'] label[for='form-widgets-ILeadImage-image']").text("Profilbild");
    $("html[lang='de'] label[for='form-widgets-ILeadImage-image_caption']").text("Legende zum Profilbild");
    
    // Collapse City Filter
    // $("aside.filterCity .portletContent").hide();
    // $('aside.filterCity .portletHeader').css({"cursor":"pointer","color": "#81b7e6"});
    // $('aside.filterCity .portletHeader').prepend("<span class='open-down'></span>");


    var portlet = $("aside.filterCity")
    var pwrapper = portlet.parent().addClass("portletWrapperCollapsible");    
    var pheader = portlet.find(".portletHeader");
    portlet.wrap( "<div class='innerPortletwrapper'></div>" );
    var iwrapper = pwrapper.find(".innerPortletwrapper");
    pheader.addClass("portletHeaderCollapsible").insertBefore(iwrapper);
    

    pheader.click(function() {
      iwrapper.slideToggle( function() {
        // Animation complete.
      });
    });
    
    
});
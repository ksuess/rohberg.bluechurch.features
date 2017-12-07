$(document).ready(function() {
    
    var random_18 = Math.floor((Math.random() * 18) + 1);
    $("#visual-portal-wrapper")
        .css("background-image", "url('/++theme++bluechurch/images/backgrounds/blue_church_" + random_18 + ".jpg')");

    
    // var related_audio = $(".relatedItems a[href$='mp3']").each(function( index ) {
    var extensions = ["mp3", "wma", "wav", "m4a", "m4b", "m4p", "mpc", "aiff"];
    for (i = 0; i < extensions.length; i++) {
        var related_audio = $('.relatedItems a[href$="'+ extensions[i] +'"]').each(function( index ) {
            var filename = "/"+$(this).attr('href').split("/").slice(3).join("/");
            $(this).parent().html($(this).html() +'<br><audio src="'+ filename +'" controls="controls"></audio>');
        });
    } ;
 
    // collective.collectionfilter
    $('.filterLabel').each(function(index) {
        var txt = $(this).text();
        $(this).text(txt.replace(/-/g, " "));
    });
    
    
});
var force_sidebar_open = false;
var force_close_threshold = 1300;
var min_content_width = 1000;

function revealSidebar(){
    // if($(content_body).innerWidth() > min_content_width){
    $('#content').css({"padding-left": "var(--sidebar-width)"});
    // }
    $('#sidebar').css({"width": "var(--sidebar-width)"});
    $('#sidebar').children().css({"display": "block"});
    $('#sidebar_selector').css({"display": "none"});
}

function hideSidebar(force=false){
    
    if(!force && force_sidebar_open){
        return;
    }
    $('#sidebar').css({"width": "12px"});
    $('#content').css({"padding-left": "32px"});
    $('#sidebar').children().css({"display": "none"});
    $('#sidebar_selector').css({"display": "block"});
}

$('#sidebar').bind('mouseover', () => revealSidebar());
$('#sidebar').bind('mouseout', () => hideSidebar());

$(window).resize(function() {
    if($(window).innerWidth() > force_close_threshold){
        revealSidebar();
        force_sidebar_open = true;
    }
    else{
        hideSidebar();
        force_sidebar_open = false;
    }
});

$(window).innerWidth() > force_close_threshold ?  force_sidebar_open = true : force_sidebar_open = false;
$(window).innerWidth() > force_close_threshold ?  revealSidebar() : hideSidebar();

document.querySelector(".maxarea").style.width = document.querySelector(".maxarea").className.split(" ")[1]+"px";
function querySearch(str){
    console.log(str);
    if(str.length != 9) {
        return;
    }

    if(isNaN(parseInt(str))){
        return;
    }

    performPost(str);
}

function searchResult(json){    
    showResult(json);
}

function showResult(json){
    console.log(json);
    localStorage.setItem("current_hsr_profile", JSON.stringify(json));

    var profile_preview = profilePreview(json["player"]);
    profile_preview.addEventListener("click", () => {switchTab("profile")});
    $("#profile_preview_box").append(profile_preview);
}

$("#uidSearch_button").bind('click', () => {querySearch($("#uidSearch_text").val())});

$(".profile_preview:first").css({"display": "none"});
$("#profile_preview_page_index_box").css({"display": "none"});


function load_uid_tree(){
    const tree = {
        full:{

        }
    }
}
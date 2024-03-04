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

function setLocal(id, json){
    localStorage.setItem(id, JSON.stringify(json));
}

function getLocal(id, exceptionhandler=null){
    var item = localStorage.getItem(id);
    if(item == null && exceptionhandler != null){

    }
    else return JSON.parse(item);
}


function resetUIDQueue(){
    uidqueue = {count:0}
    setLocal("hsr_uid_queue", uidqueue);
}

function attemptAddUIDQueue(json){  
    for(let i = 0; i < parseInt(uidqueue["count"]); i++){
        if(json["player"]["uid"] == uidqueue[i]["player"]["uid"]){
            return;
        }
    }
    uidqueue[uidqueue.count] = json;
    uidqueue.count++;
    setLocal("hsr_uid_queue", uidqueue);
    showResult(json);
}

function searchResult(json){    
    console.log(json);
    attemptAddUIDQueue(json);
    //showResult(json);
}

function showResult(json){
    console.log(json);

    var profile_preview = profilePreview(json["player"]);
    profile_preview.addEventListener("click", () => {
        localStorage.setItem("current_hsr_profile", JSON.stringify(json));
        switchTab("profile");
    });
    $("#profile_preview_box").append(profile_preview);
}

$("#uidSearch_button").bind('click', () => {querySearch($("#uidSearch_text").val())});

$(".profile_preview:first").css({"display": "none"});
$("#profile_preview_page_index_box").css({"display": "none"});






var uidqueue = getLocal("hsr_uid_queue");
if(!"count" in uidqueue) {
    setLocal("hsr_uid_queue", {count:0});
    uidqueue = {};
}
for(let i = 0; i < parseInt(uidqueue.count); i++){
    console.log(i);
    showResult(uidqueue[i]);
}






function load_uid_tree(){
    const tree = {
        full:{

        }
    }
}
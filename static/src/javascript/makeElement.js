

function makeElement(tagName, className, text, attr) {
    var element = document.createElement(tagName);
    element.className = className;
    if (text) {
        element.textContent = text;
    }
    if (attr) {
        for (var key in attr) {
            element.setAttribute(key, attr[key]);
        }
    }
    return element;
}

function renderTree(tree, root, rootName){
    for(let key in tree){
        if(key != "type" && key != "text" && key != "src" && key != "srcRaw" && key != "break" && key != "css" && key != "class" && key != "attr"){
            let child = tree[key];

            // if child element declares break, child className is child name
            let elm = makeElement(
                "type" in child? child["type"]:"div",
                "break" in child ? key:(rootName + "_" + key), 
                "text" in child? child["text"]:"",
                "attr" in child? child["attr"]:null
            );

            if("css" in child){
                for(let css_key in child["css"]){
                    elm.style[css_key] = child["css"][css_key];
                }
            }

            if("type" in child && child["type"] == "img"){
                if("src" in child) elm.setAttribute("src", 'https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/' + child["src"]);
                else if ("srcRaw" in child) elm.setAttribute("src", child["srcRaw"]);
            };

            if("class" in child){
                elm.className += " " + child["class"];
            }

            // if child element declares break, draw child's children with parent name as child name
            root.appendChild(renderTree(tree[key], elm, ("break" in tree[key] ? (key):(rootName + "_" + key))));
        } 
    }

    return root;
}

function profilePreview(profile_json){
    var profile_preview = makeElement("div", "profile_preview", "");
    var profile_preview_logo = makeElement("div", "profile_preview_logo", "");
    var profile_preview_description = makeElement("div", "profile_preview_description", "");

    var profile_preview_uid = makeElement("div", "profile_preview_uid", "");
    var profile_preview_title = makeElement("div", "profile_preview_title", "");
    var profile_preview_level = makeElement("div", "profile_preview_level", "");

    profile_preview_description.appendChild(profile_preview_uid);
    profile_preview_description.appendChild(profile_preview_title);
    profile_preview_description.appendChild(profile_preview_level);

    var img = makeElement("img", "profile_preview_logo_img", "");
    img.setAttribute("src", "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/" + profile_json["avatar"]["icon"]);

    profile_preview_logo.appendChild(img);
    profile_preview.appendChild(profile_preview_logo);
    profile_preview.appendChild(profile_preview_description);

    profile_preview_uid.innerHTML = profile_json["uid"];
    profile_preview_title.innerHTML = profile_json["nickname"] + " - Lv " + profile_json["level"];
    profile_preview_level.innerHTML = "  - '" + profile_json["signature"] + "'";

    return profile_preview;
}

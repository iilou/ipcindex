var profile = localStorage.getItem("current_hsr_profile");
// if(profile == null){
//     document.getElementById("");
// }

// else{
    console.log(JSON.parse(profile));
    $("#content_body").append(profileFull(JSON.parse(profile)));
// }

function mihomoPost(uid){
    $.ajax({
        type: "POST",
        url: "{{url_for('create_file')}}",
        data: {"uid": uid},
        success: function(data){
            console.log(data);
            localStorage.setItem("current_hsr_profile", JSON.stringify(data));
        },
        dataType: "json"
    })
}


function characterView(character_json){

    const hexto2 = (s) => {return s.length==2?s:"0"+s};

    const multiplyColor = (str, factor) => { if(str[0] == "#") str=str.substring(1,7);return "#"+hexto2(Math.round(Number("0x"+str.substring(0,2))*factor).toString(16)) + hexto2(Math.round(Number("0x"+str.substring(2,4))*factor).toString(16)) + hexto2(Math.round(Number("0x"+str.substring(4,6))*factor).toString(16));}

    const colorup = (str, f) => { if(str[0] == "#") str=str.substring(1,7); return "#"+ hexto2(Math.round((Number("0xff")-Number("0x"+str.substring(0,2)))*f+Number("0x"+str.substring(0,2))).toString(16)) + hexto2(Math.round((Number("0xff")-Number("0x"+str.substring(2,4)))*f+Number("0x"+str.substring(2,4))).toString(16)) +hexto2(Math.round((Number("0xff")-Number("0x"+str.substring(4,6)))*f+Number("0x"+str.substring(4,6))).toString(16));}

    let active_trace_border = "inset 0px 0px 6px 1px " + colorup(character_json["element"]["color"], 0.4);
    let element_name = character_json["element"]["name"];

    console.log(character_json["element"]["color"]);

    var tree = {
        character:{
            class:character_json.name,
            break:{},
            css:{
                // "backgroundImage": "url(static/assets/" + character_json["portrait"] + ")",
                "backgroundImage": "url(https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/" + character_json["portrait"] + ")",
                // "background-color": character_json["element"]["color"]
                "background-color": colorup(multiplyColor(character_json["element"]["color"], 0.75), 0.19)
            },
            skillTree:{
                css:{},
                minorTraces:{},
                majorTraces:{},
                abilities:{},
                eidolons:{},
            },

            main:{
                css:{
                    // "backgroundImage": "url(static/assets/image/simulated_event/" + aeonImages[character_json.path.name] + ")",
                    "backgroundImage": "url(https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/" + character_json["path"]["icon"] + ")",
                    // "backgroundImage": "url(static/assets/" + character_json["portrait"] + ")",
                },
                name:{
                    text:character_json["name"] + 
                        // " - " + character_json["element"]["name"] + 
                        " - Lv. " + character_json["level"],
                    css:{
                        "font-size" : character_json["name"].length > 10 ? "1.3rem": (character_json["name"].length > 5 ? "1.7rem" : "1.7rem"),
                        "letter-spacing" : character_json["name"].length > 10 ? "0px": (character_json["name"].length > 5 ? "0px" : "0.5px"),
                        "line-height" : character_json["name"].length > 10 ? "38px": (character_json["name"].length > 5 ? "40px" : "40px"),
                        "background-color" : "#303030",
                        "color" : colorup(character_json["element"]["color"], 0.3)
                    }
                },
                attributes:{},
                light_cone:{},
            },

            relics:{
            }
        }
    }

    const add_light_cone = (obj_reference) => {
        if(character_json["light_cone"] == null) return;
        let lc = {
            rarity:{
                type:"img",
                src:character_json["light_cone"]["rarity"] == 5 ? "/icon/deco/Star5.png":"/icon/deco/Star4.png"
            },
            icon:{
                type:"img",
                src:character_json["light_cone"]["icon"],
            },
            desc:{
                title:{
                    text:"\"" + character_json["light_cone"]["name"] + "\""
                },
                superimposition:{
                    text:"S" + character_json["light_cone"]["rank"],
                    css:{
                        "color":character_json["light_cone"]["rank"]==5 ? character_json["element"]["color"] : "var(--color-white_3)",
                    }
                },
                level:{
                    text:"Lv. " + character_json["light_cone"]["level"],
                    css:{
                        "color":character_json["light_cone"]["level"]==80 ? character_json["element"]["color"] : "var(--color-white_3)",
                    }
                }
            }
        }
        obj_reference.light_cone = lc;
    }

    const add_minor_traces = (obj_reference) => {
        let skill_tree = character_json["skill_trees"];
        let minorTraces = {};
    
        // collect minor trace data from skill tree
        for(let i = 8; i < 18; i++){
            let type = skill_tree[i.toString()]["icon"];
            if(type in minorTraces){
                minorTraces[type]["count"] += 1;
                minorTraces[type]["level"] += skill_tree[i.toString()]["level"];
            }else{
                minorTraces[type] = {
                    count:1,
                    level:skill_tree[i.toString()]["level"],
                    icon:skill_tree[i.toString()]["icon"]
                }
            }
        }
    
        // add elements to tree in sorted order
        for(let i = 0; i < 3; i++) {
            let max = -1;
            for(let type in minorTraces){
                if(max == -1) max = type;
                else max = minorTraces[type]["count"] > minorTraces[max]["count"] ? type:max;
            }
    
            obj_reference[i] = {
                class: "character_minor_trace_row",
            };
            for(let j = 0; j < minorTraces[max]["count"]; j++){
                obj_reference[i][j] = {
                    class: "character_minor_trace",
                    icon:{
                        type:"img",
                        src:minorTraces[max]["icon"],
                        css:{
                            "boxShadow" : j < minorTraces[max]["level"] ? "inset 0px 0px 3px 1px " + colorup(character_json["element"]["color"], 0.4):"none",
                        }
                    }
                }
            };
            delete minorTraces[max];
        }
    }

    const add_major_traces = (obj_reference) => {
        let skill_tree = character_json["skill_trees"];
        let majorTraceIds = ["A1", "A4", "A6"];

        for(let i = 5; i <= 7; i++){
            obj_reference[majorTraceIds[i-5]] = {
                class: "character_major_trace",
                icon:{
                    type:"img",
                    src:skill_tree[i]["icon"],
                    css:{
                        "boxShadow" : skill_tree[i]["level"] > 0 ? active_trace_border:"none",
                    }
                }
            }
        }
    }

    const add_eidolons = (obj_reference) => {
        for(let i = 0; i < 6; i++){
            obj_reference["eidolon"+(i+1)] = {
                class: "character_eidolon",
                icon:{
                    type:"img",
                    src:character_json["rank_icons"][i],
                    css:{
                        "boxShadow" : character_json["rank"] > i ? active_trace_border:"none",
                    }
                }
            }
        }
    }

    const add_abilities = (obj_reference) => {
        let skill_tree = character_json["skill_trees"];
        let abilityIds = ["basic", "skill", "ultimate", "passive"];
        let abilityMaxLevels = [6, 10, 10, 10];

        for(let i = 0; i < 4; i++){
            obj_reference[abilityIds[i]] = {
                class: "character_ability",
                icon:{
                    type:"img",
                    src:skill_tree[i]["icon"],
                    css:{
                        "boxShadow" : skill_tree[i]["level"] >= abilityMaxLevels[i] ? active_trace_border:"none",
                    },
                    class: "character_ability_icon"
                },
                level:{
                    class: "character_ability_level",
                    text: skill_tree[i]["level"],
                    css:{ 
                        "color" : skill_tree[i]["level"] >= abilityMaxLevels[i] ? colorup(character_json["element"]["color"], 0.3) : "#d9d9d9",
                        // "backgroundColor": skill_tree[i]["level"] >= abilityMaxLevels[i] ?  : "#303030",
                    }
                }
            }
        }
    }

    const add_relics = (obj_reference) => {
        let relics = character_json["relics"];
    
        const check_set = (set_id) => {
            for(set in character_json["relic_sets"]){
                if(character_json["relic_sets"][set]["id"] == set_id) return true;
            }
            return false;
        }
        let relic_found = [false, false, false, false, false, false];
        // attach relics to tree
        for(let i = 0; i < 6; i++){
            if(!(i in relics)){
                break;
            }

            console.log(relics[i]["id"]%10);
            let current_relic_id = relics[i]["id"];
            relic_found[current_relic_id%10-1] = relics[i];
        }
        console.log(0 in relics, relic_found, relics);

        for (let i = 0; i < 6; i++){
            let current_relic = relic_found[i];

            if(!current_relic) {
                obj_reference["relic"+(i+1)] = {
                    class: "character_relic",
                }
                continue
            };

            const target_mainstat_name = ["energy regeneration rate", element_name+" dmg boost"]
            const target_mainstat_short_name = ["Energy Regen", element_name+"%"]
            const mainstat_short_name = (name, type) => {
                // for(let i = 0; i<target_mainstat_name.length; i++){
                //     if(name.toLowerCase().includes(target_mainstat_name[i].toLowerCase())) return target_mainstat_short_name[i];
                // }
                if(name.toLowerCase().includes(" dmg boost")) return name.split(" ")[0] + "%";
                if(name.toLowerCase().includes("energy regeneration rate")) return "Energy%";
                if(name == "Outgoing Healing Boost") return "Healing%";
                if(type.toLowerCase().includes("addedratio")) return name+"%";
                return name;
            }

            // base tree
            obj_reference["relic"+(i+1)] = {
                class: "character_relic",
                icon_container:{
                    class:"character_relic_icon_container",
                    icon:{
                        type:"img",
                        src:current_relic["icon"],
                    },
                    css:{
                        boxShadow: check_set(current_relic["set_id"]) ? "inset 0px 0px 7px 3px " + colorup(character_json["element"]["color"], 0.4):"none"
                    }
                },
                substats:{
                    class:"character_relic_substats"
                }
            }

            function multiIncludes(type, arr){
                for(let i = 0; i < arr.length; i++){
                    if(type.includes(arr[i])) return true;
                }
                return false;
            }

            const isRatio = (type) => {return multiIncludes(type, ["Ratio", "Critical", "Status"])};
            // attach all substats onto relic
            for(let j = 0; j < 4; j++){
                if(j in current_relic["sub_affix"] == false) break;

                obj_reference["relic"+(i+1)]["substats"]["substat"+(j+1)] = {
                    class: "character_relic_substat",
                    icon:{
                        type:"img",
                        src:current_relic["sub_affix"][j]["icon"],
                    },
                
                    txt:{
                        class:"character_relic_substat_txt",
                        text: (current_relic["sub_affix"][j]["name"] == "Effect Hit Rate" ?
                            "EHR" : 
                            current_relic["sub_affix"][j]["name"]) + " " + (
                            (isRatio(current_relic["sub_affix"][j]["type"]) ? Math.round((current_relic["sub_affix"][j]["value"]*1000))/10 + "%": Math.round((current_relic["sub_affix"][j]["value"]*10))/10))
                    },
                    
                }
            }

            obj_reference["relic"+(i+1)].mainstat={
                class:"character_relic_mainstat",
                name:{
                    class:"character_relic_mainstat_name",
                    text:mainstat_short_name(current_relic["main_affix"]["name"], current_relic["main_affix"]["type"])
                },
                value:{
                    class:"character_relic_mainstat_value",
                    text:current_relic["main_affix"]["display"],
                }
            }
        }
    }

    const add_attributes = (obj_reference) => {
        let additions_json = character_json["additions"];
        let attributes_json = character_json["attributes"];
        const breakIndex = 3;

        const find = (obj, key) =>{
            //if no ref
            for(let i = 0; i < obj.length; i++){
                if(obj[i]["name"].toLowerCase() == key.toLowerCase()) return obj[i]["value"];
            }
            return 0;
        }

        const gen = (str) => {
            str = str.split(" ");
            for(let i = 0; i < str.length; i++){
                str[i] = str[i].split("_").join(" ");
            }
            return str;
        }

        const target_attribute_titles = gen(
            `HP DEF ATK CRIT_RATE CRIT_DMG ${character_json.element.name}_DMG_BOOST BREAK_EFFECT SPD EFFECT_RES EFFECT_HIT_RATE ENERGY_REGENERATION_RATE`
        );

        const display_attribute_titles = gen(
            `HP DEF ATK Crit_Rate Crit_DMG ${character_json.element.name}% Break_Effect SPD Effect_Res Effect_Hit_Rate Energy_Regen`
        );

        const attribute_multipliers = [1, 1, 1, 100, 100, 100, 100, 1, 100, 100, 100];
        const attribute_rounding = [0, 0, 0, 2, 2, 1, 1, 0, 1, 1, 1];


        console.log(target_attribute_titles);

        Number.prototype.round = function(places) {
            if(!this.toString().includes(".")) return this;
            return +this.toString().substring(0, this.toString().indexOf(".") + places + 1);
        }

        const get = (i) => { 
            let val1 = find(attributes_json, target_attribute_titles[i]);
            let val2 = find(additions_json, target_attribute_titles[i]);

            // console.log(val1, val2);
            // console.log(val1? Math.round(val1 * attribute_multipliers[i]*10**attribute_rounding[i])/10**attribute_rounding[i]:0 + 
            //     val2? Math.round(val2 * attribute_multipliers[i]*10**attribute_rounding[i])/10**attribute_rounding[i]:0);

            // return (val1? Math.round(val1 * attribute_multipliers[i]*10**attribute_rounding[i])/10**attribute_rounding[i]:0) 
                // +  (val2? Math.round(val2 * attribute_multipliers[i]*10**attribute_rounding[i])/10**attribute_rounding[i]:0);

            return (val1||val2)?(((val1? val1:0) + (val2? val2:0))*attribute_multipliers[i]).round(attribute_rounding[i]):0;
        }

        for(let i = 0; i < target_attribute_titles.length; i++){
            if(i == breakIndex) obj_reference["brk"] = {class:"character_attribute_break", css:{height:"100%"}};
            obj_reference[target_attribute_titles[i]] = {
                class: "character_attribute",
                title:{
                    class: "character_attribute_title",
                    text: display_attribute_titles[i],
                    css: {
                        // color: character_json.element.color
                    }
                },
                value: {
                    class: "character_attribute_value",
                    text: get(i).toString()
                }
            }
        }
    }

    add_minor_traces(tree.character.skillTree.minorTraces);  
    add_major_traces(tree.character.skillTree.majorTraces);
    add_eidolons(tree.character.skillTree.eidolons);
    add_abilities(tree.character.skillTree.abilities);
    add_light_cone(tree.character.main);
    add_attributes(tree.character.main.attributes);
    add_relics(tree.character.relics);

    console.log(tree);

    return tree;

    // console.log(tree.character.skills.minor.minor);
}

function profileFull(json){
    const tree = {
        full:{
            main:{
                avatar_container:{
                    avatar:{
                        avatar_img:{
                            type:"img",
                            src:json["player"]["avatar"]["icon"]
                        }
                    },

                    uid_container:{
                        text:"UID: "+json["player"]["uid"],
                        class:"profile_full_uid_container"
                    },
                    details:{
                        achievement_container:{
                            text:"Achievements: "+json["player"]["achievement_count"],
                            class:"profile_full_desc_stlist"
                        },
                        friends_container:{
                            text:"Friends: " + json["player"]["friend_count"],
                            class:"profile_full_desc_stlist"
                        },
                        moc_stats:{
                            text:"MOC Stars: ",
                            class:"profile_full_desc_stlist lst"
                        },
                    }
                    
                },
                description:{
                    nickname:{text:json["player"]["nickname"]},
                    level:{text:"TrailBlazer Lv. " + json["player"]["level"] + "\t - World Level " + json["player"]["world_level"]},
                    signature:{text:"\"" + json["player"]["signature"] + "\""}
                }
            },

            title:{text:"Characters"},

            character_container:{
                break:{}
            }
        }
    }

    for(var character in json["characters"]){
        tree.full.character_container[json["characters"][character].name] = characterView(json["characters"][character]);
    }

    // console.log(tree);
    // console.log(tree.full.character_container);

    return renderTree(tree, makeElement("div", "profile", ""), "profile");
}
const profile = JSON.parse(localStorage.getItem("current_hsr_profile"));
console.log(profile);

let currentCharacter = "none";
currentCharacter = profile["characters"][0];

const relic_ranking_html_load = (container, profile) => {
    let html_tree = {
        header: {
            profile:{},
            char:{}
        },
        description:{},
        content:{}
    }

    const addHeader = () => {
        html_tree.header.profile = {
            desc_container:{
                name:{
                    text:profile["player"]["nickname"]
                },
                uid:{
                    text:profile["player"]["uid"]
                }
            },
            icon_container:{
                icon:{
                    type:"img",
                    src:profile["player"]["avatar"]["icon"]
                }
            },
        }
    
        html_tree.header.char = {
            header:{
                text:"Select Character"
            },
            selection_container:{
                title:{
                    text:"---",
                },
                box:{},
                dropdown:{}
            }
        }

        let char_list = profile["characters"];

        let char_count = 0;
        let i = 0;
        let dropdown = {};
        while(true){ // add player characters to dropdown list
            if(char_list[i] == undefined) break;
            i++;
            console.log(char_list[i-1]);
            if(!(char_list[i-1]["name"] in relic_ranking_data.char)) continue;

            dropdown[char_count] = {
                class:"char_selection_dropdown_item ___char_"+(i-1),
                text:char_list[i-1]["name"]
            }
            char_count++;
        }

        dropdown[0]["class"] += " char_selection_dropdown_first";
        dropdown[char_count-1]["class"] += " char_selection_dropdown_last";

        html_tree.header.char.selection_container.dropdown = dropdown;
    }

    const addContent = (character, data, subData) => {
        let content_tree = {
            overview:{},
            relic_0:{},
            relic_1:{},
            relic_2:{},
            relic_3:{},
            relic_4:{},
            relic_5:{},
            // relic_set:{}
        }

        let overallPoints = 0;
        let overallRank = "";

        let ranking_data = "";

        const get_relic_data = () => {
            let relicData = Array(6).fill("none");

            const reduced_stat_name = (name, type) =>{
                // if(name == "Break Effect") return name;
                if(name.includes("DMG Boost")) return "DMG"+"%";
                if(name == "Energy Regeneration Rate") return "Energy Regen%";
                if(type.includes("Ratio")) return name + "%";
                return name;
            }
    
            const reduced_stat_value = (val, name) => {
                if(name.includes("%")) return val*100;
                else if (name.includes("CRIT")) return val*100;
                return val;
            }
    
            const get_main_weight = (i) => { return ("any" in data.mainstat[i])?data.mainstat[i]["any"]:(data.mainstat[i][relicData[i]["main_affix"].lname]==undefined?0:data.mainstat[i][relicData[i]["main_affix"].lname])}
            const get_sub_weight = (i, j) => {return data.substat[relicData[i]["sub_affix"][j].lname]==undefined?0:data.substat[relicData[i]["sub_affix"][j].lname] };
    
            const get_sub_nw = (i, j) => { return relicData[i]["sub_affix"][j].value / relic_ranking_data["substat"][relicData[i]["sub_affix"][j].name.toLowerCase()] }
            const get_sub_pts = (i, j) => { return relicData[i]["sub_affix"][j].nw * relicData[i]["sub_affix"][j].weight; };
    
            const get_relic_rank = (val, i) => { for(let j = 0; j < 5; j++) if(val > data.relic_rank_thresholds[ranks[j]][i]) {return ranks[j]} return "f"}
            const get_overall_rank = (val) => {for(let i = 0; i < 5; i++) if(val > data.overall_rank_thresholds[ranks[i]]) {return ranks[i]}; return "f"}
    
            for(let i = 0; i < 6; i++){
                if(character["relics"][i] == undefined) continue;
                let ci = character["relics"][i]["id"]%10-1;
                relicData[ci] = structuredClone(character["relics"][i]);
    
    
                relicData[ci].main_affix.name = reduced_stat_name(relicData[ci].main_affix.name, relicData[ci].main_affix.type);
                relicData[ci].main_affix.lname = relicData[ci].main_affix.name.toLowerCase();
                relicData[ci].main_affix.value = reduced_stat_value(relicData[ci].main_affix.value, relicData[ci].main_affix.name);
                relicData[ci].main_affix.weight = get_main_weight(ci);
                relicData[ci].main_affix.pts = relicData[ci].main_affix.weight;
                let culmPoints = relicData[ci].main_affix.pts;
                
                for(let j = 0; j < 4; j++){
                    if(relicData[ci]["sub_affix"][j].name == undefined) break;
                    
                    relicData[ci].sub_affix[j].name = reduced_stat_name(relicData[ci].sub_affix[j].name, relicData[ci].sub_affix[j].type);
                    relicData[ci].sub_affix[j].lname = relicData[ci].sub_affix[j].name.toLowerCase();
                    relicData[ci].sub_affix[j].value = reduced_stat_value(relicData[ci]["sub_affix"][j].value, relicData[ci]["sub_affix"][j].name);
                    relicData[ci].sub_affix[j].weight = get_sub_weight(ci, j);
                    relicData[ci].sub_affix[j].nw = get_sub_nw(ci, j);
                    relicData[ci].sub_affix[j].pts = get_sub_pts(ci, j);
                    culmPoints += relicData[ci].sub_affix[j].pts;
                }
    
                relicData[ci].culmPoints = culmPoints;
                overallPoints += culmPoints;
    
                relicData[ci].rank = get_relic_rank(relicData[ci].culmPoints, ci);
            }

            // console.log(overallPoints, overallRank, data.overall_rank_thresholds);
            overallRank = get_overall_rank(overallPoints);

            // console.log(relicData);

            return relicData;
        }

        const addOverview = (tree, pts, rnk) => {
            tree.overview = {
                icon:{
                    type:"img",
                    class:"overview_icon",
                    src: character.icon,
                },
                name:{
                    text: character.name,
                    css:{
                        "fontSize": character.name.length>15?"15px":"20px"
                    }
                },
                level:{
                    text: "Lv. " + character.level,
                },
                container:{
                    title:{
                        text: "Relic Value",
                    },
                    score:{
                        text: pts.toFixed(2) + "p",
                    },
                    letter:{
                        class: rnk.toUpperCase() + "_RANK",
                        text: rnk.toUpperCase(),                //TEMP
                        // css:{backgroundColor:""}
                    },
                    max:{
                        text:"Max Value: 320p"   //TEMP
                    }
                }
            }
        }
        
        const addRelic = (i, relicData) => {
            let exists = relicData[i] != "none";
            console.log(i, exists, relicData[i]);

            content_tree["relic_"+i] = {
                class:"_content_relic_container",
                icon:{
                    class:"_content_relic_icon",
                    type:"img",
                },
                table:{
                    class:"_content_relic_table",
                }
            }

            if(exists) content_tree["relic_"+i].icon.src = relicData[i].icon;
            else {
                content_tree["relic_"+i].icon["srcRaw"] = "https://visualpharm.com/assets/873/Nothing%20Found-595b40b65ba036ed117d20ae.svg";
                console.log("srcraw: ",content_tree["relic_"+i].icon);
            }

            const add_content_relic_value = (label, text, className="_content_relic_value") => {
                content_tree["relic_"+i]["table"][label] = {
                    class:className,
                    text:text,
                }
            }

            

            let labels = ["Name", "Value", "W", "Nr", "P"];
            for(let j = 0; j < labels.length; j++){
                content_tree["relic_"+i]["table"]["label_"+j] = {
                    class:"_content_relic_label",
                    text:labels[j]
                }
            }

            add_content_relic_value("rank", (exists?relicData[i].rank.toUpperCase():"-"), "_content_relic_rank "+(exists?relicData[i].rank.toUpperCase()+"_RANK":""));
            add_content_relic_value("culmPoints", "Total Value: "+(exists?relicData[i].culmPoints.toFixed(1)+" pts":"-"), "_content_relic_culmPoints");

            // main main_v main_w main_n_1 main_nw_1 main_p_1
            add_content_relic_value("main",     exists?relicData[i]["main_affix"].name:"-");
            add_content_relic_value("main_v",   exists?relicData[i]["main_affix"].value.toFixed(2):"-");
            add_content_relic_value("main_w",   exists?relicData[i]["main_affix"].weight.toFixed(1):"-");
            add_content_relic_value("main_nw",  "-");
            add_content_relic_value("main_p",   exists?relicData[i]["main_affix"].pts.toFixed(1):"-");

            for(let j = 0; j < 4; j++){
                let has = exists && (j in relicData[i]["sub_affix"]);
                add_content_relic_value("sub_"+j,       has?relicData[i]["sub_affix"][j].name:"-");
                add_content_relic_value("sub_"+j+"_v",  has?relicData[i]["sub_affix"][j].value.toFixed(1):"-");
                add_content_relic_value("sub_"+j+"_w",  has?relicData[i]["sub_affix"][j].weight.toFixed(1):"-");
                add_content_relic_value("sub_"+j+"_nw", has?relicData[i]["sub_affix"][j].nw.toFixed(1):"-");
                add_content_relic_value("sub_"+j+"_p",  has?relicData[i]["sub_affix"][j].pts.toFixed(1):"-");
            }
            // }

            content_tree["relic_"+i]["table"]["label_4"].class += " top_right_ajsfiodj";
            content_tree["relic_"+i]["table"]["sub_3_p"].class += " bottom_right_ajsfiodj";
            // console.log(data.substat["asdf"]==undefined);
        }

        let relic_data = get_relic_data();
        console.log("relic_data: ",relic_data);

        addOverview(content_tree, overallPoints, overallRank);
        for(let i = 0; i < 6; i++){
            addRelic(i, relic_data);
        }

        return content_tree;
    }

    const addDescription = (setData, data) => {
        // console.log(rankData)

        let root = {max:{},rank:{},substat:{},mainstat:{},set:{}}

        const camalize = (str) => {
            if(str == "spd") return "SPD"
            return str.replace(/\w+/g, function(w){return w[0].toUpperCase() + w.slice(1).toLowerCase();});
        }        

        const addRankData = () => {
            for(let i = 0; i < 6; i++){
                root.rank[i] = {
                    class:"_description_rank_container",
                    name:{
                        class:"_description_rank_name "+ranks[i].toUpperCase()+"_RANK",
                        text:ranks[i].toUpperCase()
                    },
                    value:{
                        class:"_description_rank_value",
                        text:"  "+(i==0?"Above ":(data.overall_rank_thresholds[ranks[i-1]]+0.1).toFixed(1)+" to ")+data.overall_rank_thresholds[ranks[i]].toFixed(1)
                    },
                }
                
            }
        }

        const addSubData = () => {
            root.substat["title"] = {class:"_description_category_title", text:"Sub Stat Weights"}
            root.substat["_label"] = {
                class:"_description_substat_label _description_substat_container",
                name:{
                    class:"_description_substat_name",
                    text:"Name"
                },
                value:{
                    class:"_description_substat_value",
                    text:"Weight"
                },
            }
            let i = 0;
            for(let stat in data.substat){
                root.substat["substat_"+i] = {
                    class:"_description_substat_container",
                    name:{ class:"_description_substat_name", text:camalize(stat) },
                    value:{ class:"_description_substat_value", text:data.substat[stat] },
                }
                i++;
            }
        }

        const addMainData = () => {
            root.mainstat["title"] = {class:"_description_category_title", text:"Main Stat Weights"}
            root.mainstat["_label"] = {
                class:"_description_mainstat_label",
                relic_type:{ class:"_description_mainstat_type", text:"Type" },
                name:{ class:"_description_mainstat_name", text: "Name" },
                weight:{ class:"_description_mainstat_name", text: "Weight" },
            }
            root.mainstat.content = {class:"_description_mainstat_content"}
            for(let i = 0; i < 6; i++){
                // if(root.mainstat.)/
                root.mainstat.content[i] = {class:"_description_mainstat_container"}
                root.mainstat.content[i]["type_"+i]={class:"_description_mainstat_type", text: relic_names[i]}
                root.mainstat.content[i]["stat_attr"] = {class:"_description_mainstat_attr"};
                let j = 0;
                for(let stat in data.mainstat[i]){
                    root.mainstat.content[i]["stat_attr"]["name_"+j] = {class:"_description_mainstat_name", text: camalize(stat)}
                    root.mainstat.content[i]["stat_attr"]["value_"+j] = {class:"_description_mainstat_value", text: Math.round(data.mainstat[i][stat])};
                    j++;
                }
            } 
        }

        const addSetData = () => {
            for(let i = 0; i < setData.count; i++){
                root.set[i] = {
                    class:"_description_set_container",
                    piece:{
                        class:"_description_set_piece",
                        text: setData[i].piece,
                    },
                    icon:{
                        class:"_description_set_icon",
                        type:"img",
                        src: "/icon/relic/"+setData[i].id+".png"
                    },
                    value:{
                        class:"_description_set_value",
                        text: setData[i].value,
                    },
                }
            }
        }

        addRankData();
        addSubData();
        addMainData();
        addSetData();

        // console.log(root);
        return root;
    }

    const reload_page = () => {
        container.innerHTML = "";
        // if(currentCharacter.name == "Ruan Mei") ranking_data = relic_ranking_data[relic_ranking_data.char[currentCharacter.name]["default"]];
        if(currentCharacter.name in relic_ranking_data.char) ranking_data = relic_ranking_data[relic_ranking_data.char[currentCharacter.name]["default"]];
        else ranking_data = relic_ranking_data[relic_ranking_data.char["Seele"]["default"]];
        html_tree["description"] = addDescription(tempData.setData, ranking_data);
        html_tree["content"] = addContent(currentCharacter, ranking_data);
        renderTree(html_tree, container, "");
        char_select_init();
    }

    const char_select_init = () => {
        let container = document.querySelector("._header_char_selection_container_dropdown");
        let selector = document.querySelector("._header_char_selection_container_title");
        let dropdown = document.querySelector("._header_char_selection_container_dropdown");
        let dropdownList = document.getElementsByClassName("char_selection_dropdown_item");

        selector.addEventListener("click", () => { container.style.display = "block"; });
        container.addEventListener("mouseleave", () => { container.style.display = "none"; });
        for(let i = 0; i < dropdownList.length; i++){
            dropdownList[i].addEventListener("click", (e) => {
                console.log(dropdownList[i].className.split("___char_")[1].split(" char_selection_dropdown_")[0], profile.characters);
                currentCharacter = profile.characters[dropdownList[i].className.split("___char_")[1].split(" char_selection_dropdown_")[0]];
                reload_page();
            })
        }
    }



    let tempData = {
        rankData: {
            0:{
                name:"S",
                value:300
            },
            1:{
                name:"A",
                value:250
            },
            2:{
                name:"B",
                value:200
            },
            3:{
                name:"C",
                value:150
            },
            4:{
                name:"D",
                value:100
            },
            5:{
                name:"F",
                value:50
            },
        },
        subData: {
            count:4,
            0:{
                name:"Atk%",
                value:0.7
            },
            1:{
                name:"Break Effect",
                value:0.3
            },
            2:{
                name:"Crit Rate",
                value:1
            },
            3:{
                name:"Crit DMG",
                value:1
            },
        },
        mainData: {
            "types": {
                0: "Head",
                1: "Hand",
                2: "Body",
                3: "Feet",
                4: "Ball",
                5: "Rope"
            },
            "count": {
                0: 0,
                1: 0,
                2: 2,
                3: 2,
                4: 2,
                5: 2
            },
            "Head": {},
            "Hand": {},
            "Body": {
                0: {
                    "name": "Atk%",
                    "value": 33
                },
                1: {
                    "name": "Crit",
                    "value": 50
                }
            },
            "Feet": {
                0: {
                    "name": "Atk%",
                    "value": 50
                },
                1: {
                    "name": "SPD",
                    "value": 45
                }
            },
            "Ball": {
                0: {
                    "name": "DMG",
                    "value": 50
                },
                1: {
                    "name": "Atk%",
                    "value": 33
                }
            },
            "Rope": {
                0: {
                    "name": "Energy Regen",
                    "value": 20
                },
                1: {
                    "name": "Atk%",
                    "value": 50
                }
            }
        },
        setData: {
            "count":10,
            0:{
                "name":"Passerby of Wandering Cloud 2pc",
                "id":101,
                piece:2,
                "value": 7,
            },
            1:{
                "name":"Passerby of Wandering Cloud 4pc",
                piece:4,
                "id":101,
                "value": 9,
            },
            2:{
                "name":"Passerby of Wandering Cloud 2pc",
                piece:4,
                "id":101,
                "value": 7,
            },
            3:{
                "name":"Passerby of Wandering Cloud 4pc",
                piece:4,
                "id":101,
                "value": 9,
            },
            4:{
                "name":"Passerby of Wandering Cloud 2pc",
                piece:4,
                "id":101,
                "value": 7,
            },
            5:{
                "name":"Passerby of Wandering Cloud 4pc",
                piece:4,
                "id":101,
                "value": 9,
            },
            6:{
                "name":"Passerby of Wandering Cloud 2pc",
                piece:4,
                "id":101,
                "value": 7,
            },
            7:{
                "name":"Passerby of Wandering Cloud 4pc",
                piece:4,
                "id":101,
                "value": 9,
            },
            8:{
                "name":"Passerby of Wandering Cloud 2pc",
                "id":101,
                piece:4,
                "value": 7,
            },
            9:{
                "name":"Passerby of Wandering Cloud 4pc",
                piece:4,
                "id":101,
                "value": 9,
            },
        }
    }

    addHeader();

    reload_page();
}

// console.log(document.getElementById("content_body"));
relic_ranking_html_load(document.getElementById("content_container"), profile);
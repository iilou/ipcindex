const profile = JSON.parse(localStorage.getItem("current_hsr_profile"));
console.log(profile);

let currentCharacter = "none";

const relic_ranking_html_load = (container, profile) => {
    let html_tree = {
        header: {
            profile:{},
            char:{}
        },

        description:{
            max:{},
            rank:{},
            substat:{},
            mainstat:{},
            set:{},
        },

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
        let dropdown = {};
        for(let i = 0; i < 4; i++){ // add player characters to dropdown list
            if(char_list[i] == undefined) continue;

            dropdown[char_count] = {
                class:"char_selection_dropdown_item",
                text:char_list[i]["name"]
            }
            char_count++;
        }

        dropdown[0]["class"] += " char_selection_dropdown_first";
        dropdown[char_count-1]["class"] += " char_selection_dropdown_last";

        html_tree.header.char.selection_container.dropdown = dropdown;
    }

    const addContent = (character) => {
        const calc_relic_value = (relic) => {
            return 300;
        }

        let content_tree = {
            overview:{},
            relic_0:{},
            relic_1:{},
            relic_2:{},
            relic_3:{},
            relic_4:{},
            relic_5:{},
            relic_set:{}
        }

        let relicData = Array(6).fill("none");

        for(let i = 0; i < 6; i++){
            if(character["relics"][i] == undefined) continue;
            relicData[character["relics"][i]["id"]%10-1] = character["relics"][i];
        }

        for(let i = 0; i < 6; i++){
            content_tree["relic_"+i] = {
                class:"_content_relic_container",
                icon:{
                    class:"_content_relic_icon",
                    type:"img",
                    src:relicData[i].icon
                },
                table:{
                    class:"_content_relic_table",
                }
            }

            let labels = ["Name", "Value", "W", "N", "Nr", "P"];
            for(let j = 0; j < 6; j++){
                content_tree["relic_"+i]["table"]["label_"+j] = {
                    class:"_content_relic_label",
                    text:labels[j]
                }
            }
            if(relicData[i] == "none"){
                for(let j = 0; j < 6*5; j++){
                    content_tree["relic_"+i]["table"]["value_"+j] = {
                        class:"_content_relic_value",
                        text:"-"
                    }
                }
            }else{
                // main main_v main_w main_n_1 main_nw_1 main_p_1
                content_tree["relic_"+i]["table"]["main"] = {
                    class:"_content_relic_value",
                    text:relicData[i]["main_affix"].name,
                }
                content_tree["relic_"+i]["table"]["main_v"] = {
                    class:"_content_relic_value",
                    text:relicData[i]["main_affix"].value.toFixed(2),
                }
                content_tree["relic_"+i]["table"]["main_w"] = {
                    class:"_content_relic_value",
                    text:10,
                }
                content_tree["relic_"+i]["table"]["main_n"] = {
                    class:"_content_relic_value",
                    text:10,
                }
                content_tree["relic_"+i]["table"]["main_nw"] = {
                    class:"_content_relic_value",
                    text:10,
                }
                content_tree["relic_"+i]["table"]["main_p"] = {
                    class:"_content_relic_value",
                    text:"10p",
                }
                for(let j = 0; j < 4; j++){
                    let has = j in relicData[i]["sub_affix"];
                    content_tree["relic_"+i]["table"]["sub_"+j] = {
                        class:"_content_relic_value",
                        text:has?relicData[i]["sub_affix"][j].name:"-",     
                    }
                    content_tree["relic_"+i]["table"]["sub_"+j+"v"] = {
                        class:"_content_relic_value",
                        text:has?relicData[i]["sub_affix"][j].value.toFixed(2):"-",
                    }
                    content_tree["relic_"+i]["table"]["sub_"+j+"w"] = {
                        class:"_content_relic_value",
                        text:10,
                    }
                    content_tree["relic_"+i]["table"]["sub_"+j+"n"] = {
                        class:"_content_relic_value",
                        text:10,
                    }
                    content_tree["relic_"+i]["table"]["sub_"+j+"nw"] = {
                        class:"_content_relic_value",
                        text:10,
                    }
                    content_tree["relic_"+i]["table"]["sub_"+j+"p"] = {
                        class:"_content_relic_value",
                        text:"10p",
                    }
                }
            }

            content_tree["relic_"+i]["table"]["label_5"].class += " top_right_ajsfiodj";
            content_tree["relic_"+i]["table"]["sub_3p"].class += " bottom_right_ajsfiodj";
        }



        return content_tree;
    }

    const addDescription = (root, rankData, subData, mainData, setData) => {
        console.log(rankData)

        const addRankData = () => {
            for(let i = 0; i < 6; i++){
                root.rank[i] = {
                    class:"_description_rank_container",
                    name:{
                        class:"_description_rank_name "+rankData[i].name+"_RANK",
                        text:rankData[i].name
                    },
                    value:{
                        class:"_description_rank_value",
                        text:"> "+rankData[i].value
                    },
                }
            }
        }

        const addSubData = () => {
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
            for(let i = 0; i < subData.count; i++){
                root.substat["substat_"+i] = {
                    class:"_description_substat_container",
                    name:{
                        class:"_description_substat_name",
                        text:subData[i].name
                    },
                    value:{
                        class:"_description_substat_value",
                        text:subData[i].value
                    },
                }
            }
        }

        const addMainData = () => {
            let types = mainData.types;
            for(let i = 0; i < 6; i++){
                if(mainData.count[i] == 0) continue;

                root.mainstat[types[i]] = {
                    class:"_description_mainstat_container",
                    title:{
                        class:"_description_mainstat_title",
                        text:types[i]
                    },
                    list:{class:"_description_mainstat_list"}
                }

                for(let j = 0; j < mainData.count[i]; j++){
                    root.mainstat[types[i]].list[j+"_name"] = {
                        class:"_description_mainstat_name",
                        text:mainData[types[i]][j].name
                    }
                    root.mainstat[types[i]].list[j+"_value"] = {
                        class:"_description_mainstat_value",
                        text:mainData[types[i]][j].value
                    }
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

        console.log(root);
        return root;
    }

    const char_select_init = () => {
        let container = document.querySelector("._header_char_selection_container_dropdown");
        let selector = document.querySelector("._header_char_selection_container_title");
        let dropdown = document.querySelector("._header_char_selection_container_dropdown");
        let dropdownList = document.getElementsByClassName("char_selection_dropdown_item");
        console.log(dropdownList);

        selector.addEventListener("click", () => { container.style.display = "block"; });
        document.addEventListener("click", (e) => { 
            for(let i = 0; i < dropdownList.length; i++) if(e.target == dropdownList[i]){
                currentCharacter = profile.characters[i];
                alert(currentCharacter.name);
            } 
            if(e.target != selector) container.style.display = "none";
        });
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
    html_tree["description"] = addDescription(html_tree.description, tempData.rankData, tempData.subData, tempData.mainData, tempData.setData);

    currentCharacter = profile["characters"][0];
    html_tree["content"] = addContent(currentCharacter);


    renderTree(html_tree, container, "");

    char_select_init();
}

// console.log(document.getElementById("content_body"));
relic_ranking_html_load(document.getElementById("content_container"), profile);
const relic_ranking_data = {
    "generic_crit_carry":{
        "substat":{
            "crit rate": 1,
            "crit dmg": 1,
            "atk%": 0.7,
            "break effect%": 0.2,
            "atk": 0.2,
            "spd": 0.7
        },
        "mainstat":{
            "0":{
                "hp":5,
            },
            "1":{
                "atk":5
            },
            "2":{
                "crit dmg":5,
                "crit rate":5,
                "atk%":3
            },
            "3":{
                "atk%":5,
                "spd":5
            },
            "4":{
                "dmg%":5,
                "atk%":4
            },
            "5":{
                "atk%":5,
                "energy regen":2,
                "break effect":1
            }
        },
        "relic_rank_thresholds":{
            s:{0:7,     1:7,        2:6,        3:6,        4:6,        5:6,},
            a:{0:6,     1:6,        2:5,        3:5.6,      4:5,        5:5,},
            b:{0:5.5,   1:5.5,      2:4,        3:4.6,      4:4.6,      5:4.6},
            c:{0:5,     1:5,        2:2.6,      3:4,        4:3.6,      5:4},
            d:{0:3,     1:3,        2:2,        3:2,        4:2,        5:2}
        }
    },
    "ruan_mei":{
        "substat":{
            "spd":1,
            "break effect%":1
        },
        "mainstat":{
            0:{"any":5},
            1:{"any":5},
            2:{"any":5},
            3:{"spd":5},
            4:{"any":5},
            5:{"energy regen%":5, "break effect%":4}
        },
        "relic_rank_thresholds":{
            s:{0:6,     1:6,        2:6,        3:5,        4:6,        5:5,},
            a:{0:5,     1:5,        2:5,        3:4,        4:5,        5:4,},
            b:{0:4,     1:4,        2:4,        3:3.5,      4:4,        5:3},
            c:{0:3.5,   1:3.5,      2:3.5,      3:3,        4:3.5,      5:2},
            d:{0:3,     1:3,        2:3,        3:2.5,      4:3,        5:1.5}
        }
    },
    "silver_wolf":{
        "substat":{
            "spd":1,
            "effect hit rate":1
        },
        "mainstat":{
            0:{"any":5},
            1:{"any":5},
            2:{"any":5},
            3:{"spd":5},
            4:{"any":5},
            5:{"energy regen%":5, "break effect%":2}
        },
        "relic_rank_thresholds":{
            s:{0:6,     1:6,        2:5,        3:5,        4:6,        5:5,},
            a:{0:5,     1:5,        2:4,        3:4,        4:5,        5:4,},
            b:{0:4,     1:4,        2:3,        3:3.5,      4:4,        5:3},
            c:{0:3.5,   1:3.5,      2:2.5,      3:3,        4:3.5,      5:2},
            d:{0:3,     1:3,        2:2,        3:2.5,      4:3,        5:1.5}
        }
    },
    "kafka":{
        "substat":{
            "spd":1,
            "atk%":1,
            "atk":0.3,
            "break effect":0.4,
            "effect hit rate":0.5,
            "crit rate": 0.2,
            "crit dmg": 0.2
        },
        "mainstat":{
            0:{"any":5},
            1:{"any":5},
            2:{"atk%":5, "crit rate": 2, "crit dmg": 2},
            3:{"spd":5, "atk%": 4.7},
            4:{"atk%":4, "dmg%": 5},
            5:{"energy regen%":2, "break effect%":2, "atk%":5}
        },
        "relic_rank_thresholds":{
            "s":{0:7,1:7,2:7,3:5,4:6,5:4},
            "a":{0:6,1:6,2:6,3:4,4:5,5:3},
            "b":{0:5,1:5,2:5,3:3,4:4,5:2},
            "c":{0:4,1:4,2:4,3:2,4:3,5:1},
            "d":{0:3,1:3,2:3,3:1,4:2,5:0},
        }
    },
    "bronya":{
        "substat":{
            "spd":1,
            "crit dmg":1
        },
        "mainstat":{
            0:{"any":5},
            1:{"any":5},
            2:{"crit dmg":5},
            3:{"spd":5},
            4:{"any":5},
            5:{"energy regen%":5}
        },
        "relic_rank_thresholds":{
            s:{0:6,     1:6,        2:5,        3:5,        4:6,        5:5,},
            a:{0:5,     1:5,        2:4,        3:4,        4:5,        5:4,},
            b:{0:4,     1:4,        2:3,        3:3.5,      4:4,        5:3},
            c:{0:3.5,   1:3.5,      2:2.5,      3:3,        4:3.5,      5:2},
            d:{0:3,     1:3,        2:2,        3:2.5,      4:3,        5:1.5}
        }
    },



    "substat":{
        spd: 2.6,
        hp: 42.33751,
        atk: 21.168754,
        def: 21.168754,
        "hp%": 4.32,
        "atk%": 4.32,
        "def%": 5.4,
        "break effect%": 6.48,
        "effect hit rate": 4.32,
        "effect res": 4.32,
        "crit rate": 3.24,
        "crit dmg": 6.48,
        lowRollFactor:0.89,
        mainStatAddition:5
    },



    "char":{
        "Seele":{
            default:"generic_crit_carry",
        },
        "Ruan Mei":{default:"ruan_mei"},
        "Silver Wolf":{default:"silver_wolf"},
        "Dan Heng • Imbibitor Lunae":{default: "generic_crit_carry"},
        "Sparkle":{default: "bronya"},
        "Bronya":{default: "bronya"},
        "Dan Heng • Imbibitor Lunae":{default: "generic_crit_carry"},
        "Dan Heng • Imbibitor Lunae":{default: "generic_crit_carry"}
    }
}

const ranks = { 0:"s",1:"a",2:"b",3:"c",4:"d",5:"f" }
const relic_names = { 0:"Head", 1:"Hand", 2:"Body", 3:"Feet", 4:"Ball", 5:"Rope"}

function tempfunc(temp="generic_crit_carry"){
    relic_ranking_data[temp]["overall_rank_thresholds"] = {};
    for(let i = 0; i < 5; i++){ // for each rank
        relic_ranking_data[temp].overall_rank_thresholds[ranks[i]] = 0;
        for(let j = 0; j < 6; j++){ // for each relic add individual relic rank threshold eg c rank -> eveyr relic c rank
            relic_ranking_data[temp].relic_rank_thresholds[ranks[i]][j] = relic_ranking_data[temp].relic_rank_thresholds[ranks[i]][j] * relic_ranking_data.substat.lowRollFactor + relic_ranking_data.substat.mainStatAddition;
            relic_ranking_data[temp].overall_rank_thresholds[ranks[i]] += relic_ranking_data[temp].relic_rank_thresholds[ranks[i]][j]
        }
    }
    relic_ranking_data[temp]["overall_rank_thresholds"]["f"] = 0;
}
tempfunc();
tempfunc("ruan_mei");
tempfunc("silver_wolf");
tempfunc("bronya");
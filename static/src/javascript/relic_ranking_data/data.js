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
                "spd":4
            },
            "4":{
                "dmg%":5,
                "atk%":4
            },
            "5":{
                "atk%":5,
                "energy regen":1,
                "break effect":1
            }
        },
        "relic_rank_thresholds":{
            s:{
                0:7,
                1:7,
                2:6,
                3:6,
                4:6,
                5:6,
                //rearrange hiehgarchy shit so relic type -> rank for more generic function ot use for happy 
            },
            a:{
                0:6,
                1:6,
                2:5,
                3:5.6,
                4:5,
                5:5,
            },
            b:{
                0:5.5,
                1:5.5,
                2:4,
                3:4.6,
                4:4.6,
                5:4.6
            },
            c:{
                0:5,
                1:5,
                2:2.6,
                3:4,
                4:3.6,
                5:4
            },
            d:{
                0:3,
                1:3,
                2:2,
                3:2,
                4:2,
                5:2
            }
        },
        "overall_rank_thresholds":{
            "f":0
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
            5:{"energy regen%":5, "break effect%":2}
        },
        "relic_rank_thresholds":{
            "s":{0:7,1:7,2:7,3:5,4:6,5:4},
            "a":{0:6,1:6,2:6,3:4,4:5,5:3},
            "b":{0:5,1:5,2:5,3:3,4:4,5:2},
            "c":{0:4,1:4,2:4,3:2,4:3,5:1},
            "d":{0:3,1:3,2:3,3:1,4:2,5:0},
        },
        "overall_rank_thresholds":{"f":0}
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
        lowRollFactor:0.85,
        mainStatAddition:5
    },
    "char":{
        "Seele":{
            default:"generic_crit_carry",
        },
        "Ruan Mei":{default:"ruan_mei"}
    }
}

const ranks = { 0:"s",1:"a",2:"b",3:"c",4:"d",5:"f" }
const relic_names = { 0:"Head", 1:"Hand", 2:"Body", 3:"Feet", 4:"Ball", 5:"Rope"}

function tempfunc(temp="generic_crit_carry"){
    for(let i = 0; i < 5; i++){ // for each rank
        relic_ranking_data[temp].overall_rank_thresholds[ranks[i]] = 0;
        for(let j = 0; j < 6; j++){ // for each relic add individual relic rank threshold eg c rank -> eveyr relic c rank
            relic_ranking_data[temp].relic_rank_thresholds[ranks[i]][j] = relic_ranking_data[temp].relic_rank_thresholds[ranks[i]][j] * relic_ranking_data.substat.lowRollFactor + relic_ranking_data.substat.mainStatAddition;
            relic_ranking_data[temp].overall_rank_thresholds[ranks[i]] += relic_ranking_data[temp].relic_rank_thresholds[ranks[i]][j]
        }
    }
}
tempfunc();
tempfunc("ruan_mei");
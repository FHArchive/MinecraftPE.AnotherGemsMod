/*
data/armor.js holds data on armor in the mod
*/

const ARMOR = ["helm", "chest", "leggings", "boots"]
const ARMOR_LEN = ARMOR.length
const ARMOR_RECIPES = {
    helm : [
        "xxx",
        "x x"
    ],
    chest: [
        "x x",
        "xxx",
        "xxx"
    ],
    leggings: [
        "xxx",
        "x x",
        "x x"
    ],
    boots:[
        "x x",
        "x x"
    ]
}

const ARMOR_MAX_DAM_RED = {
    helm: 11,
    chest: 16,
    leggings: 15,
    boots: 13
}
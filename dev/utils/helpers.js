function capFirstLetter(name){
    return name.charAt(0).toUpperCase() + name.slice(1);
}

function createIDName(rootItem, type){
    return type + capFirstLetter(rootItem);
}

function createNameReadable(rootItem, type){
    return capFirstLetter(rootItem) + " " + capFirstLetter(type);

}

function createTexName(rootItem, type){
    return rootItem + "_" + type;
}

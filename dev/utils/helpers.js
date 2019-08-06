function capFirstLetter(name){
    return name.charAt(0).toUpperCase() + name.slice(1);
}

function createBlockIDName(rootItem, type){
    return type + capFirstLetter(rootItem);
}

function createNameReadable(rootItem, type){
    return capFirstLetter(rootItem) + " " + capFirstLetter(type);

}

function createBlockTexName(rootItem, type){
    return rootItem + "_" + type;
}

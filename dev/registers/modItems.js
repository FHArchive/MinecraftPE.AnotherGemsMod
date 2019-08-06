/*
registers/modItems.js generate the item forms of the gems: tools and armor 
*/

var ToolProperties = {
    aquamarine: {
        durability: 700, level: 3, efficiency: 7, damage: 2.5, enchantability: 10   
	},
	galaxite: {
		durability: 400, level: 2, efficiency: 5, damage: 2, enchantability: 8
	},
	lonsdaleite: {
		durability: 2000, level: 4, efficiency: 15, damage: 4, enchantability: 22
	},
	zircon: {
		durability: 100, level: 2, efficiency: 3, damage: 1.5, enchantability: 4
	},
	zirconia: {
		durability: 1000, level: 3, efficiency: 10, damage: 3, enchantability: 15
	}
};

var ArmorProperties = {
    aquamarine: {
        durability: 23,
        helm: { armor : 2, texture: "armor/aquamarine_layer_1.png"}, 
        chest: {armor : 6, texture: "armor/aquamarine_layer_1.png"}, 
        leggings: {armor : 5, texture: "armor/aquamarine_layer_2.png"}, 
        boots: {armor : 2, texture: "armor/aquamarine_layer_1.png"}},
    galaxite: {
        durability: 19,
        helm: { armor : 3, texture: "armor/galaxite_layer_1.png"}, 
        chest: {armor : 7, texture: "armor/galaxite_layer_1.png"}, 
        leggings: {armor : 5, texture: "armor/galaxite_layer_2.png"}, 
        boots: {armor : 2, texture: "armor/galaxite_layer_1.png"}},
    lonsdaleite: {
        durability: 36,
        helm: { armor : 4, texture: "armor/lonsdaleite_layer_1.png"}, 
        chest: {armor : 9, texture: "armor/lonsdaleite_layer_1.png"}, 
        leggings: {armor : 7, texture: "armor/lonsdaleite_layer_2.png"}, 
        boots: {armor : 4, texture: "armor/lonsdaleite_layer_1.png"}},
    zircon: {
        durability: 15,
        helm: { armor : 2, texture: "armor/zircon_layer_1.png"}, 
        chest: {armor : 6, texture: "armor/zircon_layer_1.png"}, 
        leggings: {armor : 5, texture: "armor/zircon_layer_2.png"}, 
        boots: {armor : 2, texture: "armor/zircon_layer_1.png"}},
    zirconia: {
        durability: 28,
        helm: { armor : 3, texture: "armor/zirconia_layer_1.png"}, 
        chest: {armor : 8, texture: "armor/zirconia_layer_1.png"}, 
        leggings: {armor : 6, texture: "armor/zirconia_layer_2.png"}, 
        boots: {armor : 3, texture: "armor/zirconia_layer_1.png"}}
};

for (var index = 0; index < GEMS_LEN; index++){
    var gem = GEMS[index];

    // Gem item
    IDRegistry.genItemID(gem);
    Item.createItem(gem, capFirstLetter(gem), {name: gem});




    // Tools 

    ToolAPI.addToolMaterial(gem, {durability: ToolProperties[gem].durability, level: ToolProperties[gem].level, efficiency: ToolProperties[gem].efficiency, damage: ToolProperties[gem].damage, enchantability: ToolProperties[gem].enchantability});

    for (var toolIndex = 0; toolIndex < TOOLS_LEN; toolIndex++){
        var tType = TOOLS[toolIndex];
        var TOOL_ID_NAME = createIDName(gem, tType);

        // Create the tool item 
        IDRegistry.genItemID(TOOL_ID_NAME);
        Item.createItem(TOOL_ID_NAME, createNameReadable(gem, tType), {name: createTexName(gem, tType), meta: 0}, {stack: 1});
        ToolAPI.setTool(ItemID[TOOL_ID_NAME], gem, ToolType[tType]);

        
        
    }

    
    
    // Armor 

    for (var armorIndex = 0; armorIndex < ARMOR_LEN; armorIndex++){
        var aType = ARMOR[armorIndex];
        var armorType = aType;
        // For compatibility with my naming conventions 
        if (aType === "helm"){
            armorType = "helmet";
        }
        if (aType === "chest"){
            armorType = "chestplate";
        }

        var ARMOR_ID_NAME = createIDName(gem, aType);

        // Create the armor item 
        IDRegistry.genItemID(ARMOR_ID_NAME);
        Item.createArmorItem(ARMOR_ID_NAME, createNameReadable(gem, aType), {name: createTexName(gem, aType)}, {type: armorType, armor: ArmorProperties[gem][aType].armor, durability: ArmorProperties[gem].durability * ARMOR_MAX_DAM_RED[aType], texture: ArmorProperties[gem][aType].texture});

        

    }
}

// Callback preloaded
Callback.addCallback("PreLoaded", function(){
    
    for (var index = 0; index < GEMS_LEN; index++){
        var gem = GEMS[index];

        // Furnace from ore
        Recipes.addFurnace(BlockID[createIDName(gem, "ore")], ItemID[gem], 0);

        // Item
        Recipes.addShapeless({id: ItemID[gem], count: 9}, [{id: BlockID[createIDName(gem, "block")]}]);

        // Tools
        for (var toolIndex = 0; toolIndex < TOOLS_LEN; toolIndex++){
            var tcType = TOOLS[toolIndex];
            // Create the recipe for the tool 
            Recipes.addShaped({id: ItemID[createIDName(gem, tcType)], count: 1, data: 0}, TOOLS_RECIPES[tcType], ["a", ItemID[gem], 0, "b", 280, 0]);
        }

        // Armor 
        for (var armorIndex = 0; armorIndex < ARMOR_LEN; armorIndex++){
            var acType = ARMOR[armorIndex];
            // Create the recipe for the armor 
            Recipes.addShaped({id: ItemID[createIDName(gem, acType)], count: 1, data: 0}, ARMOR_RECIPES[acType], ["x", ItemID[gem], 0]);

        }
    }
});


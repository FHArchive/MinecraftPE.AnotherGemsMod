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
    var gem = GEMS[index]

    // Gem item
    IDRegistry.genItemID(gem);
    Item.createItem(gem, capFirstLetter(gem), {name: gem});




    // Tools 

    ToolAPI.addToolMaterial(gem, {durability: ToolProperties[gem].durability, level: ToolProperties[gem].level, efficiency: ToolProperties[gem].efficiency, damage: ToolProperties[gem].damage, enchantability: ToolProperties[gem].enchantability});

    for (var tool_index = 0; tool_index < TOOLS_LEN; tool_index++){
        var type = TOOLS[tool_index];
        var ITEM_ID_NAME = createIDName(gem, type);

        // Create the tool item 
        IDRegistry.genItemID(ITEM_ID_NAME);
        Item.createItem(ITEM_ID_NAME, createNameReadable(gem, type), {name: createTexName(gem, type), meta: 0}, {stack: 1});
        ToolAPI.setTool(ItemID[ITEM_ID_NAME], gem, ToolType[type]);

        
        
    }

    
    
    // Armor 

    for (var armor_index = 0; armor_index < ARMOR_LEN; armor_index++){
        var type = ARMOR[armor_index];
        var armorType = type;
        // For compatibility with my naming conventions 
        if (type === "helm"){
            armorType = "helmet";
        }
        if (type === "chest"){
            armorType = "chestplate";
        }

        var ITEM_ID_NAME = createIDName(gem, type);

        // Create the armor item 
        IDRegistry.genItemID(ITEM_ID_NAME);
        Item.createArmorItem(ITEM_ID_NAME, createNameReadable(gem, type), {name: createTexName(gem, type)}, {type: armorType, armor: ArmorProperties[gem][type].armor, durability: ArmorProperties[gem].durability * ARMOR_MAX_DAM_RED[type], texture: ArmorProperties[gem][type].texture});

        

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
            var type = TOOLS[toolIndex]
            // Create the recipe for the tool 
            Recipes.addShaped({id: ItemID[createIDName(gem, type)], count: 1, data: 0}, TOOLS_RECIPES[type], ["a", ItemID[gem], 0, "b", 280, 0]);
        }

        // Armor 
        for (var armorIndex = 0; armorIndex < ARMOR_LEN; armorIndex++){
            var type = ARMOR[armorIndex]
            // Create the recipe for the armor 
            Recipes.addShaped({id: ItemID[createIDName(gem, type)], count: 1, data: 0}, ARMOR_RECIPES[type], ["x", ItemID[gem], 0]);

        }
    }
})


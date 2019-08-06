/*
registers/worldGen.js generate the ore forms of the gems: ore 
*/

var OreGenerator = {
	aquamarine: {
		enabled: true,
		count: 15,
		size: 10,
		minHeight: 0,
        maxHeight: 68
	},
	galaxite: {
		enabled: true,
		count: 15,
		size: 10,
		minHeight: 0,
        maxHeight: 68
	},
	lonsdaleite: {
		enabled: true,
		count: 15,
		size: 10,
		minHeight: 0,
        maxHeight: 68
	},
	zircon: {
		enabled: true,
		count: 15,
		size: 10,
		minHeight: 0,
        maxHeight: 68
	},
	zirconia: {
		enabled: true,
		count: 15,
		size: 10,
		minHeight: 0,
        maxHeight: 68
	},
	
	
}


for (var index = 0; index < GEMS_LEN; index++){
    var gem = GEMS[index]
    // Generate ore
    var BLOCK_ID_NAME = createBlockIDName(gem, "ore")
    IDRegistry.genBlockID(BLOCK_ID_NAME);
    Block.createBlock(BLOCK_ID_NAME, [
        {name: createNameReadable(gem, "ore"), texture: [[createBlockTexName(gem, "ore"), 0]], inCreative: true}
    ], "opaque");
    ToolAPI.registerBlockMaterial(BlockID[BLOCK_ID_NAME], "stone", 2);
    Block.setDestroyTime(BlockID[BLOCK_ID_NAME], 3);
	Block.setDestroyLevel(BLOCK_ID_NAME, 2);
	Block.registerDropFunction(BLOCK_ID_NAME, function(coords, blockID, blockData, level, enchant){
		if(level > 3){
			if(enchant.silk){
				return [[blockID, 1, 0]];
			}
			var drop = [[ItemID.gem, 1, 0]];
			if(Math.random() < enchant.fortune/3 - 1/3){drop.push(drop[0]);}
			ToolAPI.dropOreExp(coords, 12, 28, enchant.experience);
			return drop;
		}
		return [];
	}, 4);

}

Callback.addCallback("PostLoaded", function(){
    for (var index = 0; index < GEMS_LEN; index++){
        var gem = GEMS[index]
        var BLOCK_ID_NAME = createBlockIDName(gem, "ore")
        if(OreGenerator[gem].enabled){
            Callback.addCallback("GenerateChunkUnderground", function(chunkX, chunkZ){
                for(var i = 0; i < OreGenerator[gem].count; i++){
                    var coords = GenerationUtils.randomCoords(chunkX, chunkZ, OreGenerator[gem].minHeight, OreGenerator[gem].maxHeight);
                    GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID[BLOCK_ID_NAME], 0, OreGenerator[gem].size);
                }
            });
        }
    }
})
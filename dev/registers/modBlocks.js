/*
registers/modBlock.js generate the block forms of the gems: block and bricks 
*/

for (var index = 0; index < GEMS_LEN; index++){
    var gem = GEMS[index];
    
   
    /*
    Generate block and bricks

    They have the same properties so for each gem, for each type (block, bricks)
    generate a block for that gem of said type and register it 

    */
    var TYPES = ["block", "bricks"];
    var TYPES_LEN = TYPES.length;
    for (var typeIndex = 0; typeIndex < TYPES_LEN; typeIndex++){
        var TYPE = TYPES[typeIndex]
        var BLOCK_ID_NAME = createIDName(gem, TYPE);
        IDRegistry.genBlockID(BLOCK_ID_NAME);
        Block.createBlock(BLOCK_ID_NAME, [
            {name: createNameReadable(gem, TYPE), texture: [[createTexName(gem, TYPE), 0]], inCreative: true}
        ], "opaque");
        ToolAPI.registerBlockMaterial(BlockID[BLOCK_ID_NAME], "stone", 2);
        Block.setDestroyTime(BlockID[BLOCK_ID_NAME], 3);
        Block.setDestroyLevel(BLOCK_ID_NAME, 2);
    }

}

// Recipes 
Callback.addCallback("PreLoaded", function(){
    for (var index = 0; index < GEMS_LEN; index++){
        var gem = GEMS[index];
        // Block
        Recipes.addShaped({id: BlockID[createIDName(gem, "block")], count: 1, data: 0}, ["xxx", "xxx", "xxx"], ["x", ItemID[gem], 0]);

        // Bricks
        Recipes.addShaped({id: BlockID[createIDName(gem, "bricks")], count: 1, data: 0}, ["xx", "xx"], ["x", BlockID[createIDName(gem, "block")], 0]);

        
    }
});
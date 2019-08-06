/*
registers/modBlock.js generate the block forms of the gems: block and bricks 
*/

for (var index = 0; index < GEMS_LEN; index++){
    var gem = GEMS[index]
    
    // Generate block
    var BLOCK_ID_NAME = createIDName(gem, "block")
    IDRegistry.genBlockID(BLOCK_ID_NAME);
    Block.createBlock(BLOCK_ID_NAME, [
        {name: createNameReadable(gem, "block"), texture: [[createTexName(gem, "block"), 0]], inCreative: true}
    ], "opaque");
    ToolAPI.registerBlockMaterial(BlockID[BLOCK_ID_NAME], "stone", 2);
    Block.setDestroyTime(BlockID[BLOCK_ID_NAME], 3);
    Block.setDestroyLevel(BLOCK_ID_NAME, 2);
    

    // Generate bricks 
    var BLOCK_ID_NAME = createIDName(gem, "bricks")
    IDRegistry.genBlockID(BLOCK_ID_NAME);
    Block.createBlock(BLOCK_ID_NAME, [
        {name: createNameReadable(gem, "bricks"), texture: [[createTexName(gem, "bricks"), 0]], inCreative: true}
    ], "opaque");
    ToolAPI.registerBlockMaterial(BlockID[BLOCK_ID_NAME], "stone", 2);
    Block.setDestroyTime(BlockID[BLOCK_ID_NAME], 3);
    Block.setDestroyLevel(BLOCK_ID_NAME, 2);
    

}

// Recipes 
Callback.addCallback("PreLoaded", function(){
    for (var index = 0; index < GEMS_LEN; index++){
        var gem = GEMS[index]
        // Block
        Recipes.addShaped({id: BlockID[createIDName(gem, "block")], count: 1, data: 0}, ["xxx", "xxx", "xxx"], ["x", ItemID[gem], 0]);

        // Bricks
        Recipes.addShaped({id: BlockID[createIDName(gem, "bricks")], count: 1, data: 0}, ["xx", "xx"], ["x", BlockID[createIDName(gem, "block")], 0]);

        
    }
})
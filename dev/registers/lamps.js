Block.createSpecialType({
	solid: true,
	destroytime: 2,
	explosionres: 5,
	lightlevel: 15,
	renderlayer: 3
}, "lamp");

IDRegistry.genBlockID("agmLamp");
Block.createBlock("agmLamp", [
	{name: "Aquamarine Lamp", texture: [["aquamarine_lamp", 0]], inCreative: true},
	{name: "Galaxite Lamp", texture: [["galaxite_lamp", 0]], inCreative: true},
	{name: "Lonsdaleite Lamp", texture: [["lonsdaleite_lamp", 0]], inCreative: true},
	{name: "Zircon Lamp", texture: [["zircon_lamp", 0]], inCreative: true},
	{name: "Zirconia Lamp", texture: [["zirconia_lamp", 0]], inCreative: true}
	
], "opaque");

IDRegistry.genBlockID("agmLampInv");
Block.createBlock("agmLampInv", [
	{name: "Aquamarine Inverted Lamp", texture: [["aquamarine_lamp_on", 0]], inCreative: true},
	{name: "Galaxite Inverted Lamp", texture: [["galaxite_lamp_on", 0]], inCreative: true},
	{name: "Lonsdaleite Inverted Lamp", texture: [["lonsdaleite_lamp_on", 0]], inCreative: true},
	{name: "Zircon Inverted Lamp", texture: [["zircon_lamp_on", 0]], inCreative: true},
	{name: "Zirconia Inverted Lamp", texture: [["zirconia_lamp_on", 0]], inCreative: true}
	
], "lamp");

Block.registerDropFunction("agmLamp", function(coords, blockID, blockData, level){
	return [];
});
Block.registerDropFunction("agmLampInv", function(coords, blockID, blockData, level){
	return [];
});


function placeFunction(coords, item, block){
	Game.prevent();
	var x = coords.relative.x;
	var y = coords.relative.y;
	var z = coords.relative.z;
	block = World.getBlockID(x, y, z);
	if(GenerationUtils.isTransparentBlock(block)){
		World.setBlock(x, y, z, item.id, item.data);
		World.addTileEntity(x, y, z);
	}

}

function swapBlock(block, targetBlock, setInverted){
	var x = block.x, y = block.y, z = block.z;
	block.selfDestroy();
	var data = World.getBlock(x, y, z).data;
	World.setBlock(x, y, z, BlockID[targetBlock], data);
	var tile = World.addTileEntity(x, y, z);
	tile.data.inverted = setInverted;
}

function destroy(block,coords){
	var data = World.getBlock(coords.x, coords.y, coords.z).data;
	if(block.data.inverted){
		World.drop(coords.x, coords.y, coords.z, BlockID.agmLampInv, 1, data);
	}else{
		World.drop(coords.x, coords.y, coords.z, BlockID.agmLamp, 1, data);
	}
}

/*
This is a helpful site for recipes including vanilla items: 
https://www.digminecraft.com/lists/item_id_list_pe.php
*/
Callback.addCallback("PreLoaded", function(){
	for(var i = 0; i < 5; i++){
        var gem = GEMS[i];
		Recipes.addShaped({id: BlockID.agmLamp, count: 1, data: i}, [
            "xxx",
            "xrx",
            "xxx"
		], ["x", ItemID[gem], 0, "r", 331, 0]);
		
		Recipes.addShaped({id: BlockID.agmLampInv, count: 1, data: i}, [
			"xxx",
            "xrx",
            "xxx"
		], ["x", ItemID[gem], 0, "r", 76, 0]);
	}
});

TileEntity.registerPrototype(BlockID.agmLamp, {
	defaultValues: {
		inverted: false
	},
	
	
	redstone: function(signal){
		if(!this.data.inverted && signal.power){
			swapBlock(this, "agmLampInv", false);
		
		}
		if(this.data.inverted && !signal.power){
			swapBlock(this, "agmLampInv", true);
			
		}	
	},

	
	destroyBlock: function(coords, player){
		destroy(this,coords);
	}
});

TileEntity.registerPrototype(BlockID.agmLampInv, {
	defaultValues: {
		inverted: true
	},
	
		
	redstone: function(signal){
		if(!this.data.inverted && !signal.power){
			swapBlock(this, "agmLamp", false);

		}
		if(this.data.inverted && signal.power){
			swapBlock(this, "agmLamp", true);

		}
			
	},
	
	destroyBlock: function(coords, player){
		destroy(this,coords);
	}
});

Block.registerPlaceFunction("agmLamp", function(coords, item, block){
	placeFunction(coords, item, block);
});

Block.registerPlaceFunction("agmLampInv", function(coords, item, block){
	placeFunction(coords, item, block);
});


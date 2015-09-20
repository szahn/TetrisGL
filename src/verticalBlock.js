class VerticalBlock extends Block{
	
	constructor(hasCollidedCb){
		super(hasCollidedCb);
		this.geometry = new THREE.BoxGeometry(1, 4, 1);
	}

}
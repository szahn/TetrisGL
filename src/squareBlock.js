class SquareBlock extends Block{
	
	constructor(hasCollidedCb){
		super(hasCollidedCb);
		this.geometry = new THREE.BoxGeometry(2, 2, 1);
	}

}
class TBlock extends Block{
	
	constructor(hasCollidedCb){
		super(hasCollidedCb);
		this.geometry = new THREE.BoxGeometry(3, 1, 1);
		var mesh = new THREE.Mesh(new THREE.CubeGeometry(1,1,1), this.material);
		mesh.position.x = 0;
		mesh.position.y = -1;
		THREE.GeometryUtils.merge(this.geometry, mesh);
	}

}
class ZBlock extends Block{
	
	constructor(hasCollidedCb){
		super(hasCollidedCb);
		this.geometry = new THREE.BoxGeometry(2, 1, 1);
		var mesh = new THREE.Mesh(new THREE.CubeGeometry(2,1,1), this.material);
		var random = Math.random()*100;
		mesh.position.x = random > 50 ? -1 : 1;
		mesh.position.y = 1;
		THREE.GeometryUtils.merge(this.geometry, mesh);
	}

}
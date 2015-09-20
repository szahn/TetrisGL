class Block{

	constructor(hasCollidedCb){
		this.hasCollidedCb = hasCollidedCb;
		this.material = new THREE.MeshLambertMaterial({color: 0xff0});
		this.isFreefalling = true;
	}

	spawn(scene, width, height){
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.geometry.computeBoundingBox();
		const maxY = this.mesh.geometry.boundingBox.max.y;
		//const minX = -(width / 2) - this.mesh.geometry.boundingBox.min.x;
		//const maxX = (width / 2) - this.mesh.geometry.boundingBox.max.x;
		this.mesh.position.x = 0;
		this.mesh.position.y = (height / 2) + maxY + 1;
		this.mesh.position.z = .5;
		scene.add(this.mesh);
	}

	rotateCC(){
		const RadiansDegree90 = 1.570796325;
		this.mesh.rotation.z +=RadiansDegree90
		this.mesh.geometry.computeBoundingBox();
	}

	rotateC(){
		const RadiansDegree90 = 1.570796325;
		this.mesh.rotation.z -=RadiansDegree90
		this.mesh.geometry.computeBoundingBox();
	}

	shiftLeft(){
		this.mesh.position.x -=1;
		this.mesh.geometry.computeBoundingBox();
	}

	shiftRight(){
		this.mesh.position.x += 1;
		this.mesh.geometry.computeBoundingBox();
	}

	tick(){
		if(this.hasCollidedCb(this.mesh)){
			this.isFreefalling = false;
		}	

		if (this.isFreefalling){
			this.mesh.position.y -=.25;
		}
	}

}
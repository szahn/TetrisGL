class Game{

	constructor(){
		this.level = new Level();
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(75, window.innerWidth	 / window.innerHeight, 0.1, 1000);
		this.camera.position.z = 14;
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(this.renderer.domElement);

		const fps = 8;
    	this.interval = 1000 / fps;
		this.then = new Date().getTime();
		this.spawnTicker = 0;

		this.blocks = [];

		
	}

	keyUp(ev){
		if (ev.keyCode === 81) this.onRotateCC(); //q
		if (ev.keyCode === 69) this.onRotateC(); //e
		if (ev.keyCode === 65) this.onLeft(); //a
		if (ev.keyCode === 68) this.onRight(); //d
	}

	onRotateCC(){
		if (!this.activeBlock) return;
		this.activeBlock.rotateCC();
	}

	onRotateC(){
		if (!this.activeBlock) return;
		this.activeBlock.rotateC();
	}

	onLeft(){
		if (!this.activeBlock) return;
		this.activeBlock.shiftLeft();
	}

	onRight(){
		if (!this.activeBlock) return;
		this.activeBlock.shiftRight();
	}

	spawn(){
		const block = 0 + Math.round(5 * Math.random());
		switch (block){
			case 0:{
				const squareBlock = new SquareBlock(this.hasCollided.bind(this));
				squareBlock.spawn(this.scene, this.level.width, this.level.height);
				this.blocks.push(squareBlock);
				this.activeBlock = squareBlock;
				break;
			}
			case 1:{
				const verticalBlock = new VerticalBlock(this.hasCollided.bind(this));
				verticalBlock.spawn(this.scene, this.level.width, this.level.height);
				this.blocks.push(verticalBlock);
				this.activeBlock = verticalBlock;
				break;
			}
			case 2:{
				const legBlock = new LegBlock(this.hasCollided.bind(this));
				legBlock.spawn(this.scene, this.level.width, this.level.height);
				this.blocks.push(legBlock);
				this.activeBlock = legBlock;
				break;
			}
			case 3:{
				const tBlock = new TBlock(this.hasCollided.bind(this));
				tBlock.spawn(this.scene, this.level.width, this.level.height);
				this.blocks.push(tBlock);
				this.activeBlock = tBlock;
				break;
			}
			case 4:{
				const zBlock = new ZBlock(this.hasCollided.bind(this));
				zBlock.spawn(this.scene, this.level.width, this.level.height);
				this.blocks.push(zBlock);
				this.activeBlock = zBlock;
				break;
			}
		}
	}

	build(){

		const RadiansDegree90 = 1.570796325;
		const material = new THREE.MeshLambertMaterial({color: 0xdddddd});
		const leftWallGeom = new THREE.PlaneGeometry( this.level.height + 2, 1, 1, 1 );
		const leftWallPlane = new THREE.Mesh( leftWallGeom, material );
		leftWallPlane.rotation.x = RadiansDegree90;
		leftWallPlane.rotation.y = RadiansDegree90;
		leftWallPlane.position.x =-(this.level.width /2);
		leftWallPlane.position.y =1;
		leftWallPlane.position.z =.5;
		this.scene.add( leftWallPlane );


		const rightWallGeom = new THREE.PlaneGeometry( this.level.height + 2, 1, 1, 1 );
		const rightWallPlane = new THREE.Mesh( rightWallGeom, material );
		rightWallPlane.rotation.x = -RadiansDegree90;
		rightWallPlane.rotation.y = -RadiansDegree90;
		rightWallPlane.position.x =(this.level.width /2);
		rightWallPlane.position.y =1;
		rightWallPlane.position.z =.5;
		this.scene.add( rightWallPlane );

		const backGeom = new THREE.PlaneGeometry( this.level.width, this.level.height+2, 1, 1 );
		const backPlane = new THREE.Mesh( backGeom, material );
		backPlane.position.y =1;
		backPlane.position.z =0;
		this.scene.add( backPlane );

		const floorGeom = new THREE.PlaneGeometry( this.level.width, 2, 1, 1 );
		const floorPlane = new THREE.Mesh( floorGeom, material );
		floorPlane.position.y =-(this.level.height /2);
		floorPlane.rotation.x = -RadiansDegree90;
		this.scene.add( floorPlane );

		var ambientLight = new THREE.AmbientLight( 0xaaa ); // soft white light
		this.scene.add( ambientLight );

		const light = new THREE.PointLight( 0xaaa, 1.5 , 50 );
		light.position.set( 0, 1, 3 );
		this.scene.add( light );
	}

	hasCollided(mesh){
		const bottom = mesh.position.y + mesh.geometry.boundingBox.min.y;
		if (bottom <= -(this.level.height / 2)) return true;


		return false;
	}

	start(){
		this.spawn();
	}

	render(timestamp){  
		var now = new Date().getTime();
        var delta = now - this.then;
		requestAnimationFrame(this.render.bind(this));

		if (delta > this.interval) {

			this.spawnTicker += 1;
			if (this.spawnTicker > 20){
				this.spawnTicker = 0;
				//this.spawn();
			}

            // Update time
            // now - (delta % interval) is an improvement over just 
            // using then = now, which can end up lowering overall fps
            this.then = now - (delta % this.interval);
 
 			for (let block of this.blocks) block.tick();
			//this.verticalBlock.tick();
        }

		this.renderer.render(this.scene, this.camera);
	}


}
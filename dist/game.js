"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = (function () {
	function Game() {
		_classCallCheck(this, Game);

		this.level = new Level();
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		this.camera.position.z = 14;
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(this.renderer.domElement);

		var fps = 8;
		this.interval = 1000 / fps;
		this.then = new Date().getTime();
		this.spawnTicker = 0;

		this.blocks = [];
	}

	_createClass(Game, [{
		key: "keyUp",
		value: function keyUp(ev) {
			if (ev.keyCode === 81) this.onRotateCC(); //q
			if (ev.keyCode === 69) this.onRotateC(); //e
			if (ev.keyCode === 65) this.onLeft(); //a
			if (ev.keyCode === 68) this.onRight(); //d
		}
	}, {
		key: "onRotateCC",
		value: function onRotateCC() {
			if (!this.activeBlock) return;
			this.activeBlock.rotateCC();
		}
	}, {
		key: "onRotateC",
		value: function onRotateC() {
			if (!this.activeBlock) return;
			this.activeBlock.rotateC();
		}
	}, {
		key: "onLeft",
		value: function onLeft() {
			if (!this.activeBlock) return;
			this.activeBlock.shiftLeft();
		}
	}, {
		key: "onRight",
		value: function onRight() {
			if (!this.activeBlock) return;
			this.activeBlock.shiftRight();
		}
	}, {
		key: "spawn",
		value: function spawn() {
			var block = 0 + Math.round(5 * Math.random());
			switch (block) {
				case 0:
					{
						var squareBlock = new SquareBlock(this.hasCollided.bind(this));
						squareBlock.spawn(this.scene, this.level.width, this.level.height);
						this.blocks.push(squareBlock);
						this.activeBlock = squareBlock;
						break;
					}
				case 1:
					{
						var verticalBlock = new VerticalBlock(this.hasCollided.bind(this));
						verticalBlock.spawn(this.scene, this.level.width, this.level.height);
						this.blocks.push(verticalBlock);
						this.activeBlock = verticalBlock;
						break;
					}
				case 2:
					{
						var legBlock = new LegBlock(this.hasCollided.bind(this));
						legBlock.spawn(this.scene, this.level.width, this.level.height);
						this.blocks.push(legBlock);
						this.activeBlock = legBlock;
						break;
					}
				case 3:
					{
						var tBlock = new TBlock(this.hasCollided.bind(this));
						tBlock.spawn(this.scene, this.level.width, this.level.height);
						this.blocks.push(tBlock);
						this.activeBlock = tBlock;
						break;
					}
				case 4:
					{
						var zBlock = new ZBlock(this.hasCollided.bind(this));
						zBlock.spawn(this.scene, this.level.width, this.level.height);
						this.blocks.push(zBlock);
						this.activeBlock = zBlock;
						break;
					}
			}
		}
	}, {
		key: "build",
		value: function build() {

			var RadiansDegree90 = 1.570796325;
			var material = new THREE.MeshLambertMaterial({ color: 0xdddddd });
			var leftWallGeom = new THREE.PlaneGeometry(this.level.height + 2, 1, 1, 1);
			var leftWallPlane = new THREE.Mesh(leftWallGeom, material);
			leftWallPlane.rotation.x = RadiansDegree90;
			leftWallPlane.rotation.y = RadiansDegree90;
			leftWallPlane.position.x = -(this.level.width / 2);
			leftWallPlane.position.y = 1;
			leftWallPlane.position.z = .5;
			this.scene.add(leftWallPlane);

			var rightWallGeom = new THREE.PlaneGeometry(this.level.height + 2, 1, 1, 1);
			var rightWallPlane = new THREE.Mesh(rightWallGeom, material);
			rightWallPlane.rotation.x = -RadiansDegree90;
			rightWallPlane.rotation.y = -RadiansDegree90;
			rightWallPlane.position.x = this.level.width / 2;
			rightWallPlane.position.y = 1;
			rightWallPlane.position.z = .5;
			this.scene.add(rightWallPlane);

			var backGeom = new THREE.PlaneGeometry(this.level.width, this.level.height + 2, 1, 1);
			var backPlane = new THREE.Mesh(backGeom, material);
			backPlane.position.y = 1;
			backPlane.position.z = 0;
			this.scene.add(backPlane);

			var floorGeom = new THREE.PlaneGeometry(this.level.width, 2, 1, 1);
			var floorPlane = new THREE.Mesh(floorGeom, material);
			floorPlane.position.y = -(this.level.height / 2);
			floorPlane.rotation.x = -RadiansDegree90;
			this.scene.add(floorPlane);

			var ambientLight = new THREE.AmbientLight(0xaaa); // soft white light
			this.scene.add(ambientLight);

			var light = new THREE.PointLight(0xaaa, 1.5, 50);
			light.position.set(0, 1, 3);
			this.scene.add(light);
		}
	}, {
		key: "hasCollided",
		value: function hasCollided(mesh) {
			var bottom = mesh.position.y + mesh.geometry.boundingBox.min.y;
			if (bottom <= -(this.level.height / 2)) return true;

			return false;
		}
	}, {
		key: "start",
		value: function start() {
			this.spawn();
		}
	}, {
		key: "render",
		value: function render(timestamp) {
			var now = new Date().getTime();
			var delta = now - this.then;
			requestAnimationFrame(this.render.bind(this));

			if (delta > this.interval) {

				this.spawnTicker += 1;
				if (this.spawnTicker > 20) {
					this.spawnTicker = 0;
					//this.spawn();
				}

				// Update time
				// now - (delta % interval) is an improvement over just
				// using then = now, which can end up lowering overall fps
				this.then = now - delta % this.interval;

				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = this.blocks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var block = _step.value;
						block.tick();
					} //this.verticalBlock.tick();
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator["return"]) {
							_iterator["return"]();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
			}

			this.renderer.render(this.scene, this.camera);
		}
	}]);

	return Game;
})();
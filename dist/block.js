"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Block = (function () {
	function Block(hasCollidedCb) {
		_classCallCheck(this, Block);

		this.hasCollidedCb = hasCollidedCb;
		this.material = new THREE.MeshLambertMaterial({ color: 0xff0 });
		this.isFreefalling = true;
	}

	_createClass(Block, [{
		key: "spawn",
		value: function spawn(scene, width, height) {
			this.mesh = new THREE.Mesh(this.geometry, this.material);
			this.mesh.geometry.computeBoundingBox();
			var maxY = this.mesh.geometry.boundingBox.max.y;
			//const minX = -(width / 2) - this.mesh.geometry.boundingBox.min.x;
			//const maxX = (width / 2) - this.mesh.geometry.boundingBox.max.x;
			this.mesh.position.x = 0;
			this.mesh.position.y = height / 2 + maxY + 1;
			this.mesh.position.z = .5;
			scene.add(this.mesh);
		}
	}, {
		key: "rotateCC",
		value: function rotateCC() {
			var RadiansDegree90 = 1.570796325;
			this.mesh.rotation.z += RadiansDegree90;
			this.mesh.geometry.computeBoundingBox();
		}
	}, {
		key: "rotateC",
		value: function rotateC() {
			var RadiansDegree90 = 1.570796325;
			this.mesh.rotation.z -= RadiansDegree90;
			this.mesh.geometry.computeBoundingBox();
		}
	}, {
		key: "shiftLeft",
		value: function shiftLeft() {
			this.mesh.position.x -= 1;
			this.mesh.geometry.computeBoundingBox();
		}
	}, {
		key: "shiftRight",
		value: function shiftRight() {
			this.mesh.position.x += 1;
			this.mesh.geometry.computeBoundingBox();
		}
	}, {
		key: "tick",
		value: function tick() {
			if (this.hasCollidedCb(this.mesh)) {
				this.isFreefalling = false;
			}

			if (this.isFreefalling) {
				this.mesh.position.y -= .25;
			}
		}
	}]);

	return Block;
})();
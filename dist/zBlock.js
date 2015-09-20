"use strict";

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ZBlock = (function (_Block) {
	_inherits(ZBlock, _Block);

	function ZBlock(hasCollidedCb) {
		_classCallCheck(this, ZBlock);

		_get(Object.getPrototypeOf(ZBlock.prototype), "constructor", this).call(this, hasCollidedCb);
		this.geometry = new THREE.BoxGeometry(2, 1, 1);
		var mesh = new THREE.Mesh(new THREE.CubeGeometry(2, 1, 1), this.material);
		var random = Math.random() * 100;
		mesh.position.x = random > 50 ? -1 : 1;
		mesh.position.y = 1;
		THREE.GeometryUtils.merge(this.geometry, mesh);
	}

	return ZBlock;
})(Block);
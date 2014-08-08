function UnusedNumbers(ns){
	return [1,2,3,4,5,6,7,8,9].filter(function(n){
		return ns.indexOf(n) == -1;
	});
}

function Duplicates(ns){
	var n = null;
	var duplicates = [];
	//copy the array with slice() to prevent unwanted mutation with sort()
	ns.slice().sort().forEach(function(x){
		if(x === n && x !== null){
			duplicates.push(n);
		}
		n = x;
	});
	return duplicates;
}

function Union(){//accepts a variable number of arguments
	var setCount = arguments.length;
	if(setCount === 0){
		return [];
	}
	if(setCount === 1){
		return arguments[0];
	}
	var arrays = Array.prototype.slice.call(arguments);
	return arrays[0].filter(function(x){
		return arrays.every(function(array){
			return array.indexOf(x) > -1;
		});
	});
}

function Observable(){
	var _observers = {};
	this.observe = function(eventName,fn){
		if(!(eventName in _observers)){
			_observers[eventName] = [];
		}
		_observers[eventName].push(fn);
	};
	this.notify = function(eventName, args){
		if(!(eventName in _observers)){
			return;
		}
		var _args = args || [];
		_observers[eventName].forEach(function(fn){
			fn.apply(null,_args);
		});
	};
}

function SquaresToNumbers(squares){
	return squares.map(function(square){ return square.number; });
}

function NumbersFrom(n){
	var xs = [];
	for(var i=0; i<9; i++){
		var x = n + i;
		xs.push(x > 9 ? x % 9 : x);
	}
	return xs;
}

function Shuffle(xs){
	return xs.map(function(x){
		return {x:x, r:Math.random()};
	}).sort(function(a,b){
		return a.r < b.r;
	}).map(function(o){
		return o.x;
	});
}

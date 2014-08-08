var table, board, solutions=[], difficultyMenu, nextNumber = null;
window.onload = function(){
	document.addEventListener('keydown',function(e){
		if(49 <= e.which && e.which <= 57){
			var n = e.which - 48;
			console.log('Number pressed: ', n);
			nextNumber = n;
			updateNextNumber();
		}
	});
	function updateNextNumber(){
		document.getElementById('nextNumber').innerHTML = nextNumber || '-';
	}
	updateNextNumber();
	board = new Board();
	board.onPlay(draw.bind(null,board));
	document.getElementById('randomFillBtn').addEventListener('click',function(){
		var n = 0;
		function tryFill(){
			board.clear();
			Filler.reset();
			while(Filler.next(board)){}
			if(board.solved()){
				var solution = board.squares.map(SquaresToNumbers);
				var json = JSON.stringify(solution);
				var repeatNote = "";
				if(solutions.indexOf(solution) == -1){
					solutions.push(json);
				} else {
					repeatNote = " (REPEAT)";
				}
				console.log('solved in ' + n + ' attempts' + repeatNote,json);
			} else {
				n++;
				setTimeout(tryFill,1);
			}
		}
		tryFill();
	});
	document.getElementById('fillBtn').addEventListener('click',function(){
		board.clear();
		Filler.fill(board);
		draw(board);
	});
	document.getElementById('makeHolesBtn').addEventListener('click',function(){
		Filler.makeHoles(board);
		draw(board);
	});
	document.getElementById('makeHolesByGroupBtn').addEventListener('click',function(){
		Filler.makeHolesByGroup(board, difficultyMenu.value);
		draw(board);
	});
	difficultyMenu = document.createElement('select');
	[
		{id:"Trivial",n:1},
		{id:"Easy",n:4},
		{id:"Medium",n:5},
		{id:"Hard",n:6},
		{id:"Black Belt",n:7},
	].forEach(function(d){
		var o = document.createElement('option');
		o.setAttribute('value',d.n);
		o.innerText = d.id;
		difficultyMenu.appendChild(o);
	});
	difficultyMenu.value = 4;
	document.getElementById('difficultyContainer').appendChild(difficultyMenu);
	draw(board);
};

function tryMakePlay(r,c){
	if(nextNumber == null){
		console.log('to play, first select a number and *then* click the board');
		return;
	}
	board.play(r,c,nextNumber);
}

function draw(board){
	if(!!table){
		table.remove();
	}
	table = document.createElement('table');
	table.className = 'sudoku-board';
	board.squares.forEach(function(row,r){
		var tr = document.createElement('tr');
		table.appendChild(tr);
		row.forEach(function(square,c){
			var td = document.createElement('td');
			tr.appendChild(td);
			td.innerHTML = square.number;
			td.addEventListener('click',function(e){
				tryMakePlay(trs.indexOf(tr), tds.indexOf(td));
			});
			if(square.marked){
				td.className = 'marked';
			}
		});
		var tds = Array.prototype.slice.call(tr.children);
	});
	var trs = Array.prototype.slice.call(table.children);
	document.getElementById('container').appendChild(table);
}

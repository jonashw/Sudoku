function Board(){
	var _o = new Observable();
	var self = {
		solved: function(){
			var self = this;
			return [0,1,2,3,4,5,6,7,8].every(function(i){
				var row = self.getRow(i);
				var col = self.getColumn(i);
				var rowNumbers = UnusedNumbers(SquaresToNumbers(row));
				var colNumbers = UnusedNumbers(SquaresToNumbers(col));
				return rowNumbers.length === 0 && colNumbers.length === 0;
			});
		},
		playableNumbers: function(r,c){
			var numbers = {
				group:  UnusedNumbers(SquaresToNumbers(this.getGroupFromSquare(r,c))),
				row:    UnusedNumbers(SquaresToNumbers(this.getRow(r))),
				column: UnusedNumbers(SquaresToNumbers(this.getColumn(c)))
			};
			return Union(numbers.group, numbers.row, numbers.column);
		},
		play: function(r,c,number){
			this.clearMarks();
			var self = this;
			function requireNoDuplicates(name, squares){
				var duplicates = Duplicates(SquaresToNumbers(squares));
				if(duplicates.length > 0){
					self.squares[r][c].number = null;//undo last play
					squares.filter(function(square){
						return duplicates.indexOf(square.number) > -1;
					}).forEach(function(square){
						square.marked = true; //mark duplicate squares
					});
					console.log('Invalid Play: duplicate number in ' + name);//inform user
					return true;
				}
				return false;
			}
			function checkWin(){
			}
			requireRange('Row Number', r, 0, 8);
			requireRange('Column Number',c, 0, 8);
			requireRange('Number',number, 1, 9);
			this.squares[r][c].number = number;
			requireNoDuplicates('group', this.getGroupFromSquare(r,c));
			requireNoDuplicates('row', this.getRow(r));
			requireNoDuplicates('column', this.getColumn(c));
			_o.notify('play');
			checkWin();
		},
		getGroup: function(groupRowIndex, groupColIndex){
			return getGroup(groupRowIndex * 3, groupColIndex * 3);
		},
		getGroupFromSquare: function(rowIndex,colIndex){
			var c0 = Math.floor(colIndex/3) * 3;
			var r0 = Math.floor(rowIndex/3) * 3;
			return getGroup(r0, c0);
		},
		clearMarks: function(){
			this.getAllSquares().forEach(function(square){
				square.marked = false;
			});
		},
		clear: function(){
			this.getAllSquares().forEach(function(square){
				square.number = null;
				square.marked = false;
			});
		},
		getAllSquares: function(){
			var squares = [];
			this.squares.forEach(function(row){
				row.forEach(function(square){
					squares.push(square);
				});
			});
			return squares;
		},
		getAllGroups: function(){
			var groups = [];
			for(var r=0; r<3; r++){
				for(var c=0; c<3; c++){
					groups.push(this.getGroup(r,c));
				}
			}
			return groups;
		},
		getRow: function(r){
			return this.squares[r];
		},
		getColumn: function(c){
			return this.squares.map(function(row){
				return row[c];
			});
		},
		squares: (function(){
			var b = [];
			for(var r=0; r<9; r++){
				b[r] = [];
				for(var c=0; c<9; c++){
					b[r][c] = {
						number:null,
						marked:false
					};
				}
			}
			return b;
		})(),
		onPlay: _o.observe.bind(null,'play')
	};

	function requireRange(name, n, min, max){
		if(n < min || n > max){
			throw('Invalid ' + name + ' (' + n + '). ' + name + ' must be between ' + min + ' and ' + max);
		}
	}

	function getGroup(groupRowIndex, groupColIndex){
		/*  x | g0
			------
			0   0
			1   0
			2   0
			3   3
			4   3
			5   3
			6   6
			7   6
			8   6  */
		var group = [];
		for(var r=0; r<3; r++){
			for(var c=0; c<3; c++){
				var n = self.squares[groupRowIndex + r][groupColIndex + c];
				group.push(n);
			}
		}
		return group;
	}

	return self;
}

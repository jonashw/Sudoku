var Filler = (function(){
	var r=0;
	var c=0;
	return {
		fill: function(board){
			[1,4,7,2,5,8,3,6,9].map(NumbersFrom).forEach(function(ns, r){
				ns.forEach(function(n,c){
					board.squares[r][c].number = n;
				});
			});
		},
		reset: function(){
			r=0;
			c=0;
		},
		next: function(){
			if(c > 8){
				c=0;
				r++;
			}
			if(r > 8){
				return false;
			}
			var possibleNumbers = board.playableNumbers(r,c);
			if(possibleNumbers.length === 0){
				return false;
			}
			var randomIndex = Math.floor(Math.random() * possibleNumbers.length);
			board.play(r,c,possibleNumbers[randomIndex]);
			c++;
			return true;
		},
		makeHoles: function(board,n){
			n = n || 40;
			Shuffle(board.getAllSquares()).slice(0,n).forEach(function(square){
				square.number = null;
			});
		},
		makeHolesByGroup: function(board,n){
			n = n || 5;
			board.getAllGroups().forEach(function(group){
				Shuffle(group).slice(0,n).forEach(function(square){
					square.number = null;
				});
			});
		}
	};
	/* successful random fills! 
		[[9,8,5,1,4,6,2,3,7],[1,3,7,2,9,8,6,4,5],[4,6,2,7,5,3,9,8,1],[5,1,9,4,8,7,3,6,2],[2,4,6,9,3,1,5,7,8],[3,7,8,5,6,2,1,9,4],[6,5,3,8,2,4,7,1,9],[8,9,1,6,7,5,4,2,3],[7,2,4,3,1,9,8,5,6]]	
		[[8,1,9,2,6,5,7,4,3],[4,6,7,1,8,3,5,9,2],[3,2,5,4,9,7,6,1,8],[9,5,2,7,1,8,3,6,4],[6,3,4,5,2,9,1,8,7],[7,8,1,3,4,6,2,5,9],[2,7,8,6,5,4,9,3,1],[1,9,6,8,3,2,4,7,5],[5,4,3,9,7,1,8,2,6]]
		[[6,8,2,5,4,7,1,9,3],[9,5,3,8,2,1,4,7,6],[1,4,7,3,6,9,2,8,5],[2,7,5,4,1,8,6,3,9],[8,3,9,6,5,2,7,1,4],[4,6,1,7,9,3,5,2,8],[7,1,4,9,3,5,8,6,2],[5,9,8,2,7,6,3,4,1],[3,2,6,1,8,4,9,5,7]]
		[[7,8,1,5,4,9,2,6,3],[6,5,3,2,7,1,4,9,8],[2,4,9,6,3,8,5,1,7],[3,7,4,1,5,2,9,8,6],[1,2,8,9,6,7,3,4,5],[9,6,5,3,8,4,7,2,1],[5,9,2,7,1,6,8,3,4],[8,1,7,4,9,3,6,5,2],[4,3,6,8,2,5,1,7,9]]
		[[8,1,9,6,2,3,5,4,7],[5,7,6,1,4,9,8,2,3],[4,3,2,5,7,8,9,6,1],[9,2,1,3,8,5,6,7,4],[6,5,7,9,1,4,3,8,2],[3,8,4,2,6,7,1,5,9],[7,6,5,4,9,1,2,3,8],[1,4,3,8,5,2,7,9,6],[2,9,8,7,3,6,4,1,5]] 
	*/
})();

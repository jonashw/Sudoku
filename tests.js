describe("Union(xs,ys,zs,...)",function(){
	it("calculates the union between two arrays of strings",function(){
		var u = Union(['b','c','a'],['f','g','a','b']).sort();
		expect(u).toEqual(['a','b']);
	});
	it("calculates the union between three arrays of numbers",function(){
		var u = Union([1,2,3,4,5],[1,3,5,7,9,12],[1,2,3,4,5,7,9,12]);
		expect(u).toEqual([1,3,5]);
	});
});

describe("NumbersFrom(n)",function(){
	it("gives the numbers 1-9 starting with the given number, wrapping around if necessary",function(){
		expect(NumbersFrom(1)).toEqual([1,2,3,4,5,6,7,8,9]);
		expect(NumbersFrom(2)).toEqual([2,3,4,5,6,7,8,9,1]);
		expect(NumbersFrom(7)).toEqual([7,8,9,1,2,3,4,5,6]);
		expect(NumbersFrom(9)).toEqual([9,1,2,3,4,5,6,7,8]);
	});
});

describe("Duplicates(xs)",function(){
	it("returns the duplicate items in a list",function(){
		expect(Duplicates([1,2,3,1,2,3,4,5])).toEqual([1,2,3]);
		expect(Duplicates([])).toEqual([]);
		expect(Duplicates([1,2,3,4,5])).toEqual([]);
	});
});

describe("UnusedNumbers(ns)",function(){
	it("returns the numbers 1-9 that do not appear in the given array",function(){
		expect(UnusedNumbers([1,2,3,4,5,6,7])).toEqual([8,9]);
		expect(UnusedNumbers([1,2,3,4,5,6,7,8,9])).toEqual([]);
		expect(UnusedNumbers([])).toEqual([1,2,3,4,5,6,7,8,9]);
	});
});

describe("Shuffle(xs)",function(){
	it("puts an array in random order",function(){
		var xs = [1,2,3,4,5,6,7,8,9];
		var ys = Shuffle(xs);
		expect(ys).not.toEqual(xs);
	});
	it("preserves the length and contents of the shuffled array",function(){
		var xs = [1,2,3,4,5,6,7,8,9];
		var ys = Shuffle(xs);
		var zs = ys.slice().sort();
		expect(ys.length).toEqual(xs.length);
		expect(ys).not.toEqual(xs);
		expect(zs).toEqual(xs);
	});
});

describe("board",function(){
	describe("solved()",function(){
		var board;
		beforeEach(function(){
			board = new Board();
		});
		it("returns false for an empty board",function(){
			expect(board.solved()).toBe(false);
		});
		it("returns true for a solved board",function(){
			fill(board);
			expect(board.solved()).toBe(true);
		});
		it("returns false for a nearly-solved board (one empty square)",function(){
			fill(board);
			board.squares[0][0].number = null;
			expect(board.solved()).toBe(false);
		});
	});
	(function(){
		var groups = [
			[
				[1,2,3,4,5,6,7,8,9],
				[4,5,6,7,8,9,1,2,3],
				[7,8,9,1,2,3,4,5,6]
			],
			[
				[2,3,4,5,6,7,8,9,1],
				[5,6,7,8,9,1,2,3,4],
				[8,9,1,2,3,4,5,6,7]
			],
			[
				[3,4,5,6,7,8,9,1,2],
				[6,7,8,9,1,2,3,4,5],
				[9,1,2,3,4,5,6,7,8]
			]
		];
		var testCases = [
			{square:{r:0,c:0},group:{r:0,c:0}},
			{square:{r:0,c:3},group:{r:0,c:1}},
			{square:{r:0,c:6},group:{r:0,c:2}},
			{square:{r:3,c:0},group:{r:1,c:0}},
			{square:{r:3,c:3},group:{r:1,c:1}},
			{square:{r:3,c:6},group:{r:1,c:2}},
			{square:{r:6,c:0},group:{r:2,c:0}},
			{square:{r:6,c:3},group:{r:2,c:1}},
			{square:{r:6,c:6},group:{r:2,c:2}}
		];

		describe("getGroupFromSquare(r,c)",function(){
			beforeEach(function(){
				board = new Board();
				fill(board);
			});
			testCases.forEach(function(test){
				it("gets group " + test.group.r + "," + test.group.c + " from square " + test.square.r + "," + test.square.c + " correctly",function(){
					var actual = SquaresToNumbers(board.getGroupFromSquare(test.square.r, test.square.c));
					var expected = groups[test.group.r][test.group.c];
					expect(actual).toEqual(expected);
				});
			});
		});
		describe("getGroup(groupR,groupC)",function(){
			beforeEach(function(){
				board = new Board();
				fill(board);
			});
			testCases.forEach(function(test){
				it("gets group " + test.group.r + "," + test.group.c + " correctly (directly)",function(){
					var actual = SquaresToNumbers(board.getGroup(test.group.r, test.group.c));
					var expected = groups[test.group.r][test.group.c];
					expect(actual).toEqual(expected);
				});
			});
		});
	})();
});

function fill(board){
	[1,4,7,2,5,8,3,6,9].map(NumbersFrom).forEach(function(ns, r){
		ns.forEach(function(n,c){
			board.squares[r][c].number = n;
		});
	});
}

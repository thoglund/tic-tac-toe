var com_github_tic = (function() {
	var internal = {};

	var lineString = function(x1, y1, x2, y2) {
		return "M" + x1 + "," + y1 + "L" + x2 + "," + y2;
	}

	internal.game = function(name, width, height) {
		var even = true;
		var gameRunning = false;
		var game = null;
		var msg = null;
		var xChar = "X", zChar = "0";
		
		var status = function(text) {
			if (msg !== null)
				msg.remove();
			msg = paper.text(10, 350, text).attr({
				"font-size" : 14,
				"text-anchor" : "start"
			});
		}
		var setup = function(text) {
			gameRunning = true;
			game = Array(3);
			for ( var i = 0; i < 3; i++) {
				game[i] = new Array(3);
			}
			status("X starts");
		}
		var finished = function() {
			var x = null;
			var i = 0;
			while (i < 3) {
				x = ((game[i][0] === game[i][1]) && (game[i][0] === game[i][2]) && validChar(game[i][0]));
				if (x)
					return game[i][0];
				x =  ((game[0][i] === game[1][i]) && (game[2][i] === game[0][i]) && validChar(game[0][i]));
				if (x)
					return game[0][i];
				i++;
			}
			x = ((game[0][0] === game[1][1]) && (game[1][1] === game[2][2]) && validChar(game[2][2]));
			if (x)
				return game[0][0];
			x = ((game[0][2] === game[1][1]) && (game[1][1] === game[2][0]) && validChar(game[2][0]));
			if (x)
				return game[0][2];
			return null;
		}
		var validChar = function(char) {
			return (char === xChar || char === zChar);
		}
		var paint = function(i, j) {
			var char = turn(even);
			var t = paper.text(60 + j * 100, 60 + i * 100, char).attr({
				"font-size" : 38
			});
			even = !even;
			game[i][j] = char;
//			status("added: [" + i + "][" + j + "] " + char);

			return t;
		}
		var turn = function(even) {
			return (even) ? xChar : zChar;				
		}
		var empty = function(i, j) {
			return game[i][j] === undefined;				
		}
		var clickBox = function(i, j) {
			if (gameRunning && empty(i, j)) {
				paint(i, j);
				status("Next turn: " + turn(even));
			}
			var winner = finished();
			if (winner !== null) {
				gameRunning = false;
				status(winner + " won");
			}
		}
		var board = function(paper, x, y, size) {
			var boxWidth = size / 3;

			var c = paper.rect(x, y, size, size);
			var boardBoxes = new Array(3);
			var box_x = x;
			var box_y = y;
			for (i = 0; i < boardBoxes.length; i++) {
				boardBoxes[i] = new Array(3);
				for (j = 0; j < 3; j++) {
					var r = paper.rect(box_x + (j * boxWidth), box_y, boxWidth,
							boxWidth).attr({
						fill : "#0f0"
					}).data("i", i).data("j", j).click(function() {
						clickBox(this.data("i"), this.data("j"));
					});
					boardBoxes[i][j] = r;
				}
				box_y += boxWidth;
			}
			paper.path(lineString(x, y + boxWidth, (x + size), y + boxWidth));
			paper.path(lineString(x, y + boxWidth * 2, (x + size), y + boxWidth
					* 2));

			paper.path(lineString(x + size / 3, y, x + boxWidth, y + size));
			paper.path(lineString(x + boxWidth * 2, y, x + boxWidth * 2, y
					+ size));
			return c;
		}

		// Creates canvas 320 × 200 at 10, 50
		// var paper = Raphael(x, y, width, height);
		var paper = Raphael(name, 320, 360);
		var b = board(paper, 10, 10, 300);
		setup();
	}
	return internal;
})();
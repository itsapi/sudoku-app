function getPuzzles() {
	return $.getJSON('ajax.php', {
			func: 'getPuzzles'
	});
}

function generateGrid(puzzle) {
	for (var i=0; i<puzzle.length; i++) {
		$('#sudoku').add('td').add('div').addClass('cell');
	}
}

$(document).ready(function(){
	getPuzzles().done(function(data) {
		console.log(data);
		var puzzle = data[Math.floor(Math.random()*data.length)];
		console.log(puzzle);
		generateGrid(puzzle);
	});
});
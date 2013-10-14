function getPuzzles() {
	return $.getJSON('ajax.php', {
			func: 'getPuzzles'
	});
}

function generateGrid(puzzle) {
	for (var y=0; y<9; y++) {
		$('#grid').append(
			$('<tr />').html(function() {
				for (var x=0; x<9; x++) {
					$(this).append(
						$('<td />').html(
							$('<div />').html('0').addClass('cell')
						)
					);
				}
			})
		);
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
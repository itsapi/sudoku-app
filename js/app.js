function newPuzzle() {
    getPuzzles().done(function(puzzle) {
        console.log(puzzle);
        generateGrid(puzzle);
    });
}

function getPuzzles() {
    return $.ajax({
        url: 'ajax.php',
        type: 'post',
        data: {
            func: 'getPuzzles'
        }
    });
}

function generateGrid(puzzle) {
    var i=0;
    for (var y=0; y<9; y++) {
        $('#grid').append(
            $('<tr />').html(function() {
                for (var x=0; x<9; x++) {
                    $(this).append(
                        $('<td />').html(
                            $('<div />').html(
                                puzzle[i]
                            ).addClass('cell')
                        )
                    );
                    i++;
                }
            })
        );
    }
    $('div:contains(0)').html('').attr('contentEditable', 'true');
}

$(document).ready(function(){
    newPuzzle();

	$('#filters button').each(function() {
		$(this).click(function(e) {
			console.log($(this).html())
			$('.cell').removeClass('highlight');
			$(".cell:contains('" + $(this).html() + "')").addClass('highlight');
			e.preventDefault();
		});
	});

    $('#clear').click(function(e) {
        $('#sudoku .cell[contentEditable=true]').html('');
        e.preventDefault();
    });

    $('#new').click(function(e) {
        $('#grid').empty();
        newPuzzle();
        e.preventDefault();
    });
});
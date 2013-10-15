function newPuzzle() {
    getPuzzles().done(function(puzzle) {
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
                            $('<div />')
                            	.html(puzzle[i])
                            	.addClass('cell')
                            	.attr('pattern', '[0-9]*')
                        )
                    );
                    i++;
                }
            })
        );
    }
    $("div:contains('.')").html('').attr('contentEditable', 'true');
}

function generateButtons() {
	for (var i=1; i<=9; i++) {
		$('#filters').append(
			$('<button />').html(i)
		)
	}
}

function highlight(number) {
	// hightlight() is bound to a filter button click and a .cell input event.
	$('.cell').removeClass('highlight').removeClass('Mhighlight');
	$(".cell:contains('" + number + "')").addClass('Mhighlight').not(function() {
		return ($(this).html().length > 1);
	}).removeClass('Mhighlight').addClass('highlight');
}

$(document).ready(function(){
    newPuzzle();

    generateButtons();

    var filter = 0;
	$('#filters button').each(function() {
		$(this).click(function(e) {
			// When a button's clicked toggle it and update the filter var.
			$('#filters button').not(this).removeClass('toggle');
			if ($(this).hasClass('toggle')) {
				$(this).removeClass('toggle');
				filter = 0;
				highlight(filter);
			} else {
				$(this).addClass('toggle');
				filter = $(this).html();
				highlight(filter);
			}
			e.preventDefault();
		});
	});

	document.getElementById('sudoku').addEventListener('input', function() {
		highlight(filter);
	}, false);

    $('#clear').click(function(e) {
        $('#sudoku .cell[contentEditable=true]').html('');
		highlight(filter);
        e.preventDefault();
    });

    $('#new').click(function(e) {
        $('#grid').empty();
        newPuzzle();
		highlight(filter);
        e.preventDefault();
    });
});

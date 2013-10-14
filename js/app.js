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

function highlight(number) {
	// hightlight() is bound to a filter button click and a .cell input event.
	$('.cell').removeClass('highlight');
	$(".cell:contains('" + number + "')").addClass('highlight');
}

$(document).ready(function(){
    getPuzzles().done(function(puzzle) {
        generateGrid(puzzle);
    });

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
		console.log(filter)
		highlight(filter);
	}, false);
});
function newPuzzle() {
    getPuzzles().done(function(puzzle) {
        $('#sudoku').attr('data-puzzle', puzzle)
        generateGrid()
    })
}

function getPuzzles() {
    return $.ajax({
        url: 'ajax.php',
        type: 'post',
        data: {
            func: 'getPuzzles'
        }
    })
}

function generateGrid() {
    $('#sudoku table').empty()
    var puzzle = $('#sudoku').attr('data-puzzle')
    var i=0
    $('#sudoku table').html(function() {
        for (var y=0; y<9; y++) {
            $(this).append(
                $('<tr />').html(function() {
                    for (var x=0; x<9; x++) {
                        $(this).append(
                            $('<td />').html(
                                $('<input />')
                                    .addClass('cell')
                                    .attr('value', puzzle[i])
                                    .attr('type', 'number')
                                    .attr('pattern', '[0-9]*')
                            )
                        )
                        i++
                    }
                })
            )
        }
    });
    $("#sudoku table input[value!='.']").attr('disabled', 'true');
}

function generateButtons() {
    $('#filters').html(function() {
        for (var i=1; i<=9; i++) {
            $(this).append(
                $('<button />').html(i)
            );
        }
    });
    $('#control-buttons').html(function() {
        $(this).append(
            $('<button />')
                .html('Clear')
                .attr('id', 'clear')
        );
        $(this).append(
            $('<button />')
                .html('New Puzzle')
                .attr('id', 'new')
        );
        $(this).append(
            $('<button />')
                .html('Solve')
                .attr('id', 'solve')
        );
    });
}

function highlight(number) {
    // hightlight() is bound to a filter button click and a .cell input event.
    $('.cell').removeClass('highlight').removeClass('Mhighlight')

    $('.cell').each(function() {
        console.log($(this).val())
        if (($(this).attr('value') == number) ||
            (($(this).val() != 0) &&
            ($(this).val() == number))) {
            $(this).addClass('highlight')
        }
        if (($(this).val() != 0) &&
            ($(this).val().indexOf(number) != -1) &&
            ($(this).val().length > 1)) {
            $(this).addClass('Mhighlight')
        }
    })
 
}

$(document).ready(function() {
    newPuzzle()

    generateButtons()

    var filter = 0
    $('#filters button').each(function() {
        $(this).click(function(e) {
            // When a button's clicked toggle it and update the filter var.
            $('#filters button').not(this).removeClass('toggle')
            if ($(this).hasClass('toggle')) {
                $(this).removeClass('toggle')
                filter = 0
                highlight(filter)
            } else {
                $(this).addClass('toggle')
                filter = $(this).html()
                highlight(filter)
            }
            e.preventDefault()
        })
    })

    document.getElementById('sudoku').addEventListener('input', function() {
        highlight(filter)
    }, false)

    $('#clear').click(function(e) {
        $('#sudoku .cell:not([disabled])').val('')
        $('#filters button').removeClass('toggle')
        highlight(filter)
        e.preventDefault()
    })

    $('#new').click(function(e) {
        newPuzzle()
        $('#filters button').removeClass('toggle')
        highlight(filter)
        e.preventDefault()
    })

    $('#solve').click(function(e) {
        $.getScript("js/solve.js", function() {
            var puzzle = $('#sudoku').attr('data-puzzle')
            var solver = sudoku_solver()
            var solstr = ''
            var solarr = solver(puzzle, 2)
            for (var i = 0; i < solarr.length; ++i) {
                solstr += solarr[i].join('')
            }
            $('#sudoku').attr('data-puzzle', solstr)
            generateGrid()
        })
        highlight(filter)
        e.preventDefault()
    })
})

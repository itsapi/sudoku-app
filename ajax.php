<?
    switch ($_REQUEST['func']) {
        case 'getPuzzles':
            $file = 'puzzles/subig20';
            $puzzles = [];

            $handle = fopen($file, "r");
            while(!feof($handle)) {
                    $puzzles[] = fgets($handle);
            }
            fclose($handle);
            echo $puzzles[array_rand($puzzles)];
            break;
    }

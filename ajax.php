<?
	switch ($_GET['func']) {                                                                                              
		case 'getPuzzles':
			$file = 'subig20';
			$puzzle = [];
			
			$handle = fopen($file, "r");
			while(!feof($handle)) {
					$puzzle[] = fgets($handle);
			}
			fclose($handle);
			echo json_encode($puzzle);
			break;
	}

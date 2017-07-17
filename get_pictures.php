<?php
	error_reporting('E_ALL');
	ini_set('display_errors', true);
	$rawfiles = scandir('/var/www/html/photos/hatouch_livingroom');
	foreach ($rawfiles as $file) {
		$f = explode('.', $file);
		if (in_array(strtolower($f[count($f)-1]), array('jpg', 'png'))) {
			$finalFiles[] = '/photos/hatouch_livingroom/'.str_replace(" ","%20",$file);
		}
	}
	echo json_encode($finalFiles);
?>
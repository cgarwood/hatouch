<?php
/*
 * HATouch REST API
 *
 * REST API for HATouch.
 * Allows sending notifications via HomeAssistant REST notification platform
 * and eventually changing the frontend based on HomeAssistant actions
 *
 * TODO: add API key so random internet people can't create notifications
 */

//error_reporting(E_ALL);
//ini_set('display_errors', 'on');
 
$service = $_GET['service']; 

switch ($service) {
	case "notify":
		if (isset($_POST['message'])) {
			$file = fopen('notifications/'.time().'.json', 'w');
			
			$data['message'] = $_POST['message'];
			$data['title'] = $_POST['title'];
			
			fwrite($file,json_encode($data));
			fclose($file);
			
			echo json_encode(array('message' => 'Created notification: '.time().'.json'));
		} else {
			//TODO: ability to kick back all notifications as json to the frontend in an ajax call
			$files = scandir('notifications');
			$notifications = Array();
			foreach ($files as $f) {
				if (substr($f,-5) == '.json') {
					$contents = json_decode(file_get_contents('notifications/'.$f));
					//$contents['id'] = $f;
					$notifications[] = $contents;
				}
			}
			echo '<pre>';
			print_r($notifications);
		}
		break;

	default:
		echo json_encode(array('error' => 'Invalid service or no service specified'));
}

?>
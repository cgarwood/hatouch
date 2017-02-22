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
		if (isset($_POST['data'])) {
			$file = fopen('notifications/'.time().'.json', 'w');
			fwrite($file, $_POST['data']);
			fclose($file);
			
			echo json_encode(array('message' => 'Created notification: '.time().'.json'));
		} else {
			//TODO: ability to kick back all notifications as json to the frontend in an ajax call
		}
		break;

	default:
		echo json_encode(array('error' => 'Invalid service or no service specified'));
}

?>
<pre>
<?php
	/* Fetch National Weather Service Alerts */
	/* Cache them locally - NWS feeds are updated every 2 minutes */
	/* NWS ratelimit of 1 request per 30 seconds - https://alerts-v2.weather.gov/documentation */

	$time = time();
	$mtime = filemtime('nws_alerts_cache.txt');
	$cache_expire = $mtime + 120;

	if ($time > $cache_expire || !file_exists('nws_alerts_cache.txt')) {
		$fp = fopen('nws_alerts_cache.txt', 'w');

		$ch = curl_init('https://api.weather.gov/alerts/active?state=IN');
		curl_setopt($ch, CURLOPT_HTTPHEADER, array('Accept:application/json', 'User-Agent:HATouch/v1.0 (https://github.com/cgarwood/hatouch; cgarwood@gmail.com)'));
		curl_setopt($ch, CURLOPT_FILE, $fp);
		if (!$data = curl_exec($ch)) {
			echo curl_error($ch);
		}
		curl_close($ch);
		fclose($fp);
	}

	echo file_get_contents('nws_alerts_cache.txt');

?>
</pre>
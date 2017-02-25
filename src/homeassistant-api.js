import EventEmitter from 'events';
//import axios from 'axios';

class HomeAssistantApi extends EventEmitter {
	connect() {
		// Setup new AJAX call
		var self = this;
		var xhr = new XMLHttpRequest();
		xhr.open('GET', window.config['ha_url'] + '/api/bootstrap');
		xhr.onload = function (e) {
			var data = JSON.parse(this.response);

			// Process entities
			for (var i = 0; i < data.states.length; i++) {
				self.emit('entity',data.states[i]);
			}

			// Store configuration
			//configuration = data;
		};
		xhr.send();
	}
	setEventStreamListener() {
		var self = this;
		if (!!window.EventSource) {

			var source = new EventSource(window.config['ha_url'] + '/api/stream?restrict=state_changed,component_loaded,service_registered');
			source.addEventListener('message', function (e) {

				// Skip ping messages
				if (e.data == 'ping') {
					return;
				}

				// Parse event
				var data = JSON.parse(e.data);

				// Process entity
				if (data.event_type == 'state_changed') {
					self.emit('entity',data.data.new_state);
				}

			}, false);

			source.addEventListener('open', function (e) {
				// Connection was opened.
			}, false);

			source.addEventListener('error', function (e) {
				if (e.readyState == EventSource.CLOSED) {
					// Connection was closed.
					// TODO: I think we should re-open.
				}
			}, false);

		} else {
			alert('This browser is not compatible since EventSource is not supported.');
		}
	}
	callService(domain, service, data, callback) {
		var self = this;
		// Setup new AJAX call
		var xhr = new XMLHttpRequest();
		xhr.open('POST', window.config['ha_url'] + '/api/services/' + domain + '/' + service);
		xhr.onload = function (e) {
			if (callback) {
				var data = JSON.parse(this.response);
				callback(data);
			}
		};
		xhr.send(JSON.stringify(data));
	}
}
export default HomeAssistantApi;
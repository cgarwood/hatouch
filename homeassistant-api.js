/**
 * A helper class to connect to the Home Assistant API.
 * Credit: michaelarnauts
 * @param ha_url
 * @param update_callback
 * @constructor
 */
function HomeAssistantApi(ha_url, update_callback) {

    /** @var array entities The internal representation of the entities */
    this.entities = {};

    /** @var array entities The configuration fetched from HASS */
    this.configuration = {};

    /** @var string ha_url The url to Home Assistant */
    this.ha_url = ha_url;

    /** @var callback update_callback The function that will be called to update an entity */
    this.update_callback = update_callback;

    /**
     * Calls the specified service in Home Assistant.
     *
     * Example:
     * HomeAssistantApi.callService('light', 'toggle', {'entity_id': 'light.living_room'}, function(result) {
     *   console.log(result);
     * });
     *
     * @param domain
     * @param service
     * @param data
     * @param callback
     */
    this.callService = function (domain, service, data, callback) {
		var self = this;
        // Setup new AJAX call
        var xhr = new XMLHttpRequest();
        xhr.open('POST', this.ha_url + '/api/services/' + domain + '/' + service);
        xhr.onload = function (e) {
            if (callback) {
                var data = JSON.parse(this.response);
                callback(data);
            }
        };
        xhr.send(JSON.stringify(data));
    };

    /**
     * Gets the configuration and initial state.
     */
    this.getConfiguration = function () {

        // Setup new AJAX call
        var xhr = new XMLHttpRequest();
        xhr.open('GET', this.ha_url + '/api/bootstrap');
        xhr.onload = function (e) {
            var data = JSON.parse(this.response);

            // Process entities
            for (var i = 0; i < data.states.length; i++) {
                HomeAssistantApi.processEntity(data.states[i]);
            }

            // Store configuration
            HomeAssistantApi.configuration = data;
        };
        xhr.send();
    };
	
	this.getHistory = function (entity, time, callback) {
		// Setup new AJAX call
        var xhr = new XMLHttpRequest();
		if (entity != null) { xhr.open('GET', this.ha_url + '/api/history/period/'+ time + '?filter_entity_id=' + entity); }
		else { xhr.open('GET', this.ha_url + '/api/history/period/'+ time); }
        
        xhr.onload = function (e) {
			var data = JSON.parse(this.response);
			callback(data);
		};
		xhr.send();
	}

    /**
     * Gets the current state of all entities.
     */
    this.getEntities = function () {

        // Clear current entities
        //this.entities = [];

        // Setup new AJAX call
        var xhr = new XMLHttpRequest();
        xhr.open('GET', this.ha_url + '/api/states');
        xhr.onload = function (e) {
            var data = JSON.parse(this.response);
            for (var i = 0; i < data.length; i++) {
                HomeAssistantApi.processEntity(data[i]);
            }
        };
        xhr.send();
    };

    /**
     * Setup the Event Stream Listener to update the UI in real-time.
     */
    this.setEventStreamListener = function () {
        if (!!window.EventSource) {

            var source = new EventSource(this.ha_url + '/api/stream?restrict=state_changed,component_loaded,service_registered');
            source.addEventListener('message', function (e) {

                // Skip ping messages
                if (e.data == 'ping') {
                    return;
                }

                // Parse event
                var data = JSON.parse(e.data);

                // Process entity
                if (data.event_type == 'state_changed') {
                    HomeAssistantApi.processEntity(data.data.new_state);
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
    };

    /**
     * Process a single entity and update the UI.
     * @param entity The entity that received an update.
     */
    this.processEntity = function (entity) {

        // Store entity in memory
        this.entities[entity.entity_id] = entity;

        // Execute callback
        this.update_callback(entity);
    };

}
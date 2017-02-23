import Vue from 'vue'
//import App from './App.vue'

Vue.component('light', require('../components/light.vue'));

Vue.component('camera', {
	props: ['entity'],
	template:'<div class="box box-primary">' +
				'<div class="box-header with-border">' +
					'<h3 class="box-title">{{entity[\'attributes\'][\'friendly_name\']}}</h3>' +
				'</div>' +
				'<div class="box-body">' +
					'<img v-bind:src="$root.config[\'ha_url\'] + entity[\'attributes\'][\'entity_picture\']" style="height:236px; margin: 0 auto;">' +
				'</div>' +
		'</div>',
});

new Vue({
	el: '#wrapper',
	//render: h => h(App),
	data: {
		loading: true,
		entities : {},
		config : window.config,
		time : '',
		date : '',
	},
	methods: {
		getTime() {
			var self = this;
			this.time = moment().format("h:mm:ssa");
			this.date = moment().format("M/D/YYYY");
		},
		getHAData() {
			var self = this;
			self.loading = true;
			var xhr = new XMLHttpRequest();
			xhr.open('GET', this.config['ha_url'] + '/api/bootstrap');
			xhr.onload = function (e) {
				var data = JSON.parse(this.response);

				// Process entities
				for (var i = 0; i < data.states.length; i++) {
					//self.entities[data.states[i]['entity_id']] = {}
					//self.entities[data.states[i]['entity_id']] = data.states[i];
					Vue.set(self.entities, data.states[i]['entity_id'], data.states[i]);
				}
				//this.entities = data.states;

				self.loading = false;
				
				console.log(self.entities);
				// Store configuration
				//HomeAssistantApi.configuration = data;
			};
			xhr.send();
		},
		toggleSwitch: function(entity_id) {
			HomeAssistantApi.callService('homeassistant', 'toggle', {"entity_id" : entity_id}, function(d) {console.log(d);});
		}
	},
	mounted: function() {
		this.getTime();
		this.getHAData();
		setInterval(this.getTime, 1000);
	}
})
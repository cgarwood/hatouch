var Vue = require('vue');

// Wait for DOM
$(document).on('DOMContentLoaded', function () {
	setTimeout(initVue, 1000);
});

function initVue() {
	Vue.component('light', {
		template: require('./components/light.vue'),
		methods: {
			toggleSwitch: function(entity_id) {
				HomeAssistantApi.callService('homeassistant', 'toggle', {"entity_id" : entity_id}, function(d) {console.log(d);});
			}
		}
	});

	window.app = new Vue({
		el: '#wrapper',
		data: {
			entities : {},
			time : '',
			date : '',
		},
		methods: {
			getTime() {
				var self = this;
				this.time = moment().format("h:mm:ssa");
				this.date = moment().format("M/D/YYYY");
			},
			toggleSwitch: function(entity_id) {
				HomeAssistantApi.callService('homeassistant', 'toggle', {"entity_id" : entity_id}, function(d) {console.log(d);});
			}
		},
		mounted: function() {
			this.getTime();
			setInterval(this.getTime, 1000);
		}
	});
}
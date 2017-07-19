import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import VueTouch from 'vue-touch'
import { modal } from 'vue-strap'
import VueSlider from 'vue-slider-component'
import moment from 'moment'
import VueTimeago from 'vue-timeago'
import CxltToastr from 'cxlt-vue2-toastr'

var $ = require('jquery');

Vue.use(Vuex);
Vue.use(VueTouch);
Vue.use(VueRouter);
Vue.use(VueTimeago, {
  name: 'timeago',
  locale: 'en-US',
  locales: {
    'en-US': require('vue-timeago/locales/en-US.json')
  }
});
Vue.use(CxltToastr, {
	position: 'bottom left',
	timeOut: 10000
})

//Import Route Components
import pgMain from './pages/pgMain.vue';
import pgClimate from './pages/pgClimate.vue';
import pgMedia from './pages/pgMedia.vue';
import pgSecurity from './pages/pgSecurity.vue';
import pgScreensaver from './pages/pgScreensaver.vue';

//Set up Vue Routes
const routes = [
	{ path: '/home', component: pgMain },
	{ path: '/', component: pgMain },
	{ path: '/climate', component: pgClimate },
	{ path: '/media', component: pgMedia },
	{ path: '/security', component: pgSecurity },
	{ path: '/screensaver', component: pgScreensaver }
];

const router = new VueRouter({routes});

//Set up Websocket
var ws;
var reconnectTimer=0;

//Set up Vue Store
const store = new Vuex.Store({
	state: {
		entities: {},
		notifications: []
	},
	mutations: {
		UPDATE_ENTITY(state, entity) {
			Vue.set(state.entities, entity['entity_id'], entity);
		},
		ADD_NOTIFICATION(state, notification) {
			console.log(notification);

			var lsNotifications = JSON.parse(localStorage.getItem("notifications"));
			//Add Timestamp
			notification.timestamp = new Date();
			notification.timestamp = notification.timestamp.getTime();
			//Mark as unread
			notification.read = false;
			//Add notification to list
			if (notification.data.persist !== false) {
				lsNotifications.unshift(notification);
				localStorage.setItem("notifications", JSON.stringify(lsNotifications));
				state.notifications = lsNotifications;
			}

			if (notification.data.sound) {
				var audio = new Audio();
				audio.src = 'sounds/'+notification.data.sound;
				audio.addEventListener('loadedmetadata', function() {
					console.log("Playing " + audio.src + ", for: " + audio.duration + "seconds.");
					audio.play();
					
					//Delay TTS until after sound plays (Fully Kiosk Browser only)
					if (typeof fully !== 'undefined' && typeof notification.data.tts !== 'undefined') {
						setTimeout(function() { fully.textToSpeech(notification.data.tts); }, Math.round(audio.duration) * 1000 + 500);
					}
				});
			}

			if (!notification.data.type) { notification.data.type = 'info'; }
			switch (notification.type) {
				case "success":
					app.$toast.success(notification);
					break;
				case "error":
					app.$toast.error(notification);
					break;
				case "warning":
					app.$toast.warn(notification);
					break;
				default:
					app.$toast.info(notification);
					break;
			}

			// If TTS but no sound, play the TTS immediately (Fully Kiosk Browser only)
			if (notification.data.tts && typeof notification.data.sound === 'undefined' && typeof fully !== 'undefined') {
				fully.textToSpeech(notification.data.tts);
			}

		},
		UPDATE_NOTIFICATIONS(state) {
			state.notifications = JSON.parse(localStorage.getItem("notifications"));
		}
	},
	actions: {
		CONNECT({commit}) {
			//Initialize local storage for notifications
			if (!localStorage.getItem("notifications")) { localStorage.setItem("notifications","[]"); }
			commit("UPDATE_NOTIFICATIONS");
			
			ws = new WebSocket('wss://'+window.config['ha_url']+'/api/websocket');
			ws.onopen = function() {
				app.$data['connectedWebsocket'] = true;
				
				//Clear the reconnect timer if we are reconnecting
				if (window.reconnectTimer) {
				   window.clearInterval(window.reconnectTimer);
				   window.reconnectTimer=0;
				}
				
				//Get all current states
				ws.send('{"id":"100","type":"get_states"}');
				
				//Subscribe to all events on the HomeAssistant Events Bus
				ws.send('{"id":"101","type":"subscribe_events"}');
			}
			ws.onmessage = function(e) {
				var data = JSON.parse(e.data);
				//console.log(data);
				if (data.type == "result" && data.id == 100) {
					//Initial state grab
					for (var i = 0; i < data.result.length; i++) {
						commit('UPDATE_ENTITY', data.result[i]);
					}
				}
				if (data.type == "event") {
					if (data.event.event_type == "state_changed") {
						commit('UPDATE_ENTITY', data.event.data.new_state);
					}
					if (data.event.event_type == "call_service") {
						if (data.event.data.domain == "notify" && data.event.data.service == "hatouch") {
							commit('ADD_NOTIFICATION', data.event.data.service_data);
						}
					}
				}
			}
			ws.onclose = function() {
				app.$data['connectedWebsocket'] = false;
				
				console.log('Websocket Disconnected. Attempting to reconnect.');
				
				//Start a timer to reconnect, if one hasn't already been started
				if(!window.reconnectTimer){
					window.reconnectTimer=setInterval(function(){app.$store.dispatch('CONNECT');}, 5000);
				}
			}
		}
	}
});

//Import UI Components
Vue.component('modal', modal);
Vue.component('vue-slider', VueSlider);
Vue.component('action', require('./components/action.vue'));
Vue.component('sensor', require('./components/sensor.vue'));
Vue.component('light', require('./components/light.vue'));
Vue.component('binary_sensor', require('./components/binary_sensor.vue'));

Vue.component('camera', {
	props: ['entity'],
	template:'<div class="box box-primary" v-if="entity">' +
				'<div class="box-header with-border">' +
					'<h3 class="box-title">{{entity[\'attributes\'][\'friendly_name\']}}</h3>' +
				'</div>' +
				'<div class="box-body">' +
					'<img v-bind:src="$root.config[\'ha_url\'] + entity[\'attributes\'][\'entity_picture\']" style="height:236px; margin: 0 auto;">' +
				'</div>' +
		'</div>',
});

const app = new Vue({
	el: '#app',
	store,
	router,
	data: {
		config : window.config,
		secrets: window.secrets,
		loaded : false,
		connectedWebsocket : false,
		time : '',
		timeVars : {
			hour : 0,
			min: 0,
			sec: 0,
			ampm: 'am',
			month: 1,
			day: 1,
			year: 2017,
			monthText: 'January',
			dayOfWeek: 'Sunday'
		},
		date : '',
		idleTime : 0,
		device : {
			battery_level : 0,
			is_plugged : false,
			screen_brightness: 0,
			screen_on: false,
			serial_number: '',
			device_id: '',
			wifi_ssid: '',
			ip4_address: '',
			ip6_address: '',
			mac_address: '',
		}
	},
	computed: {
		entities() {
			return this.$store.state.entities;
		},
		notifications() {
			return this.$store.state.notifications;
		},
		fullscreenView() {
			if (this.$route.path == "/screensaver") { return true; }
			else { return false; }
		}
	},
	created: function() {
		this.$store.dispatch('CONNECT');
		
		//Set up HA entities from Fully Kiosk Browser
		if (typeof fully !== 'undefined') {
			var self = this;
			//setInterval(self.updateDeviceEntities(), 60000);
			self.updateDeviceEntities();
		}
	},
	methods: {
		getTime() {
			this.time = moment().format("h:mm:ssa");
			this.date = moment().format("M/D/YYYY");
			this.timeVars.hour = moment().format("h");
			this.timeVars.min = moment().format("mm");
			this.timeVars.sec = moment().format("ss");
			this.timeVars.ampm = moment().format("a");
			this.timeVars.month = moment().format("M");
			this.timeVars.day = moment().format("D");
			this.timeVars.year = moment().format("YYYY");
			this.timeVars.monthText = moment().format("MMMM");
			this.timeVars.dayOfWeek = moment().format("dddd");
		},
		idleIncrement() {
			if (this.$route.path != '/screensaver') {
				this.idleTime++;
				if (this.idleTime > 300) {
					this.idleTime = 0;
					this.$router.replace('/screensaver');
				}
			}
		},
		idleReset() {
			this.idleTime = 0;
		},
		callService(domain, service, data, callback) {
			var id = new Date();
			id = id.getTime();
			
			var wsData = {
				"id": id,
				"type" : "call_service",
				"domain" : domain,
				"service" : service,
				"service_data" : data
			}
			ws.send(JSON.stringify(wsData));
		},
		clearNotifications() {
			localStorage.setItem("notifications","[]");
			this.$store.commit("UPDATE_NOTIFICATIONS");
		},
		updateDeviceEntities() {
			//TODO: Update battery info on a timer. Update network info when network disconnected or reconnected. Update is_plugged on event listener

			//Grab device data from Fully Kiosk Browser & use HA REST API to send the data. Update on a timer.
			this.device.battery_level = fully.getBatteryLevel();
			this.device.is_plugged = fully.isPlugged();
			this.device.screen_brightness = fully.getScreenBrightness();
			this.device.screen_on = fully.getScreenOn();
			this.device.ip4_address = fully.getIp4Address();
			this.device.ip6_address = fully.getIp6Address();
			this.device.mac_address = fully.getMacAddress();
			this.device.wifi_ssid = fully.getWifiSsid();

			//Update HomeAssistant Entities
			var self = this;
			var xhr = new XMLHttpRequest();
			xhr.open('POST', 'https://' + window.config.ha_url + '/api/states/sensor.hatouch_'+window.config.entity_id+'_network');
			xhr.send(JSON.stringify({'state': '', 'attributes' : {
				'ip4_address' : self.device.ip4_address,
				'ip6_address' : self.device.ip6_address,
				'mac_address' : self.device.mac_address,
				'wifi_ssid' : self.device.wifi_ssid
			}}));
			var xhr2 = new XMLHttpRequest();
			xhr2.open('POST', 'https://' + window.config.ha_url + '/api/states/binary_sensor.hatouch_'+window.config.entity_id+'_screen');
			xhr2.send(JSON.stringify({'state': (self.device.screen_on == true) ? 'on' : 'off', 'attributes' : {
				'brightness' : self.device.screen_brightness
			}}));
			var xhr3 = new XMLHttpRequest();
			xhr3.open('POST', 'https://' + window.config.ha_url + '/api/states/binary_sensor.hatouch_'+window.config.entity_id+'_is_plugged');
			xhr3.send(JSON.stringify({'state': (self.device.is_plugged  == true) ? 'on' : 'off'}));
			var xhr4 = new XMLHttpRequest();
			xhr4.open('POST', 'https://' + window.config.ha_url + '/api/states/sensor.hatouch_'+window.config.entity_id+'_battery_level');
			xhr4.send(JSON.stringify({'state': self.device.battery_level}));

		}
	},
	mounted: function() {
		this.getTime();
		setInterval(this.getTime, 1000);
		setInterval(this.idleIncrement, 1000);
		this.$data['loaded'] = true;
	},
})
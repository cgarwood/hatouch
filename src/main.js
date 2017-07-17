import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import VueTouch from 'vue-touch'
import { modal } from 'vue-strap'
import VueSlider from 'vue-slider-component'
import moment from 'moment'
import VueTimeago from 'vue-timeago'

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
			var lsNotifications = JSON.parse(localStorage.getItem("notifications"));
			//Add Timestamp
			notification.timestamp = new Date();
			notification.timestamp = notification.timestamp.getTime();
			//Mark as unread
			notification.read = false;
			//Add notification to list
			lsNotifications.unshift(notification);
			localStorage.setItem("notifications", JSON.stringify(lsNotifications));
			state.notifications = lsNotifications;

			if (notification.data.sound) {
				var audio = new Audio('sounds/'+notification.data.sound);
				audio.play();
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
					window.reconnectTimer=setInterval(function(){commit('CONNECT');}, 5000);
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
		}
	},
	mounted: function() {
		this.getTime();
		setInterval(this.getTime, 1000);
		setInterval(this.idleIncrement, 1000);
		this.$data['loaded'] = true;
	},
})
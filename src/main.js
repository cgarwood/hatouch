import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import VueTouch from 'vue-touch'
import { modal } from 'vue-strap'
import VueSlider from 'vue-slider-component'
import moment from 'moment'

var $ = require('jquery');

Vue.use(Vuex);
Vue.use(VueTouch);
Vue.use(VueRouter);

//Import Route Components
import pgMain from './pages/pgMain.vue';
import pgClimate from './pages/pgClimate.vue';
import pgMedia from './pages/pgMedia.vue';
import pgSecurity from './pages/pgSecurity.vue';

//Set up Vue Routes
const routes = [
	{ path: '/home', component: pgMain },
	{ path: '/', component: pgMain },
	{ path: '/climate', component: pgClimate },
	{ path: '/media', component: pgMedia },
	{ path: '/security', component: pgSecurity },
];

const router = new VueRouter({routes});

//Set up Websocket
var ws;
var reconnectTimer=0;

//Set up Vue Store
const store = new Vuex.Store({
	state: {
		entities: {}
	},
	mutations: {
		UPDATE_ENTITY(state, entity) {
			Vue.set(state.entities, entity['entity_id'], entity);
		}
	},
	actions: {
		CONNECT({commit}) {
			ws = new WebSocket('wss://'+window.config['ha_url']+'/api/websocket');
			ws.onopen = function() {
				app.$data['connectedWebsocket'] = true;
				
				//Clear the reconnect timer if we are reconnecting
				if (window.reconnectTimer) {
				   window.clearInterval(window.reconnectTimer);
				   window.reconnectTimer=0;
				}
				
				var id = new Date();
				id = id.getTime();
				
				//Get all current states
				ws.send('{"id":"100","type":"get_states"}');
				
				//Subscribe to all events on the HomeAssistant Events Bus
				ws.send('{"id":"'+id+'","type":"subscribe_events"}');
			}
			ws.onmessage = function(e) {
				var data = JSON.parse(e.data);
				console.log(data);
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
				}
			}
			ws.onclose = function() {
				app.$data['connectedWebsocket'] = false;
				
				console.log('Websocket Disconnected. Attempting to reconnect.');
				
				//Start a timer to reconnect, if one hasn't already been started
				if(!window.reconnectTimer){
					window.reconnectTimer=setInterval(function(){connectWebsocket()}, 5000);
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
	el: '#wrapper',
	store,
	router,
	data: {
		config : window.config,
		loaded : false,
		connectedWebsocket : false,
		time : '',
		date : '',
	},
	computed: {
		entities() {
			return this.$store.state.entities;
		}
	},
	created: function() {
		this.$store.dispatch('CONNECT');
	},
	methods: {
		getTime() {
			var self = this;
			this.time = moment().format("h:mm:ssa");
			this.date = moment().format("M/D/YYYY");
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
	},
	mounted: function() {
		this.getTime();
		setInterval(this.getTime, 1000);
	}
})
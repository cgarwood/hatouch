import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import VueTouch from 'vue-touch'
import { modal } from 'vue-strap'
import VueSlider from 'vue-slider-component'
import moment from 'moment'
import HomeAssistantApi from './homeassistant-api.js'

var $ = require('jquery');

Vue.use(Vuex);
Vue.use(VueTouch);
Vue.use(VueRouter);

//Import Route Components
import pgMain from './pages/pgMain.vue';
import pgClimate from './pages/pgClimate.vue';
import pgMedia from './pages/pgMedia.vue';
import pgSecurity from './pages/pgSecurity.vue';

//Setup Vue Routes
const routes = [
	{ path: '/home', component: pgMain },
	{ path: '/', component: pgMain },
	{ path: '/climate', component: pgClimate },
	{ path: '/media', component: pgMedia },
	{ path: '/security', component: pgSecurity },
];

const router = new VueRouter({routes});

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
			const haapi = new HomeAssistantApi(window.config['ha_url']);
			haapi.on('entity', (entity) => {
				commit('UPDATE_ENTITY', entity);
			});
			haapi.connect();
			haapi.setEventStreamListener();
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

new Vue({
	el: '#wrapper',
	store,
	router,
	data: {
		config : window.config,
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
			const haapi = new HomeAssistantApi(window.config['ha_url']);
			haapi.callService(domain, service, data, callback);
		},
	},
	mounted: function() {
		this.getTime();
		setInterval(this.getTime, 1000);
	}
})
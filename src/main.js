import Vue from 'vue'
import Vuex from 'vuex'
import HomeAssistantApi from './homeassistant-api.js'
//import App from './App.vue'

Vue.use(Vuex);

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

Vue.component('basic-entity', require('./components/basic-entity.vue'));
Vue.component('light', require('./components/light.vue'));

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
	store,
	data: {
		loading: true,
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
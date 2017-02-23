import Vue from 'vue'
import Vuex from 'vuex'
import HomeAssistantApi from './homeassistant-api.js'
//import App from './App.vue'
/*
var haapi = new HomeAssistantApi(window.config['ha_url']);
haapi.getConfiguration();
haapi.setEventStreamListener();
*/
Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		entities: {}
	},
	mutations: {
		UPDATE_ENTITY(state, entity) {
			//state.entities[entity['entity_id']] = entity;
			Vue.set(state.entities, entity['entity_id'], entity);
		}
	},
	actions: {
		CONNECT({commit}) {
			const api = new HomeAssistantApi(window.config['ha_url']);
			api.on('entity', (entity) => {
				commit('UPDATE_ENTITY', entity);
			});
			api.connect();
			api.setEventStreamListener();
		}
	}
});

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
	store,
	data: {
		loading: true,
		config : window.config,
		time : '',
		date : '',
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
		toggleSwitch: function(entity_id) {
			haapi.callService('homeassistant', 'toggle', {"entity_id" : entity_id}, function(d) {console.log(d);});
		}
	},
	mounted: function() {
		this.getTime();
		setInterval(this.getTime, 1000);
	}
})
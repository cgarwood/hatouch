<template>
	<div v-if="entity">
		<v-touch v-on:press="toggleModal()" v-on:tap="toggleSwitch(entity['entity_id'])">
		<div class="info-box">
			<span class="info-box-icon" v-bind:class="[(entity['state'] == 'on') ? 'bg-yellow' : 'bg-black']"><i class="fa" :class="iconClass"></i></span>
			<div class="info-box-content">
				<span class="info-box-text">{{(title == undefined) ? entity['attributes']['friendly_name'] : title}}</span>
				<span class="info-box-number">{{entity['state']}}</span>
			</div>
		</div>
		</v-touch>
		
		<modal :value="modalVisible">
			<div slot="modal-header" class="modal-header">
				<button type="button" class="close" @click="toggleModal()"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title"><i class="fa" :class="icon"></i> {{entity['attributes']['friendly_name']}}</h4>
			</div>
			<div slot="modal-body" class="modal-body">
				Brightness: {{entity['attributes']['brightness']}}
				<vue-slider @callback="sliderMoved" v-model="entity['attributes']['brightness']" :min="0" :max="255" :real-time="true" ref="slider" :entity_id="entity['entity_id']"></vue-slider>
			</div>
			<div slot="modal-footer"></div>
		</modal>
		
	</div>
	<div v-else>
		<div class="info-box">
			Loading...
		</div>
	</div>
	
</template>

<script>
import _ from 'lodash';

export default {
	computed: {
		entity() {
			return this.$store.state.entities[this.entity_id];
		},
		entities() {
			return this.$store.state.entities;
		},
		modalID() {
			return 'modal-' + this.entity_id;
		}
	},
	
	props: {
		entity_id : {
			type: String,
			required: true,
		},
		icon : {
			type: String,
			default: "fa-lightbulb-o"
		},
		title : {
			type: String
		}
	},
	methods: {
		toggleSwitch: function(entity_id) {
			this.$parent.$parent.callService('homeassistant', 'toggle', {"entity_id":entity_id});
			this.iconClass = "fa-spinner fa-spin";
		},
		toggleModal: function() {
			this.modalVisible = !this.modalVisible;
			var self = this;
			setTimeout(function() {self.$refs.slider.refresh();}, 100);
		},
		sliderMoved: _.debounce(function(val) {
			if (val > 0) {
				var self = this;
				console.log(val);
				this.$parent.$parent.callService('light', 'turn_on', {"entity_id":this.entity.entity_id,"brightness":val});
			} else {
				this.$parent.$parent.callService('light', 'turn_off', {"entity_id":this.entity.entity_id});
			}
		}, 500),
		setBrightness: function(entity_id, brightness) {
			if (brightness > 0) {
				this.$parent.$parent.callService('light', 'turn_on', {"entity_id":entity_id,"brightness":brightness});
			} else {
				this.$parent.$parent.callService('light', 'turn_off', {"entity_id":entity_id});
			}
		}
	},
	
	data: function() {
		return {
			modalVisible: false,
			iconClass: this.icon
		}
	},
	
	watch: {
		entity: function(val) {
			this.iconClass = this.icon;
		}
	}
}
</script>
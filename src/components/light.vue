<template>
	<div v-if="entity">
		<v-touch v-on:press="toggleModal()" v-on:click="toggleSwitch(entity['entity_id'])">
		<div class="info-box">
			<span class="info-box-icon" v-bind:class="[(entity['state'] == 'on') ? 'bg-yellow' : 'bg-black']"><i class="fa" :class="icon"></i></span>
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
				<!-- <vue-slider :value="entity['attributes']['brightness']" :min="0" :max="255"></vue-slider> -->
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
module.exports = {
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
		toggleSwitch(entity_id) {
			this.$parent.callService('homeassistant', 'toggle', {"entity_id":entity_id});
		},
		toggleModal() {
			this.modalVisible = !this.modalVisible;
		}
	},
	
	data: function() {
		return {
			modalVisible: false
		}
	}
}
</script>
<template>
	<div v-if="entity" v-on:click="toggleSwitch(entity['entity_id'])" class="info-box">
		<span class="info-box-icon" v-bind:class="[(entity['state'] == 'on') ? 'bg-yellow' : 'bg-black']"><i class="fa" :class="icon"></i></span>
		<div class="info-box-content">
		<span class="info-box-text">{{(title == undefined) ? entity['attributes']['friendly_name'] : title}}</span>
			<span class="info-box-number">{{entity['state']}}</span>
		</div>
	</div>
	<div v-else class="info-box">
		Loading...
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
		}
	}
}
</script>
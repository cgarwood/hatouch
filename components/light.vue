<template>
	<div v-if="entity" class="info-box">
		<span class="info-box-icon" v-bind:class="[(entity['state'] == 'on') ? 'bg-yellow' : 'bg-black']"><i class="fa" :class="icon"></i></span>
		<div class="info-box-content">
		<span class="info-box-text">{{entity['attributes']['friendly_name']}}</span>
			<span class="info-box-number">{{entity['state']}}</span>
		</div>
	</div>
	<div v-else class="info-box">
		<ul>
		<li v-for="e in entities">
		{{ e }}
		</li>
		</ul>
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
		}
	},
	
}
</script>
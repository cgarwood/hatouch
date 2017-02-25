<template>
	<div v-if="entity" class="info-box">
		<span class="info-box-icon" :class="colorClass"><i class="fa" :class="icon"></i></span>
		<div class="info-box-content">
		<span class="info-box-text">{{(title == undefined) ? entity['attributes']['friendly_name'] : title}}</span>
			<span class="info-box-number">{{entity['state']}}{{entity['attributes']['unit_of_measurement']}}</span>
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
	},
	
	props: {
		entity_id : {
			type: String,
			required: true,
		},
		title : {
			type: String
		},
		icon : {
			type: String,
			default: "fa-lightbulb-o"
		},
		colorClass : {
			type: String,
			default: "bg-black"
		}
	}
}
</script>
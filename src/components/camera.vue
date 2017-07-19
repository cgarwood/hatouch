<template>
	<div class="box box-primary" v-if="entity">
		<div class="box-header with-border">
			<h3 class="box-title">{{(title == undefined) ? entity['attributes']['friendly_name'] : title}}</h3>
		</div>
		<div class="box-body">
			<img v-bind:src="imgSrc" style="height:236px; margin: 0 auto;">
		</div>
	</div>
</template>

<script>
module.exports = {
	computed: {
		entity() {
			return this.$store.state.entities[this.entity_id];
		},
		config() {
			return window.config;
		},
		imgSrc() {
			return '//' + window.config['ha_url'] + this.entity['attributes']['entity_picture'];
		}
	},
	props: {
		entity_id : {
			type: String,
			required: true,
		},
		title : {
			type: String
		},
	}
}
</script>
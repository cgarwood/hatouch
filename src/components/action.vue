<template>
	<div class="info-box" v-on:click="callEvent(entity_id)" :class="colorClass">
		<span class="info-box-icon"><i class="fa" :class="icon"></i></span>
		<div class="info-box-content">
			<span class="info-box-text">Quick Actions</span>
			<span class="info-box-number">{{title}}</span>
			<span class="info-box-text" style="text-transform: none; white-space: normal; line-height: 16px;">{{description}}</span>
		</div>
	</div>
</template>

<script>
module.exports = {
	computed: {
		entities() {
			return this.$store.state.entities;
		}
	},
	
	props: {
		entity_id : {
			type: String
		},
		icon : {
			type: String,
			default: "fa-hand-pointer-o"
		},
		title : {
			type: String
		},
		description : {
			type: String,
			default: ''
		},
		action : {
			type: String
		},
		colorClass : {
			type: String,
			default: "bg-aqua"
		}
	},
	
	methods: {
		callEvent(entity_id) {
			service = entity_id.split(".");
			if (service[0] == "scene") {
				this.$parent.callService('scene', 'turn_on', {"entity_id":entity_id});
			}
			else if (service[0] == "script") {
				this.$parent.callService('script', 'turn_on', {"entity_id":entity_id});
			}
		},
	}
}
</script>
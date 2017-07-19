<template>
	<div v-if="entity" class="info-box">
		<span class="info-box-icon" :class="colorClass"><i class="fa" :class="icon"></i></span>
		<div class="info-box-content">
		<span class="info-box-text">{{(title == undefined) ? entity['attributes']['friendly_name'] : title}}</span>
			<span class="info-box-number">{{stateText}}</span>
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
		colorClass() {
			if (this.$store.state.entities[this.entity_id]['state'] == 'on') {
				return this.$props.on_colorClass;
			} else if (this.$store.state.entities[this.entity_id]['state'] == 'off') {
				return this.$props.off_colorClass;
			} else {
				return 'bg-black';
			}
		},
		icon() {
			if (this.$store.state.entities[this.entity_id]['state'] == 'on') {
				return this.$props.on_icon;
			} else if (this.$store.state.entities[this.entity_id]['state'] == 'off') {
				return this.$props.off_icon;
			} else {
				return 'fa-circle-thin';
			}
		},
		stateText() {
			if (this.$store.state.entities[this.entity_id]['state'] == 'on') {
				return this.$props.on_text;
			} else if (this.$store.state.entities[this.entity_id]['state'] == 'off') {
				return this.$props.off_text;
			} else {
				return 'unknown';
			}
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
		on_icon : {
			type: String,
			default: "fa-circle-thin"
		},
		off_icon : {
			type: String,
			default: "fa-circle-thin"
		},
		on_text : {
			type: String,
			default: "on"
		},
		off_text : {
			type: String,
			default: "off"
		},
		on_colorClass : {
			type: String,
			default: "bg-black"
		},
		off_colorClass : {
			type: String,
			default: "bg-black"
		}
	}
}
</script>
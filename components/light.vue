<template>
	<div v-if="$root.entities[entity]" class="info-box">
		<span class="info-box-icon" v-bind:class="[($root.entities[entity]['state'] == 'on') ? 'bg-yellow' : 'bg-black']"><i class="fa" :class="icon"></i></span>
		<div class="info-box-content">
		<span class="info-box-text">{{$root.entities[entity]['attributes']['friendly_name']}}</span>
			<span class="info-box-number">{{$root.entities[entity]['state']}}</span>
		</div>
	</div>
	<div v-else class="info-box">
		nope
	</div>
</template>

<script>

module.exports = {
	props: {
		entity : {
			type: String,
			required: true,
		},
		icon : {
			type: String,
			default: "fa-lightbulb-o"
		}
	},
	
	
	data () {
		return {
			msg: 'test'
		}
	}
	
}

</script>
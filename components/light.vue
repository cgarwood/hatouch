<template>
	<div class="info-box" v-on:click="toggleSwitch(HomeAssistantApi['entities'][entity]['entity_id'])">
		<span class="info-box-icon" v-bind:class="[(HomeAssistantApi['entities'][entity]['state'] == 'on') ? 'bg-yellow' : 'bg-black']"><i class="fa fa-lightbulb-o"></i></span>
		<div class="info-box-content">
		<span class="info-box-text">{{HomeAssistantApi['entities'][entity]['attributes']['friendly_name']}}</span>
			<span class="info-box-number">{{HomeAssistantApi['entities'][entity]['state']}}</span>
		</div>
	</div>
</template>

<script>

module.exports = {
	props: ['entity'],
	
	/*
	data () {
		return {
			msg: 'test'
		}
	}*/
	
}

</script>
<div class="info-box" v-on:click="toggleSwitch(entity['entity_id'])">
	<span class="info-box-icon" v-bind:class="[(entity['state'] == 'on') ? 'bg-yellow' : 'bg-black']"><i class="fa fa-lightbulb-o"></i></span>
	<div class="info-box-content">
	<span class="info-box-text">{{entity['attributes']['friendly_name']}}</span>
		<span class="info-box-number">{{entity['state']}}</span>
	</div>
</div>
<template>
<section class="content" v-cloak>
	<div class="row">
		<div class="col-md-6">
			<div class="row">
				<div class="col-sm-6">
					<sensor entity_id="sensor.hallway_thermostat_temperature" title="Indoor Temperature" icon="fa-home" color-class="bg-red"></sensor>
				</div>
				<div class="col-sm-6">
					<sensor entity_id="sensor.energy_meter_power_9_4" icon="fa-bolt" color-class="bg-yellow"></sensor>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-6">
					<light entity_id="light.front_porch"></light>
				</div>
				<div class="col-sm-6">
					<light entity_id="light.living_room"></light>
				</div>
			</div>
		</div>
		<div class="col-md-6">
			<div v-if="entities['sensor.pws_weather']" class="box box-widget widget-user">
				<!-- Add the bg color to the header using any of the bg-* classes -->
				<div class="widget-user-header bg-black" style="background: url('images/fountain.jpg') center center; background-size: cover; height: 108px;">
				<h3 class="widget-user-username" style="font-weight: bold;">Current Conditions</h3>
				<h5 class="widget-user-desc">Home</h5>
				</div>
				<div class="widget-user-image" style="top: 50px;">
				<img class="img-circle" :src="entities['sensor.pws_weather']['attributes']['entity_picture']" :alt="entities['sensor.pws_weather']['state']" style="background-color:white;">
				</div>
				<div class="box-footer" style="padding-top: 20px;">
					<div class="row">
						<div class="col-sm-4 border-right">
						<div class="description-block">
							<h5 class="description-header">{{entities['sensor.pws_temp_f']['state']}}{{entities['sensor.pws_temp_f']['attributes']['unit_of_measurement']}}</h5>
							<span class="description-text">TEMP</span>
						</div>
						</div>
						<div class="col-sm-4 border-right">
						<div class="description-block">
							<h5 class="description-header">{{entities['sensor.pws_relative_humidity']['state']}}{{entities['sensor.pws_relative_humidity']['attributes']['unit_of_measurement']}}</h5>
							<span class="description-text">HUMIDITY</span>
						</div>
						</div>
						<div class="col-sm-4">
						<div class="description-block">
							<h5 class="description-header">{{entities['sensor.pws_wind_dir']['state'].substring(0,1)}} {{entities['sensor.pws_wind_mph']['state']}}{{entities['sensor.pws_wind_mph']['attributes']['unit_of_measurement']}}</h5>
							<span class="description-text">WIND</span>
						</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<div class="row">
		<div class="col-sm-6">
			<div class="row">
				<div class="col-sm-6">
					<light entity_id="light.back_porch"></light>
				</div>
				<div class="col-sm-6">
					<light entity_id="light.hallway"></light>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-12">
					<div class="box box-primary">
						<div class="box-header with-border">
						<h3 class="box-title">Temperature History</h3>
						</div>
						<div class="box-body">
						<div class="chart">
							<canvas id="areaChart" style="height: 128px;" height="128"></canvas>
						</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-sm-6">
			<action title="Baby's Bedtime" icon="fa-bed" description="Dims living room lights, turns on cabinet lights. Turns off other lights" entity_id="scene.baby_bedtime"></action>
			<action title="Goodbye" icon="fa-automobile" description="Turns on porch light for 3 minutes (after dark)." entity_id="script.goodbye_lights"></action>
			<action title="Goodnight" icon="fa-bed" description="Turns off all lights. Turns on dim cabinet lights." entity_id="script.goodnight"></action>
		</div>
	</div>
</section>
</template>

<script>
module.exports = {
	computed: {
		entities() {
			return this.$store.state.entities;
		},
	},
}
</script>
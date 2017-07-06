<template>
<section class="content" v-cloak>
	<div class="row">
		<div class="col-md-6">
			<div class="row">
				<div class="col-sm-6">
					<sensor entity_id="sensor.hallway_thermostat_temperature" title="Indoor Temperature" icon="fa-sun-o" color-class="bg-aqua"></sensor>
				</div>
				<div class="col-sm-6">
					<sensor entity_id="sensor.hallway_thermostat_humidity" title="Indoor Humidity" icon="fa-tint" color-class="bg-aqua"></sensor>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-6">
					<sensor entity_id="sensor.garage_multisensor_temperature_8_1" title="Garage Temperature" icon="fa-sun-o" color-class="bg-aqua"></sensor>
				</div>
				<div class="col-sm-6">
					<sensor entity_id="sensor.garage_multisensor_relative_humidity_8_5" title="Garage Humidity" icon="fa-tint" color-class="bg-aqua"></sensor>
				</div>
			</div>
		</div>
		<div class="col-md-6">
			<div class="box box-widget widget-user" v-if="entities['sensor.pws_weather']">
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

		<div class="col-sm-4">
			<sensor entity_id="sensor.hallway_thermostat_target" title="Setpoint" icon="fa-dashboard" color-class="bg-black"></sensor>
		</div>
		<div class="col-sm-4">
			<sensor entity_id="sensor.hallway_thermostat_operation_mode" title="Mode" icon="fa-dashboard" color-class="bg-black"></sensor>
		</div>
		<div class="col-sm-4">
			<sensor entity_id="sensor.hallway_thermostat_hvac_state" title="Status" icon="fa-dashboard" color-class="bg-black"></sensor>
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
					<canvas id="areaChart" style="height: 140px;" height="140"></canvas>
				</div>
				</div>
			</div>
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
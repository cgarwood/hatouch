<template>
	<section class="content" v-cloak>
	<div class="row">
		<div class="col-md-6">
			<div class="row">
				<div class="col-sm-6">
					<binary_sensor entity_id="binary_sensor.front_door_sensor" title="Front Door" on_text="Open" off_text="Closed" on_colorClass="bg-red" off_colorClass="bg-green" on_icon="fa-exclamation-circle" off_icon="fa-circle-o"></binary_sensor>
				</div>
				<div class="col-sm-6">
					<binary_sensor entity_id="binary_sensor.back_door_sensor" title="Back Door" on_text="Open" off_text="Closed" on_colorClass="bg-red" off_colorClass="bg-green" on_icon="fa-exclamation-circle" off_icon="fa-circle-o"></binary_sensor>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-6">
					<div class="info-box">
						<span class="info-box-icon bg-red"><i class="fa fa-unlock"></i></span>
						<div class="info-box-content">
							<span class="info-box-text">Front Door</span>
							<span class="info-box-number">Unlocked</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-md-6">
			<div class="info-box bg-yellow">
				<span class="info-box-icon"><i class="fa fa-flash"></i></span>
				<div class="info-box-content">
					<span class="info-box-text">Quick Actions</span>
					<span class="info-box-number">Lights on</span>
					<span class="info-box-text" style="text-transform: none; white-space: normal; line-height: 16px;"><em>Turns on lights in living areas and outdoors.</em></span>
				</div>
			</div>
			<div class="info-box bg-yellow">
				<span class="info-box-icon"><i class="fa fa-lock"></i></span>
				<div class="info-box-content">
					<span class="info-box-text">Quick Actions</span>
					<span class="info-box-number">Lock All Doors</span>
					<span class="info-box-text" style="text-transform: none; white-space: normal; line-height: 16px;"><em>Locks all doors with electronic locks.</em></span>
				</div>
			</div>
		</div>
	</div>
	
	<div class="row">
		<div class="col-sm-6">
			<div class="row">
				<div class="col-sm-12">
					<camera entity_id="camera.driveway_cam"></camera>
				</div>
			</div>
		</div>
		<div class="col-sm-6">
			<div class="row">
				<div class="col-sm-12">
					<!-- <camera :entity="entities['camera.driveway_cam']"></camera> -->
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
<template>
	<section class="content" v-cloak>
	<div class="row">
		<div class="col-md-6">
			<div class="row">
				<div class="col-sm-6">
					<div class="info-box" v-if="entities['binary_sensor.front_door_sensor']">
						<span class="info-box-icon bg-red"><i class="fa fa-home"></i></span>
						<div class="info-box-content">
							<span class="info-box-text">Front Door</span>
							<span class="info-box-number">{{(entities['binary_sensor.front_door_sensor']['state'] == 'on') ? 'Open' : 'Closed'}}</span>
						</div>
					</div>
				</div>
				<div class="col-sm-6">
					<div class="info-box" v-if="entities['binary_sensor.back_door_sensor']">
						<span class="info-box-icon bg-green"><i class="fa fa-home"></i></span>
						<div class="info-box-content">
							<span class="info-box-text">Back Door</span>
							<span class="info-box-number">{{(entities['binary_sensor.back_door_sensor']['state'] == 'on') ? 'Open' : 'Closed'}}</span>
						</div>
					</div>
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
				<div class="col-sm-6">
					<div class="info-box">
						<span class="info-box-icon bg-green"><i class="fa fa-lock"></i></span>
						<div class="info-box-content">
							<span class="info-box-text">Back Door</span>
							<span class="info-box-number">Locked</span>
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
					<camera :entity="entities['camera.driveway_cam']"></camera>
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
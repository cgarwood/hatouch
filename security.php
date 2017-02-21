<?php include('header.php'); ?>

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
	<!-- Content Header (Page header) -->
	<!-- <section class="content-header">
	<h1>
		Dashboard
		<small>Optional description</small>
	</h1>
	<ol class="breadcrumb">
		<li><a href="#"><i class="fa fa-dashboard"></i> Level</a></li>
		<li class="active">Here</li>
	</ol>
	</section> -->

	<!-- Main content -->
	<section class="content">
	<div class="row">
		<div class="col-md-6">
			<div class="row">
				<div class="col-sm-6">
					<div class="info-box">
						<span class="info-box-icon bg-red"><i class="fa fa-home"></i></span>
						<div class="info-box-content">
							<span class="info-box-text">Front Door</span>
							<span class="info-box-number">{{(entities['binary_sensor.front_door_sensor_3_0']['state'] == 'on') ? 'Open' : 'Closed'}}</span>
						</div>
					</div>
				</div>
				<div class="col-sm-6">
					<div class="info-box">
						<span class="info-box-icon bg-green"><i class="fa fa-home"></i></span>
						<div class="info-box-content">
							<span class="info-box-text">Back Door</span>
							<span class="info-box-number">{{(entities['binary_sensor.back_door_sensor_4_0']['state'] == 'on') ? 'Open' : 'Closed'}}</span>
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
					<camera :entity="entities['camera.driveway_cam']"></camera>
				</div>
			</div>
		</div>
	</div>

	</section>
	<!-- /.content -->
</div>
<!-- /.content-wrapper -->

<!-- Main Footer -->
<!--
<footer class="main-footer">

	<div class="pull-right hidden-xs">
	<strong>{{time}}</strong> {{date}}
	</div>

	<strong>Copyright &copy; 2016 <a href="#">Company</a>.</strong> All rights reserved.
</footer>
-->
</div>
<?php include('footer.php'); ?>
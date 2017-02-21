<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Home Dashboard</title>
	<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">


	<link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css">
	<link rel="stylesheet" href="dist/css/AdminLTE.min.css">

	<!-- AdminLTE Skins. Choose a skin from the css/skins
		folder instead of downloading all of them to reduce the load. -->
	<link rel="stylesheet" href="dist/css/skins/_all-skins.min.css">

	<!-- Scripts -->
	<script src="plugins/jQuery/jquery-2.2.3.min.js"></script>
	<script type="text/javascript" src="config.js"></script>
	<script type="text/javascript" src="homeassistant-api.js"></script>
	<script type="text/javascript" src="vue.js"></script>
	
	<style type="text/css">
		.navbar-nav>.messages-menu>.dropdown-menu>li .menu>li>a>h4 { margin-left: 0; }
		.navbar-nav>.messages-menu>.dropdown-menu>li .menu>li>a>p { margin-left: 0; }
	</style>
	
</head>
<body class="hold-transition skin-blue sidebar-mini sidebar-collapse fixed">

	<div class="wrapper" id="wrapper">

	<!-- Main Header -->
	<header class="main-header">

		<!-- Logo -->
		<a href="index.php" class="logo">
		<!-- mini logo for sidebar mini 50x50 pixels -->
		<span class="logo-mini"><b>H</b></span>
		<!-- logo for regular state and mobile devices -->
		<span class="logo-lg">Welcome <b>Home</b></span>
		</a>

		<!-- Header Navbar -->
		<nav class="navbar navbar-static-top" role="navigation">
		<!-- Sidebar toggle button-->
		<a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
			<span class="sr-only">Toggle navigation</span>
		</a>
		<!-- Navbar Right Menu -->
		<div class="navbar-custom-menu">
			<ul class="nav navbar-nav">
			<!-- Messages: style can be found in dropdown.less-->
			<li class="dropdown messages-menu">
				<!-- Menu toggle button -->
				<a href="#" class="dropdown-toggle" data-toggle="dropdown">
				<i class="fa fa-envelope-o"></i>
				<span class="label label-warning">2</span>
				</a>
				<ul class="dropdown-menu">
				<li class="header">You have 2 messages</li>
				<li>
					<!-- inner menu: contains the messages -->
					<ul class="menu">
					
					<li>
						<a href="#">
						<h4>
							<i class="fa fa-trash text-green"></i> Garbage Day
							<small><i class="fa fa-clock-o"></i> 5 mins</small>
						</h4>
						<p>Don't forget to take out the trash!</p>
						</a>
					</li>
					<li>
						<a href="#">
						<h4>
							Door Left Open
							<small><i class="fa fa-clock-o"></i> 15 mins</small>
						</h4>
						<p>The Front Door has been open for more than 15 minutes with HVAC still on.</p>
						</a>
					</li>
					
					</ul>
					<!-- /.menu -->
				</li>
				<li class="footer"><a href="#">See All Messages</a></li>
				</ul>
			</li>
			<!-- /.messages-menu -->

			<!-- User Account Menu -->
			<li class="dropdown user user-menu">
				<!-- Menu Toggle Button -->
				<a href="#" class="dropdown-toggle" data-toggle="dropdown">
				<!-- The user image in the navbar-->
				<!-- <img src="dist/img/user2-160x160.jpg" class="user-image" alt="User Image"> -->
				<!-- hidden-xs hides the username on small devices so only the image appears. -->
				<span class="hidden-xs">Living Room</span>
				</a>
				<ul class="dropdown-menu">
				<!-- The user image in the menu -->
				<li class="user-header">
					<img src="dist/img/user2-160x160.jpg" class="img-circle" alt="User Image">

					<p>
					your name here
					<small>Member since Nov. 2012</small>
					</p>
				</li>
				<!-- Menu Body -->
				<li class="user-body">
					<div class="row">
					<div class="col-xs-4 text-center">
						<a href="#">Followers</a>
					</div>
					<div class="col-xs-4 text-center">
						<a href="#">Sales</a>
					</div>
					<div class="col-xs-4 text-center">
						<a href="#">Friends</a>
					</div>
					</div>
					<!-- /.row -->
				</li>
				<!-- Menu Footer-->
				<li class="user-footer">
					<div class="pull-left">
					<a href="#" class="btn btn-default btn-flat">Profile</a>
					</div>
					<div class="pull-right">
					<a href="#" class="btn btn-default btn-flat">Sign out</a>
					</div>
				</li>
				</ul>
			</li>
			<!-- Control Sidebar Toggle Button -->
			<li>
				<a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
			</li>
			</ul>
		</div>
		</nav>
	</header>
	<!-- Left side column. contains the logo and sidebar -->
	<aside class="main-sidebar">

		<!-- sidebar: style can be found in sidebar.less -->
		<section class="sidebar">

		<!-- search form (Optional) -->
		<form action="#" method="get" class="sidebar-form">
			<div class="input-group">
			<input type="text" name="q" class="form-control" placeholder="Search...">
				<span class="input-group-btn">
					<button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
					</button>
				</span>
			</div>
		</form>
		<!-- /.search form -->

		<!-- Sidebar Menu -->
		<ul class="sidebar-menu">
			<li class="header">Basic</li>
			<!-- Optionally, you can add icons to the links -->
			<li class="active"><a href="index.php"><i class="fa fa-home"></i> <span>Dashboard</span></a></li>
			<li><a href="climate.php"><i class="fa fa-cloud"></i> <span>Climate</span></a></li>
			<li><a href="media.php"><i class="fa fa-music"></i> <span>Media</span></a></li>
			<li><a href="security.php"><i class="fa fa-lock"></i> <span>Security</span></a></li>
			<li class="treeview">
			<a href="#"><i class="fa fa-link"></i> <span>Multilevel</span>
				<span class="pull-right-container">
				<i class="fa fa-angle-left pull-right"></i>
				</span>
			</a>
			<ul class="treeview-menu">
				<li><a href="#">Link in level 2</a></li>
				<li><a href="#">Link in level 2</a></li>
			</ul>
			</li>
		</ul>
		<!-- /.sidebar-menu -->
		</section>
		<!-- /.sidebar -->
	</aside>
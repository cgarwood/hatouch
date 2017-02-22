<!-- jQuery UI 1.11.4 -->
<script src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>
<!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
<script>
  $.widget.bridge('uibutton', $.ui.button);
</script>
<!-- Bootstrap 3.3.6 -->
<script src="bootstrap/js/bootstrap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.11.2/moment.min.js"></script>
<!-- jQuery Knob Chart -->
<script src="plugins/knob/jquery.knob.js"></script>
<!-- Slimscroll -->
<script src="plugins/slimScroll/jquery.slimscroll.min.js"></script>
<script src="plugins/chartjs/Chart.min.js"></script>
<script src="plugins/fastclick/fastclick.js"></script>

<script type="text/javascript" src="dist/js/app.js"></script>
<!-- <script type="text/javascript" src="build.js"></script> -->

<script type="text/javascript">
var app;
var areaChartData;
var areaChartOptions;
var HomeAssistantApi = new HomeAssistantApi(window.config['ha_url'], function (entity) {});;
// Wait for DOM
$(document).on('DOMContentLoaded', function () {
	
    // Initialize API
    HomeAssistantApi.getConfiguration();

    // Setup Event Stream Listener
    HomeAssistantApi.setEventStreamListener();

	setTimeout(initVue, 500);	
		
});

function initVue() {
	Vue.component('light', {
		props: ['entity'],
		template:'<div class="info-box" v-on:click="toggleSwitch(entity[\'entity_id\'])">' +
			'<span class="info-box-icon" v-bind:class="[(entity[\'state\'] == \'on\') ? \'bg-yellow\' : \'bg-black\']"><i class="fa fa-lightbulb-o"></i></span>' +
			'<div class="info-box-content">' +
				'<span class="info-box-text">{{entity[\'attributes\'][\'friendly_name\']}}</span>' +
				'<span class="info-box-number">{{entity[\'state\']}}</span>' +
			'</div>' +
		'</div>',
		methods: {
			toggleSwitch: function(entity_id) {
				HomeAssistantApi.callService('homeassistant', 'toggle', {"entity_id" : entity_id}, function(d) {});
			}
		}
	});
	
	Vue.component('camera', {
		props: ['entity'],
		template:'<div class="box box-primary">' +
					'<div class="box-header with-border">' +
						'<h3 class="box-title">{{entity[\'attributes\'][\'friendly_name\']}}</h3>' +
					'</div>' +
					'<div class="box-body">' +
						'<img v-bind:src="$root.config[\'ha_url\'] + entity[\'attributes\'][\'entity_picture\']" style="height:236px; margin: 0 auto;">' +
					'</div>' +
			'</div>',
	});

	window.app = new Vue({
		el: '#wrapper',
		data: {
			entities : HomeAssistantApi.entities,
			config : window.config,
			time : '',
			date : '',
		},
		methods: {
			getTime() {
				var self = this;
				this.time = moment().format("h:mm:ssa");
				this.date = moment().format("M/D/YYYY");
			},
			toggleSwitch: function(entity_id) {
				HomeAssistantApi.callService('homeassistant', 'toggle', {"entity_id" : entity_id}, function(d) {console.log(d);});
			}
		},
		mounted: function() {
			this.getTime();
			setInterval(this.getTime, 1000);
		}
	});
}

</script>
</body>
</html>
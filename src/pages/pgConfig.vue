<template>
<section class="content" v-cloak>
	<form role="form">
		<div class="box box-primary" v-if="firstConfig">
			<div class="box-header with-border">
				<h3 class="box-title">Welcome to HATouch</h3>
			</div>
			<div class="box-body">
				<p>Welcome to HATouch! Please enter the following information to connect to your HomeAssistant installation. Please see the docs on <a href="https://github.com/cgarwood/hatouch">GitHub</a> for more configuration information, including HomeAssistant requirements.</p>
				<p>Please submit bug reports, feature requests, etc. on <a href="https://github.com/cgarwood/hatouch">GitHub</a>. PRs for bugfixes, new features, and general code cleanup are welcome!</p>
			</div>
		</div>
		<div class="box box-primary">
			<div class="box-header with-border">
				<h3 class="box-title">Home Assistant Configuration</h3>
			</div>
			<div class="box-body">
				<div class="form-group">
					<label for="ha_url">HomeAssistant Path (hostname:port or ip:port)</label>
					<input v-model="config.ha_url" type="text" class="form-control" id="ha_url" placeholder="192.168.1.2:8123">
					<p class="help-block">Don't include http:// or https://</p>
				</div>
				<div class="form-group">
					<label for="uses_ssl"><input v-model="config.use_ssl" type="checkbox" id="uses_ssl"> Use SSL</label>
				</div>
			</div>
		</div>
		<div class="box box-primary">
			<div class="box-header with-border">
				<h3 class="box-title">HATouch Configuration</h3>
			</div>
			<div class="box-body">
				<div class="form-group">
					<label for="location">Location</label>
					<input v-model="config.location" type="text" class="form-control" id="location" placeholder="Living Room">
				</div>
				<div class="form-group">
					<label for="entity_id">Device Identifier</label>
					<div class="input-group">
						<span class="input-group-addon">hatouch_</span>
						<input v-model="config.entity_id" type="text" class="form-control" id="entity_id" placeholder="living_room">
					</div>
					<p class="help-block">Will be used for Home Assistant entity ID generation, as well as notification targeting. Letters, numbers, and underscores only.</p>
				</div>
				<div class="form-group">
					<label for="screensaver_timeout">Screensaver Timeout (seconds)</label>
					<input v-model.number="config.screensaver_timeout" type="text" class="form-control" id="screensaver_timeout" placeholder="300">
				</div>
			</div>
		</div>
		<input type="submit" class="btn btn-primary" value="Save Configuration" v-on:click.prevent="saveConfig">
	</form>
</section>
</template>

<script>
module.exports = {
	computed: {
		config() {
			return this.$parent.config;
		},
		firstConfig() {
			return this.$parent.firstConfig;
		}
	},
	methods: {
		saveConfig: function() {
			localStorage.setItem('config', JSON.stringify(this.config));
			this.$parent.firstConfig = false;
			this.$router.replace('/');
		}
	}
}
</script>
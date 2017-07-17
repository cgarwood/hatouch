<template>
	<div id="wrapper" style="height: 100vh;">
		<transition name="fadePage" v-for="(photo, index) in photos">
			<div class="page photo" v-on:click="loadDashboard" v-show="currentSlide == index" :style="{ 'background-image': 'url(' + photo + ')' }">
				<div class="clock">{{currentTime.hour}}:{{currentTime.min}}<small>{{currentTime.ampm}}</small></div>
				<div class="date">{{currentTime.dayOfWeek}}, {{currentTime.monthText}} {{currentTime.day}}</div>
			</div>
		</transition>
		
	</div>
</template>

<script>
module.exports = {
	computed: {
		entities() {
			return this.$store.state.entities;
		},
		currentTime() {
			return this.$parent.timeVars;
		}
	},
	data: function() {
		return {
			currentSlide : 0,
			maxSlides : 1,
			photos : []
		}
	},
	mounted: function() {
		var self = this;
		this.timer = setInterval(self.advanceSlide, 8000);
		
		//Get slides
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'get_pictures.php');
		xhr.onload = function(e) {
			self.photos = JSON.parse(this.response);
			self.maxSlides = self.photos.length-1;
		}
		xhr.send();
	},
	methods: {
		advanceSlide: function() {
			if (this.currentSlide < this.maxSlides) {
				this.currentSlide++;
			} else {
				this.currentSlide = 0;
			}
		},
		loadDashboard: function() {
			this.$router.replace('/');
		}
	}
}
</script>
<style>
	.fadePage-enter-active, .fadePage-leave-active {
		transition: opacity .75s
	}
	.fadePage-enter, .fadePage-leave-to {
		opacity: 0
	}
	
	#wrapper {
		background-color: black;
	}
	
	.page {
		height: 100vh;
		width: 100vw;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		padding: 48px;
		position: absolute;
		top: 0;
		left: 0;
	}
	
	.clock {
		position: absolute;
		color: white;
		font-size: 120px;
		font-weight: bold;
		right: 48px;
		bottom: 70px;
		text-shadow: 2px 2px 2px rgba(0, 0, 0, 1);
	}
	.clock small {
		font-size: 72px;
	}
	.date {
		position: absolute;
		bottom: 32px;
		right: 48px;
		text-shadow: 2px 2px 2px rgba(0, 0, 0, 1);
		color: white;
		font-size: 60px;
	}
</style>
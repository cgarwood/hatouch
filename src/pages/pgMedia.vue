<template>
	<section class="content" v-cloak>
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
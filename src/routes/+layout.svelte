<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import './app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link
		rel="stylesheet"
		href="https://assets.ubuntu.com/v1/vanilla_framework_version_4_44_0_min.css"
	/>
</svelte:head>

{@render children()}

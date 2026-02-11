<script lang="ts">
	import { LaunchpadIcon } from '$lib/icons';
	import { GithubIcon } from '@canonical/svelte-icons';
	import { ProjectPlatform } from '$lib/api/cla/types';

	const { platform }: { platform: ProjectPlatform } = $props();
</script>

{#if platform === 'github'}
	<GithubIcon />
{:else if platform === 'launchpad'}
	<LaunchpadIcon />
{/if}

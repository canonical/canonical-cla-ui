<script lang="ts">
	import { LaunchpadIcon } from '$lib/icons';
	import { GithubIcon } from '@canonical/svelte-icons';
	import { ProjectPlatform } from '$lib/api/cla/types';

	const { platform, style }: { platform: ProjectPlatform; style?: string } = $props();
</script>

{#if platform === 'github'}
	<GithubIcon {style} />
{:else if platform === 'launchpad'}
	<LaunchpadIcon {style} />
{/if}

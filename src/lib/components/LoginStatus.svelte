<script lang="ts">
	import { resolve } from '$app/paths';
	import { LaunchpadIcon, OidcIcon } from '$lib/icons';
	import { GithubIcon } from '@canonical/svelte-icons';

	type Props = {
		profiles: {
			github?: string;
			launchpad?: string;
			oidc?: string;
		};
	};

	let { profiles }: Props = $props();

	const homePageRedirectUri = encodeURIComponent(resolve('/'));
</script>

<div>
	{#if !profiles.github}
		<a
			class="p-button--base is-dense has-icon"
			href={`/github/login?redirect_uri=${homePageRedirectUri}`}
			rel="external"
		>
			<GithubIcon />
			<span>Login with GitHub</span>
		</a>
	{:else}
		<span class="p-chip is-inline">
			<GithubIcon class="p-icon--" />
			<span class="p-chip__value">@{profiles.github}</span>
			<a
				class="p-chip__dismiss"
				href={`/github/logout?redirect_uri=${homePageRedirectUri}`}
				rel="external">Log Out</a
			>
		</span>
	{/if}
	{#if !profiles.launchpad}
		<a
			class="p-button--base is-dense has-icon"
			href={`/launchpad/login?redirect_uri=${homePageRedirectUri}`}
			rel="external"
		>
			<LaunchpadIcon />
			<span>Login with Launchpad</span>
		</a>
	{:else}
		<span class="p-chip is-inline">
			<LaunchpadIcon class="p-icon--" />
			<span class="p-chip__value">@{profiles.launchpad}</span>
			<a
				class="p-chip__dismiss"
				href={`/launchpad/logout?redirect_uri=${homePageRedirectUri}`}
				rel="external">Log Out</a
			>
		</span>
	{/if}
	{#if profiles.oidc}
		<span class="p-chip is-inline">
			<OidcIcon class="p-icon--" />
			<span class="p-chip__value">{profiles.oidc}</span>
			<a
				class="p-chip__dismiss"
				href={`/oidc/logout?redirect_uri=${homePageRedirectUri}`}
				rel="external">Log Out</a
			>
		</span>
	{/if}
</div>

<style>
	div {
		display: flex;
		gap: 0.5rem;
		align-items: center;
		padding: 1rem 1rem 0.8rem 2.6rem;
		:global(.p-button--base) {
			margin: 0;
		}
	}
</style>

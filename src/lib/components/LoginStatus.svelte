<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { LaunchpadIcon, OidcIcon } from '$lib/icons';
	import { GithubIcon } from '@canonical/svelte-icons';

	type Props = {
		profiles: {
			github?: string;
			launchpad?: string;
			oidc?: string;
		};
		hideOidcLogin: boolean;
	};

	let { profiles, hideOidcLogin }: Props = $props();

	const homePageRedirectUri = encodeURIComponent(resolve('/'));
	const redirectUrl = new URL(
		page.url.searchParams.get('redirect_uri') || resolve('/'),
		'http://localhost' // dummy base host in case the redirect uri is a relative path
	);
	const redirectUri = encodeURIComponent(redirectUrl.pathname + redirectUrl.search);
</script>

<div>
	{#if !profiles.github}
		<a
			class="p-button--base is-dense has-icon"
			href={`/github/login?redirect_uri=${redirectUri}`}
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
			href={`/launchpad/login?redirect_uri=${redirectUri}`}
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
	{#if !profiles.oidc}
		{#if !hideOidcLogin}
			<a
				class="p-button--base is-dense has-icon"
				href={`/oidc/login?redirect_uri=${redirectUri}`}
				rel="external"
			>
				<OidcIcon />
				<span>Login with Canonical OIDC</span>
			</a>
		{/if}
	{:else}
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
		flex-wrap: wrap;
		gap: 0.5rem;
		align-items: center;
		padding: 1rem 1rem 0.8rem 2.6rem;
		:global(.p-button--base) {
			margin: 0;
		}
	}
</style>

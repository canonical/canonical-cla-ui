<script lang="ts">
	import { resolve } from '$app/paths';
	import { LoginStatus } from '$lib/components';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let menuToggled = $state(false);
</script>

<header id="navigation" class="p-navigation is-dark" class:has-menu-open={menuToggled}>
	<div class="p-navigation__row--25-75">
		<div class="p-navigation__banner">
			<div class="p-navigation__tagged-logo">
				<a class="p-navigation__link" href={resolve('/')}>
					<div class="p-navigation__logo-tag">
						<img
							class="p-navigation__logo-icon"
							src="https://assets.ubuntu.com/v1/82818827-CoF_white.svg"
							alt=""
						/>
					</div>
					<span class="p-navigation__logo-title">Legal</span>
				</a>
			</div>
			<ul class="p-navigation__items">
				<li class="p-navigation__item">
					<button
						class="p-navigation__link"
						onclick={() => (menuToggled = !menuToggled)}
						aria-label="Toggle menu"
					>
						{menuToggled ? 'Close Menu' : 'Menu'}
					</button>
				</li>
			</ul>
		</div>
		<nav class="p-navigation__nav">
			<ul class="p-navigation__items">
				<li class="p-navigation__item">
					<a class="p-navigation__link" href={resolve('/manage')}>Manage</a>
				</li>
			</ul>
			<ul class="p-navigation__items">
				<li class="p-navigation__item">
					<LoginStatus
						profiles={{
							github: data.githubProfile?.username,
							launchpad: data.launchpadProfile?.username,
							oidc: data.oidcProfile?.name ?? undefined
						}}
					/>
				</li>
			</ul>
		</nav>
	</div>
</header>
<div class="row">
	<h1>Welcome to SvelteKit</h1>
	<p>
		Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation
	</p>
</div>

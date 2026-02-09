<script lang="ts">
	import { resolve } from '$app/paths';
	import type { LayoutProps } from './$types';
	let { data, children }: LayoutProps = $props();

	let menuToggled = $state(false);
	let userMenuToggled = $state(false);
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
							alt="Canonical Logo"
						/>
					</div>
					<span class="p-navigation__logo-title">Canonical CLA</span>
				</a>
			</div>
			<ul class="p-navigation__items">
				<li class="p-navigation__item">
					<button
						class="p-navigation__link"
						onclick={() => (menuToggled = !menuToggled)}
						aria-controls="main-navigation"
						aria-expanded={menuToggled}
					>
						{menuToggled ? 'Close Menu' : 'Menu'}
					</button>
				</li>
			</ul>
		</div>
		<nav class="p-navigation__nav" id="main-navigation">
			<ul class="p-navigation__items"></ul>
			<ul class="p-navigation__items">
				<li class="p-navigation__item--dropdown-toggle" class:is-active={userMenuToggled}>
					<button
						class="p-navigation__link"
						style="display: flex; align-items: center; justify-content: start; gap: 0.5rem;"
						onclick={() => (userMenuToggled = !userMenuToggled)}
						aria-label="Toggle user menu"
						aria-controls="account-menu"
						aria-expanded={userMenuToggled}
					>
						<img
							style="width: 24px; height: 24px; border-radius: 50%;"
							src={data.oidcProfile.picture}
							alt={data.oidcProfile.name}
						/>
						{data.oidcProfile.name}
					</button>
					<ul
						class="p-navigation__dropdown--right"
						id="account-menu"
						aria-hidden={!userMenuToggled}
					>
						<li>
							<a
								class="p-navigation__dropdown-item"
								href={`/oidc/logout?redirect_uri=${encodeURIComponent(resolve('/'))}`}
								rel="external">Log Out</a
							>
						</li>
					</ul>
				</li>
			</ul>
		</nav>
	</div>
</header>
{@render children()}

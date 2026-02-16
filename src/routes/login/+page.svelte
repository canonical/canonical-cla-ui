<script lang="ts">
	import { resolve } from '$app/paths';
	import LoginStatus from '$lib/components/LoginStatus.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="p-strip page-row row">
	<div class="col-6 col-start-large-4">
		<div class="u-no-padding page-card p-card" role="group">
			<div class="p-card__content">
				<header class="p-navigation is-dark">
					<div class="p-navigation__row">
						<div class="p-navigation__banner">
							<div class="p-navigation__tagged-logo">
								<a class="p-navigation__link" href={resolve('/')}
									><div class="p-navigation__logo-tag">
										<img
											class="p-navigation__logo-icon"
											alt="Logo"
											src="https://assets.ubuntu.com/v1/82818827-CoF_white.svg"
										/>
									</div>
									<span class="p-navigation__logo-title">Canonical CLA</span>
								</a>
							</div>
							<ul class="p-navigation__items"></ul>
						</div>
						<nav class="p-navigation__nav"><ul class="p-navigation__items"></ul></nav>
					</div>
				</header>
				<div class="p-card__inner page-inner">
					<h1 class="p-heading--4">Login</h1>
					<LoginStatus
						profiles={{
							oidc: data.oidcProfile?.user?.name ?? undefined,
							launchpad: data.launchpadProfile?.username ?? undefined,
							github: data.githubProfile?.username ?? undefined
						}}
						hideOidcLogin={false}
					/>
				</div>
			</div>
		</div>
	</div>
</div>

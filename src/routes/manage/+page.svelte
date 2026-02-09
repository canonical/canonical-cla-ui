<script lang="ts">
	import type { PageProps } from './$types';
	import { resolve } from '$app/paths';

	let { data }: PageProps = $props();
	const userRole = $derived(data.oidcProfile.role);
</script>

<section class="p-strip is-shallow">
	<div class="row">
		<h1>Manage</h1>
		<ul>
			{#if userRole === 'admin'}
				<li>
					<a href={resolve('/manage/exclude-projects')}>Exclude Projects</a>
				</li>
			{/if}
		</ul>
	</div>
</section>

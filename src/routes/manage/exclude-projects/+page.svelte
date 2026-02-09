<script lang="ts">
	import { ProjectPlatform } from '$lib/api/cla/types';
	import { ExcludedProjectIcon } from '$lib/components';
	import {
		excludeProject,
		getExcludedProjects,
		unExcludeProject
	} from '$lib/modules/exclude-projects';
	import { createDebounce } from '$lib/utils/debounce';
	import {
		ChevronLeftIcon,
		ChevronRightIcon,
		DeleteIcon,
		PlusIcon,
		SpinnerIcon
	} from '@canonical/svelte-icons';
	const limit = 20;
	let offset = $state(0);
	let search = $state('');
	let platform = $state<ProjectPlatform | undefined>(undefined);
	const projects = $derived(
		getExcludedProjects({ limit, offset, query: search, platform: platform || undefined })
	);

	const handleSearchInput = createDebounce((e: Event) => {
		if (e.target instanceof HTMLInputElement) {
			search = e.target.value;
		}
	});
</script>

<section class="p-strip is-shallow">
	<div class="row">
		<h2 class="p-muted-heading">Exclude a Project</h2>
		<form
			class="p-form grid-row"
			{...excludeProject.enhance(async ({ form, submit }) => {
				await submit();
				projects.refresh();
				form.reset();
			})}
		>
			<div class="p-form__group grid-col-6">
				<label for="project" class="p-form__label">Project</label>
				<input
					type="text"
					name="full_name"
					id="project"
					placeholder="example: canonical/ubuntu.com"
				/>
			</div>
			<div class="p-form__group grid-col-2">
				<label for="platform" class="p-form__label">Platform</label>
				<select name="platform" id="platform" placeholder="Select Platform">
					{#each projects.current?.supported_platforms as platform (platform)}
						<option value={platform}>{platform.charAt(0).toUpperCase() + platform.slice(1)}</option>
					{/each}
				</select>
			</div>
			<div class="p-form__group">
				<button type="submit" class="p-button--positive has-icon">
					<PlusIcon />
					Add
				</button>
			</div>
		</form>
	</div>
</section>
<section class="p-strip is-shallow">
	<div class="row">
		<h2 class="p-muted-heading">Current Excluded Projects ({projects.current?.total || 0})</h2>

		<!-- JS Only filter -->
		<div class="grid-row">
			<div class="p-search-box grid-col-6">
				<label class="u-off-screen" for="search">Search</label>
				<input
					type="search"
					id="search"
					class="p-search-box__input"
					name="search"
					placeholder="Search by project name"
					autocomplete="on"
					oninput={handleSearchInput}
					value={search}
				/>
				<button
					type="reset"
					class="p-search-box__reset"
					disabled={!search}
					onclick={() => {
						search = '';
					}}><i class="p-icon--close">Close</i></button
				>
				<button type="submit" class="p-search-box__button">
					<i class="p-icon--search">Search</i>
				</button>
			</div>
			<select
				class="grid-col-2"
				name="platform"
				id="platform"
				placeholder="Select Platform"
				onchange={(e) => {
					if (e.target instanceof HTMLSelectElement) {
						platform = e.target.value as ProjectPlatform;
					}
				}}
			>
				<option value="">All Platforms</option>
				{#each projects.current?.supported_platforms as platform (platform)}
					<option value={platform}>{platform.charAt(0).toUpperCase() + platform.slice(1)}</option>
				{/each}
			</select>
		</div>
		{#if projects.error}
			<p>Error: {JSON.parse(projects.error).message}</p>
		{:else if projects.loading}
			<p class="p-text--small">
				<SpinnerIcon />
				Loading excluded projects...
			</p>
		{:else}
			{#each projects.current?.projects as project, index (`project-listing-item-${index}`)}
				<ul class="p-list">
					<li class="p-list__item project-listing-item">
						<ExcludedProjectIcon platform={project.platform} />
						{project.full_name}
						<form
							{...unExcludeProject
								.for(project.platform + project.full_name)
								.enhance(async ({ submit }) => {
									await submit();
									projects.refresh();
								})}
						>
							<input type="hidden" name="platform" value={project.platform} />
							<input type="hidden" name="full_name" value={project.full_name} />
							<button type="submit" class="p-button--base only-icon">
								<DeleteIcon />
							</button>
						</form>
					</li>
				</ul>
			{/each}
			{#if projects?.current?.projects?.length === 0}
				<p>No results found</p>
			{/if}
			<div class="pagination">
				{#if offset > 0}
					<button
						type="button"
						class="p-button--base has-icon"
						onclick={() => {
							offset -= limit;
						}}><ChevronLeftIcon /> Previous</button
					>
				{/if}
				<span class="p-text--small"
					>Page {offset / limit + 1} of {Math.ceil((projects.current?.total || 0) / limit)}</span
				>
				{#if projects.current?.total && projects.current.total > limit * (offset + 1)}
					<button
						class="p-button--base has-icon"
						onclick={() => {
							offset += limit;
						}}>Next <ChevronRightIcon /></button
					>
				{/if}
			</div>
		{/if}
	</div>
</section>

<style>
	.project-listing-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	.pagination {
		margin: auto;
		display: flex;
		align-items: center;
		gap: 0.5rem;

		& > * {
			margin: 0;
		}
	}
</style>

<script lang="ts">
	import { ProjectPlatform } from '$lib/api/cla/types';
	import { excludeProject } from '$lib/modules/exclude-projects/remote-functions/exclude-project.remote';
	import { getExcludedProjects } from '$lib/modules/exclude-projects/remote-functions/get-excluded-projects.remote';
	import { createDebounce } from '$lib/utils/debounce';
	import {
		ChevronLeftIcon,
		ChevronRightIcon,
		PlusIcon,
		SpinnerIcon
	} from '@canonical/svelte-icons';
	import { ProjectsTable } from '$lib/modules/exclude-projects/index.js';
	import { projectPlatformLabel } from '$lib/modules/exclude-projects/utils.js';
	import { Spinner } from '$lib/components/index.js';

	const limit = 20;
	let offset = $state(0);
	let search = $state('');
	let platform = $state<ProjectPlatform | undefined>();
	const projects = $derived(
		getExcludedProjects({ limit, offset, query: search, platform: platform || undefined })
	);

	const handleSearchInput = createDebounce((value: string) => {
		search = value;
		offset = 0;
	});

	const setupExcludeProjectForm = () => {
		excludeProject.fields.platform.set(ProjectPlatform.github);
	};

	setupExcludeProjectForm();
</script>

<section class="p-strip is-shallow">
	<div class="row">
		<h2 class="p-muted-heading">Exclude a Project</h2>
		<form
			class="p-form grid-row"
			{...excludeProject.enhance(async ({ form, submit }) => {
				await submit().updates(projects);
				form.reset();
				setupExcludeProjectForm();
			})}
		>
			<div
				class="p-form-validation grid-col-6"
				class:is-error={excludeProject.fields.full_name.issues()}
			>
				<label for="project" class="p-form__label is-required">Project</label>
				<input
					type="text"
					id="project"
					placeholder="example: canonical/ubuntu.com"
					required
					class="p-form-validation__input"
					aria-describedby={excludeProject.fields.full_name.issues() ? 'project-error' : undefined}
					{...excludeProject.fields.full_name.as('text')}
				/>
				{#if excludeProject.fields.full_name.issues()}
					<p class="p-form-validation__message" id="project-error">
						{excludeProject.fields.full_name.issues()?.[0]?.message}
					</p>
				{/if}
			</div>
			<div
				class="p-form-validation grid-col-2"
				class:is-error={excludeProject.fields.platform.issues()}
			>
				<label for="platform" class="p-form__label is-required">Platform</label>
				<select
					id="platform"
					placeholder="Select Platform"
					required
					class="p-form-validation__input"
					aria-describedby={excludeProject.fields.platform.issues() ? 'platform-error' : undefined}
					{...excludeProject.fields.platform.as('select')}
				>
					{#each Object.values(ProjectPlatform) as platform (platform)}
						<option value={platform}>{platform.charAt(0).toUpperCase() + platform.slice(1)}</option>
					{/each}
				</select>
				{#if excludeProject.fields.platform.issues()}
					<p class="p-form-validation__message" id="platform-error">
						{excludeProject.fields.platform.issues()?.[0]?.message}
					</p>
				{/if}
			</div>
			<div
				class="p-form-validation grid-col-8"
				class:is-error={excludeProject.fields.reason.issues()}
			>
				<label for="reason" class="p-form__label is-required">Reason</label>
				<textarea
					id="reason"
					placeholder="Explain why this project should be excluded"
					required
					maxlength="500"
					class="p-form-validation__input"
					aria-describedby={excludeProject.fields.reason.issues() ? 'reason-error' : undefined}
					{...excludeProject.fields.reason.as('text')}
				></textarea>
				{#if excludeProject.fields.reason.issues()}
					<p class="p-form-validation__message" id="reason-error">
						{excludeProject.fields.reason.issues()?.[0]?.message}
					</p>
				{/if}
			</div>
			<div class="p-form__group">
				<button type="submit" class="p-button--positive" disabled={!!excludeProject.pending}>
					{#if excludeProject.pending}
						<Spinner />
					{:else}
						<PlusIcon />
					{/if}
					Add
				</button>
			</div>
		</form>
	</div>
</section>
<section class="p-strip is-shallow">
	<div class="row">
		<h2 class="p-muted-heading">Current Excluded Projects ({projects.current?.total || 0})</h2>

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
					oninput={(e) => handleSearchInput(e.currentTarget.value)}
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
			</div>
			<select
				class="grid-col-2"
				name="platform"
				id="platform"
				placeholder="Select Platform"
				bind:value={
					() => platform,
					(value) => {
						platform = value;
						offset = 0;
					}
				}
			>
				<option value="">All Platforms</option>
				{#each Object.values(ProjectPlatform) as platform (platform)}
					<option value={platform}>{projectPlatformLabel(platform)}</option>
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
		{:else if projects.current?.projects?.length}
			<ProjectsTable
				projects={projects.current?.projects}
				projectsRemoteQuery={projects}
				onUnExcludeProject={() => {
					if (projects.current?.projects.length === 0 && offset >= limit) {
						offset -= limit;
					}
				}}
			/>
		{:else}
			<p>No results found</p>
		{/if}
		{#if projects.current?.total}
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
					>Page {Math.floor(offset / limit) + 1} of {Math.ceil(
						projects.current.total / limit
					)}</span
				>
				{#if projects.current.total > limit + offset}
					<button
						type="button"
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

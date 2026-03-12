<script lang="ts">
	import type { ExcludedProjectPayload } from '$lib';
	import { ExcludedProjectIcon, Spinner, Modal } from '$lib/components';
	import { unExcludeProject } from '$lib/modules/exclude-projects/remote-functions/exclude-project.remote.js';
	import { projectPlatformLabel } from '$lib/modules/exclude-projects/utils.js';
	import type { RemoteQuery } from '@sveltejs/kit';
	import { DeleteIcon } from '@canonical/svelte-icons';

	const {
		projects,
		projectsRemoteQuery,
		onUnExcludeProject
	}: {
		projects: ExcludedProjectPayload[];
		projectsRemoteQuery: RemoteQuery<unknown>;
		onUnExcludeProject?: () => void;
	} = $props();
</script>

<table aria-label="Excluded Projects" style="table-layout: fixed;">
	<thead>
		<tr>
			<th style="width: 25%;">Project</th>
			<th style="width: 20%;">Platform</th>
			<th style="width: 40%;">Reason</th>
			<th style="width: 15%;">Actions</th>
		</tr>
	</thead>
	<tbody>
		{#each projects as project (project.platform + project.full_name)}
			{@const unExclude = unExcludeProject.for(project.platform + project.full_name)}
			<tr>
				<td>
					{project.full_name}
				</td>
				<td
					><ExcludedProjectIcon
						platform={project.platform}
						style="vertical-align: text-top; margin-right: 0.25rem;"
					/>
					{projectPlatformLabel(project.platform)}</td
				>
				<td>{project.reason}</td>
				<td>
					<form
						{...unExclude.enhance(async ({ submit }) => {
							await submit().updates(projectsRemoteQuery);
							onUnExcludeProject?.();
						})}
					>
						<input {...unExcludeProject.fields.platform.as('hidden', project.platform)} />
						<input {...unExcludeProject.fields.full_name.as('hidden', project.full_name)} />
						<Modal
							bodyMessage={`Are you sure you want to un-exclude ${project.full_name}@${project.platform}?`}
							headerMessage="Confirm Un-Exclusion"
						>
							{#snippet trigger(triggerProps)}
								<button
									type="button"
									{...triggerProps}
									class="p-button--base only-icon"
									disabled={!!unExclude.pending}
								>
									{#if unExclude.pending}
										<Spinner />
									{:else}
										<DeleteIcon />
									{/if}
								</button>
							{/snippet}
							{#snippet footer(modalId)}
								<button
									type="button"
									class="u-no-margin--bottom"
									command="close"
									commandfor={modalId}
									disabled={!!unExclude.pending}
								>
									Cancel
								</button>
								<button
									type="submit"
									class="u-no-margin--bottom p-button--negative"
									disabled={!!unExclude.pending}
								>
									{#if unExclude.pending}
										<Spinner />
									{:else}
										Un-Exclude
									{/if}
								</button>
							{/snippet}
						</Modal>
					</form>
				</td>
			</tr>
		{/each}
	</tbody>
</table>

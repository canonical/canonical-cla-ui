<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	const {
		trigger,
		headerMessage,
		bodyMessage,
		footer
	}: {
		trigger: Snippet<
			[
				triggerProps: {
					command: HTMLButtonAttributes['command'];
					commandfor: HTMLButtonAttributes['commandfor'];
				}
			]
		>;
		headerMessage: string;
		bodyMessage: string;
		footer: Snippet<[modalId: string]>;
	} = $props();

	const modalId = $props.id();
</script>

{@render trigger({ command: 'show-modal', commandfor: modalId })}

<dialog class="" id={modalId}>
	<header class="p-modal__header">
		<h2 class="p-modal__title" id="modal-title">{headerMessage}</h2>
		<button
			type="button"
			class="p-modal__close"
			aria-label="Close active modal"
			command="close"
			commandfor={modalId}>Close</button
		>
	</header>
	<p>{bodyMessage}</p>
	<footer class="p-modal__footer">
		{@render footer(modalId)}
	</footer>
</dialog>

<style>
	dialog {
		border: none;

		&::backdrop {
			background: var(--vf-color-background-overlay);
		}
	}
</style>

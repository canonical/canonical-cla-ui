<script lang="ts">
	import { SpinnerIcon } from '@canonical/svelte-icons';

	const { style }: { style?: string } = $props();
</script>

<SpinnerIcon class="p-icon--spinner" {style} />

<style>
	:global {
		.p-icon--spinner {
			animation: spin 1s linear infinite;
		}
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>

<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import { marked } from 'marked';
	import InputBox from '$lib/components/InputBox.svelte';
	import { currentLog, filesList, shouldPreview } from '$lib/store';
	import SvelteMarkdown from 'svelte-marked';

	let something = $state('');
	$effect(() => {
		filesList.update((currentFilesList) => {
			
		})
	});
</script>

{#if $currentLog.length > 0}
	<div class="h-full w-full p-4">
		{#if $shouldPreview == true}
			{@html marked(something)}
		{:else}
			<InputBox bind:value={something} />
		{/if}
	</div>
{/if}

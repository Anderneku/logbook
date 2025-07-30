<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import { marked } from 'marked';
	import InputBox from '$lib/components/InputBox.svelte';
	import { currentLog, filesList, shouldPreview } from '$lib/store';
	import SvelteMarkdown from 'svelte-marked';

	let something = $state('');

	$effect(() => {
		if ($currentLog.length > 0) {
			let currentFile = `${$currentLog[1]}_${$currentLog[2]}_${$currentLog[3]}_${$currentLog[0]}`;
			if ($filesList[currentFile]) {
				something = $filesList[currentFile].content;
			} else {
				something = '';
			}
		}
	});
	function handleInput() {
		if ($currentLog.length > 0) {
			let currentFile = `${$currentLog[1]}_${$currentLog[2]}_${$currentLog[3]}_${$currentLog[0]}`;
			filesList.update((currentFilesList) => {
				if (!currentFilesList[currentFile]) {
					currentFilesList[currentFile] = {
						content: something
					};
				} else {
					currentFilesList[currentFile].content = something;
				}
				return currentFilesList;
			});
		}
	}
</script>

{#if $currentLog.length > 0}
	<div class="h-full w-full p-4">
		{#if $shouldPreview == true}
			{@html marked(something)}
		{:else}
			<InputBox {handleInput} bind:value={something} />
		{/if}
	</div>
{/if}

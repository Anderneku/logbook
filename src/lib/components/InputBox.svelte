<script>
	let { value } = $props();
</script>

<textarea bind:value class="h-full w-full outline-0 p-4 font-mono"></textarea>

<style>
	textarea {
		resize: none; /* Prevent resizing */
	}
</style>

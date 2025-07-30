<script>
	let { value } = $props();
</script>

<textarea bind:value class="h-full w-full outline-0"></textarea>

<style>
	textarea {
		resize: none; /* Prevent resizing */
	}
</style>

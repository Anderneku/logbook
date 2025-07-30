<script>
	let { value = $bindable() } = $props();
</script>

<textarea bind:value class="h-full w-full outline-0 font-mono"></textarea>

<style>
	textarea {
		resize: none; /* Prevent resizing */
	}
</style>

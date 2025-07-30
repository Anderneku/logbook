<script>
	let { value = $bindable(), handleInput } = $props();
</script>

<textarea bind:value oninput={handleInput} class="h-full w-full outline-0 font-mono"></textarea>

<style>
	textarea {
		resize: none; /* Prevent resizing */
		scroll-behavior: smooth;
	}
</style>

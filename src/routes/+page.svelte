<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import { marked } from 'marked';
    import InputBox from '$lib/components/InputBox.svelte';
	let something = '';
</script>

<InputBox value={something}/>
<!-- {@html marked('Ddf')} -->

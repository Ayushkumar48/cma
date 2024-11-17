<script>
	import Login from './Login.svelte';
	let { form } = $props();
</script>

<div class="flex h-full items-center justify-center">
	<Login {form} />
</div>

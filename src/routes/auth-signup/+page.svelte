<script>
	import SignUp from './SignUp.svelte';
	import { Toaster, toast } from 'svelte-sonner';
	let { form } = $props();
</script>

<Toaster richColors />
<div class="flex h-full items-center justify-center">
	<SignUp {form} />
</div>

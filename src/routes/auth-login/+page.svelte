<script>
	import Login from './Login.svelte';
	import { Toaster, toast } from 'svelte-sonner';
	export let form;
	import { goto } from '$app/navigation';
	import { doLogin } from '$lib/store';
	$: if (form?.message) {
		if (form.success === false) {
			toast.error(form.message);
		} else {
			toast.success(form.message);
			setTimeout(() => goto('/products'), 2000);
			doLogin();
		}
	}
</script>

<Toaster richColors />
<div class="flex h-full items-center justify-center">
	<Login />
</div>

<script>
	import Products from '$lib/Products/Products.svelte';
	import { onMount } from 'svelte';
	import { toast, Toaster } from 'svelte-sonner';
	export let data;
	onMount(() => {
		if (!data.username) {
			toast.error('Please login first!!!');
		}
	});
</script>

<Toaster richColors />
<Products username={data.username} baseurl={data.baseurl} />

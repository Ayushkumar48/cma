<script>
	import Products from '$lib/Products/Products.svelte';
	export let data;
</script>

<Products username={data.username} />

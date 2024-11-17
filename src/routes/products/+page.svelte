<script>
	import Products from '$lib/Products/Products.svelte';
	export let data;
	console.log(data);
</script>

<Products username={data.username} baseurl={data.baseurl} />

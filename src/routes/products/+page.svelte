<script>
	import Products from '$lib/Products/Products.svelte';
	let { data } = $props();
	console.log(data.baseurl);
</script>

<Products username={data.username} baseurl={data.baseurl} />

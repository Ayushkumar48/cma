<script>
	import Car from '$lib/Car/Car.svelte';

	export let data;
</script>

<div class="flex w-full flex-col gap-8 p-6">
	<div class="text-2xl">Car Details</div>
	<Car {data} />
</div>

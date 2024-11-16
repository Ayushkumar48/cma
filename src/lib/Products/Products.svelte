<script>
	import AddBtn from './AddBtn.svelte';
	import Card from './Card.svelte';
	import { onMount } from 'svelte';
	let carList = [];
	export let username;
	onMount(async () => {
		const response = await fetch(`http://localhost:3000/products?username=${username}`, {
			method: 'GET'
		});
		const data = await response.json();
		carList = data.carsData;
	});
</script>

<div class="flex flex-col gap-4 p-4">
	<div class="pl-8 text-3xl">Cars List</div>
	<div class="flex justify-end pb-8 pr-10">
		<AddBtn {username} />
	</div>
	<div class="flex flex-row flex-wrap justify-evenly gap-6">
		{#if carList.length === 0}
			<div class="text-2xl opacity-40">Click on add button to add cars.</div>
		{:else}
			{#each carList as car}
				<Card info={car} {username} />
			{/each}
		{/if}
	</div>
</div>

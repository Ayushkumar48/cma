<script>
	import Input from '$lib/components/ui/input/input.svelte';
	import AddBtn from './AddBtn.svelte';
	import Card from './Card.svelte';
	import { onMount } from 'svelte';
	import { SearchOutline } from 'flowbite-svelte-icons';
	let carList = [];
	export let username;
	export let baseurl;
	onMount(async () => {
		const response = await fetch(`${baseurl}/products?username=${username}`, {
			method: 'GET'
		});
		const data = await response.json();
		carList = data.carsData;
	});
	let searchKey = '';
</script>

<div class="flex flex-col gap-4 p-4">
	<div class="pl-8 text-3xl">Cars List</div>
	<div class="flex justify-end gap-4 pb-8 pr-10">
		<div class="relative">
			<div class="absolute left-2 top-1/2 flex -translate-y-1/2 items-center">
				<SearchOutline class="h-6 w-6 text-black" />
				<span class="ml-2 h-6 border-r-2 border-opacity-55"></span>
			</div>
			<Input
				class="w-72 rounded-xl bg-white pl-12 text-black"
				type="text"
				placeholder="Search..."
				bind:value={searchKey}
			/>
		</div>
		<AddBtn {username} {baseurl} />
	</div>
	<div class="flex flex-row flex-wrap justify-evenly gap-6">
		{#if carList.length === 0}
			<div class="text-2xl opacity-40">Click on add button to add cars.</div>
		{:else}
			{#each carList as car}
				{#if car.brand.toLowerCase().includes(searchKey.toLowerCase()) || car.model
						.toLowerCase()
						.includes(searchKey.toLowerCase()) || car.color
						.toLowerCase()
						.includes(searchKey.toLowerCase()) || car.description
						.toLowerCase()
						.includes(searchKey.toLowerCase())}
					<Card info={car} {username} {baseurl} />
				{/if}
			{/each}
		{/if}
	</div>
</div>

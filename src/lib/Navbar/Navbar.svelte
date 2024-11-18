<script>
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import Dropdown from './Dropdown.svelte';
	export let username, name;
</script>

<nav data-sveltekit-reload>
	<div class="flex flex-row justify-between border-b border-white bg-black px-4 py-4">
		<a href="/">
			<h1 class="text-2xl">CMA</h1>
		</a>
		<div class="flex flex-row gap-8">
			<Button variant="link" class="text-md text-white" href="/">Home</Button>
			{#if username && username !== ''}
				<Button variant="link" class="text-white" href="/products">My Garage</Button>
			{/if}
			<Button variant="link" class="text-white" href="/contact">Contact Us</Button>

			{#if username && username !== ''}
				<Dropdown {name} />
			{:else}
				<Button variant="link" class="text-white" href="/auth-login">Login/SignUp</Button>
			{/if}
		</div>
	</div>
</nav>

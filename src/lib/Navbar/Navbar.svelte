<script>
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import { loggedIn, doSignout } from '$lib/store';

	async function handleSignout() {
		try {
			const res = await fetch('/api/signout', {
				method: 'POST'
			});
			if (res.ok) {
				doSignout();
				goto('/');
			} else {
				console.error('Failed to sign out');
			}
		} catch (error) {
			console.error('Error during signout:', error);
		}
	}
</script>

<nav data-sveltekit-reload>
	<div class="flex flex-row justify-between border-b border-white px-4 py-4">
		<a href="/">
			<h1 class="text-2xl">CMA</h1>
		</a>
		<div class="flex flex-row gap-8">
			<Button variant="link" class="text-md text-white" onclick={() => goto('/')}>Home</Button>
			<Button variant="link" class="text-white" onclick={() => goto('/products')}>Products</Button>
			<Button variant="link" class="text-white" onclick={() => goto('/contact')}>Contact Us</Button>

			{#if $loggedIn}
				<Button variant="link" class="text-white" onclick={handleSignout}>Signout</Button>
			{:else}
				<Button variant="link" class="text-white" onclick={() => goto('/auth-login')}>
					Login/SignUp
				</Button>
			{/if}
		</div>
	</div>
</nav>

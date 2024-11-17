<script>
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { toast, Toaster } from 'svelte-sonner';
	import { UserOutline } from 'flowbite-svelte-icons';
	import User from 'lucide-svelte/icons/user';
	let showStatusBar = $state(true);
	let showActivityBar = $state(false);
	let showPanel = $state(false);
	async function handleSignout() {
		try {
			const res = await fetch('/api/signout', {
				method: 'POST'
			});
			if (res.ok) {
				location.reload();
				toast.success('Logged out successfully!!!');
			} else {
				console.error('Failed to sign out');
			}
		} catch (error) {
			console.error('Error during signout:', error);
		}
	}
	let { name } = $props();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger class={buttonVariants({ variant: 'outline' })}>
		<User />
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56">
		<DropdownMenu.Group>
			<DropdownMenu.GroupHeading class="text-center"
				>Hi, {name.split(' ')[0]}</DropdownMenu.GroupHeading
			>
			<DropdownMenu.Separator />
			<DropdownMenu.Item onclick={() => (window.location.href = '/profile')}
				>Profile</DropdownMenu.Item
			>
			<DropdownMenu.Item onclick={handleSignout}>Signout</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>

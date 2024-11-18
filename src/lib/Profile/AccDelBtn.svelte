<script>
	import { goto } from '$app/navigation';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { toast } from 'svelte-sonner';
	let { username } = $props();
	async function handleClick() {
		try {
			const response = await fetch('/api/deleteAccount', {
				method: 'DELETE',
				body: JSON.stringify({ username }),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const res = await response.json();
			if (res.success === true) {
				toast.success('Account deleted successfully!!!');
				setTimeout(() => {
					goto('/auth-login', { replace: true });
				}, 800);
			} else {
				toast.error(res.message);
			}
		} catch (err) {
			toast.error('Internal Error!!!');
			console.error(err);
		}
	}
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'outline' }) + ' bg-red-700 hover:bg-red-800'}>
		Delete Account
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Account Deletion</Dialog.Title>
			<Dialog.Description>
				Once an account is deleted, it cannot be recovered. Please proceed with caution.
			</Dialog.Description>
		</Dialog.Header>

		<Dialog.Footer>
			<div class="flex w-full flex-row justify-between">
				<Dialog.Close>
					<Button
						class="border-2 border-white bg-transparent text-white hover:bg-slate-400 hover:bg-opacity-50 hover:text-white"
					>
						Cancel
					</Button>
				</Dialog.Close>

				<Button
					class="bg-red-700 text-white hover:bg-red-800 hover:text-white"
					onclick={handleClick}
				>
					Delete Account
				</Button>
			</div>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>

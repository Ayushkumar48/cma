<script>
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/button/button.svelte';
	import AccDelBtn from './AccDelBtn.svelte';
	import Input from './Input.svelte';
	import { toast } from 'svelte-sonner';
	let { user } = $props();
	async function handleEnhance(event) {
		event.preventDefault();

		const form = event.target;
		const disabledInputs = form.querySelectorAll('input:disabled');
		disabledInputs.forEach((input) => (input.disabled = false));

		const formData = new FormData(form);

		try {
			const response = await fetch(`/profile`, {
				method: 'POST',
				body: formData
			});

			if (response.ok) {
				const result = await response.json();
				console.log(result.message);
				toast.success(result.message || 'Profile updated successfully!');
				location.reload();
			} else {
				const error = await response.json();
				toast.error(error.message || 'Something went wrong!');
			}
		} catch (error) {
			console.error('Upload failed:', error);
			toast.error('Failed to update profile');
		} finally {
			disabledInputs.forEach((input) => (input.disabled = true));
		}
	}
</script>

<div class="flex flex-col gap-8 p-16 pt-10">
	<div class=" flex flex-row justify-between">
		<div class="text-2xl">Profile Details</div>
		<div><AccDelBtn username={user.username} /></div>
	</div>
	<form class="flex flex-col gap-4" method="POST" onsubmit={handleEnhance}>
		<Input type="text" value={user.name} forLabel="name" name="name" />
		<Input type="text" value={user.username} forLabel="username" name="username" />
		<Input type="text" value={user.email} forLabel="email" name="email" />
		<Input type="password" value="" forLabel="password" name="password" />
		<div class="mt-5">
			<Button type="submit" class="bg-blue-600 text-white hover:bg-blue-700">Submit</Button>
		</div>
	</form>
</div>

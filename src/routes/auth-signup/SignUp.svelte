<script>
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { toast } from 'svelte-sonner';
	let { form } = $props();
	async function handleSignup(event) {
		event.preventDefault();

		const form = event.target;
		const formData = new FormData(form);
		const username = formData.get('username');
		const password = formData.get('password');
		const confirmPassword = formData.get('confirm-password');
		if (username.length < 4) {
			toast.error('Username should be at least 4 characters long.');
			return;
		}
		if (confirmPassword !== password) {
			toast.error('Both passwords should match.');
			return;
		}

		try {
			const response = await fetch('/auth-signup', {
				method: 'POST',
				body: formData
			});

			const result = await response.json();
			if (result.status === 200) {
				toast.success(result.message || 'Account created successfully!');
				window.location.href = '/';
			} else {
				toast.error(result.message || 'Signup failed!');
			}
		} catch (error) {
			console.error('Signup failed:', error);
			toast.error('An error occurred. Please try again.');
		}
	}
</script>

<Card.Root class="w-[350px]">
	<Card.Header>
		<Card.Title>Create Account</Card.Title>
		<Card.Description>Buy or sell your cars quickly and affordably.</Card.Description>
	</Card.Header>
	<Card.Content>
		<form class="flex flex-col gap-4" method="POST" onsubmit={handleSignup} use:enhance>
			<div class="grid w-full items-center gap-4">
				<div class="flex flex-col space-y-1.5">
					<Label for="name">Full Name</Label>
					<Input id="name" placeholder="Full Name" type="text" required name="name" />
				</div>
				<div class="flex flex-col space-y-1.5">
					<Label for="username">Username</Label>
					<Input id="username" placeholder="Username" type="text" required name="username" />
				</div>
				<div class="flex flex-col space-y-1.5">
					<Label for="email">Email</Label>
					<Input id="email" placeholder="Email" type="email" required name="email" />
				</div>
				<div class="flex flex-col space-y-1.5">
					<Label for="password">Password</Label>
					<Input id="password" placeholder="Password" type="password" required name="password" />
				</div>
				<div class="flex flex-col space-y-1.5">
					<Label for="confirm-password">Confirm Password</Label>
					<Input
						id="confirm-password"
						placeholder="Confirm Password"
						type="password"
						required
						name="confirm-password"
					/>
				</div>
			</div>
			<div class="flex w-full justify-center">
				<Button type="submit">Create Account</Button>
			</div>
		</form>
	</Card.Content>
	<Card.Footer class="flex flex-col">
		<Card.Description>
			Already have an account, <a href="/auth-login" class="text-blue-700 hover:text-blue-500">
				login here
			</a>
		</Card.Description>
	</Card.Footer>
</Card.Root>

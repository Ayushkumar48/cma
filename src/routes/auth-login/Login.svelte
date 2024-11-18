<script>
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { toast } from 'svelte-sonner';
	import { enhance } from '$app/forms';
	let { form } = $props();
	if (form?.success === true) {
		toast.success(form.message);
	} else if (form?.success === false) {
		toast.error(form.message);
	}
</script>

<Card.Root class="w-[350px]">
	<Card.Header>
		<Card.Title>Login</Card.Title>
		<Card.Description>Buy or sell your cars quickly and affordably.</Card.Description>
	</Card.Header>
	<Card.Content>
		<form class="flex flex-col gap-4" method="POST" use:enhance>
			<div class="grid w-full items-center gap-4">
				<div class="flex flex-col space-y-1.5">
					<Label for="username">Username</Label>
					<Input id="username" placeholder="Username" type="text" required name="username" />
				</div>
				<div class="flex flex-col space-y-1.5">
					<Label for="password">Password</Label>
					<Input id="password" placeholder="Password" type="password" required name="password" />
				</div>
			</div>
			<div class="flex w-full justify-center">
				<Button type="submit">Login</Button>
			</div>
		</form>
	</Card.Content>
	<Card.Footer class="flex flex-col">
		<Card.Description>
			Don't have an account? <a href="/auth-signup" class="text-blue-700 hover:text-blue-500"
				>Create one</a
			>
		</Card.Description>
	</Card.Footer>
</Card.Root>

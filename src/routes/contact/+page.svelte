<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import { toast, Toaster } from 'svelte-sonner';

	function handleClick() {
		toast.success('Message sent successfully!');

		setTimeout(() => {
			location.reload();
		}, 800);
	}
</script>

<Toaster richColors />

<form class="flex h-full items-center justify-center" method="POST" use:enhance={handleClick}>
	<Card.Root class="w-[350px]">
		<Card.Header>
			<Card.Title>Contact Us</Card.Title>
		</Card.Header>
		<Card.Content>
			<div>
				<div class="grid w-full items-center gap-4">
					<div class="flex flex-col space-y-1.5">
						<Label for="name">Name</Label>
						<Input id="name" name="name" placeholder="Name" required />
					</div>
					<div class="flex flex-col space-y-1.5">
						<Label for="email">Email</Label>
						<Input id="email" name="email" placeholder="Email" required />
					</div>
					<div class="flex flex-col space-y-1.5">
						<Label for="message">Message</Label>
						<Textarea id="message" name="message" placeholder="Write your thoughts..." required />
					</div>
				</div>
			</div>
		</Card.Content>
		<Card.Footer class="flex justify-between">
			<div class="flex w-full justify-center">
				<Button variant="outline" type="submit">Send</Button>
			</div>
		</Card.Footer>
	</Card.Root>
</form>

<script>
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { Toaster, toast } from 'svelte-sonner';
	export let username;

	const handleSubmit = async (event) => {
		event.preventDefault();
		toast.info('Data is uploading. Please Wait...');
		const formData = new FormData(event.target);

		formData.append('username', username);
		try {
			const response = await fetch('http://localhost:3000/products', {
				method: 'POST',
				body: formData
			});

			if (response.ok) {
				const result = await response.json();
				toast.success('Car added successfully!');
				location.reload();
			} else {
				const error = await response.json();
				toast.error(error.message || 'Something went wrong!');
			}
		} catch (error) {
			console.error('Upload failed:', error);
			toast.error('Failed to upload images');
		}
	};
</script>

<Toaster richColors />

<Dialog.Root>
	<Dialog.Trigger
		class={buttonVariants({ variant: 'outline' }) +
			` border-none bg-blue-600 hover:bg-blue-500 hover:text-white`}
	>
		+ Add Car
	</Dialog.Trigger>
	<Dialog.Content class="bg-[#09090B] sm:max-w-[425px]">
		<form method="POST" enctype="multipart/form-data" onsubmit={handleSubmit}>
			<Dialog.Header>
				<Dialog.Title>Add new car details</Dialog.Title>
				<Dialog.Description>* marked are required fields.</Dialog.Description>
				<Dialog.Description
					>After pressing save button please wait for 15 - 20 seconds for data to be uploaded.</Dialog.Description
				>
			</Dialog.Header>
			<div class="grid gap-4 py-4">
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="brand" class="text-left">Brand *</Label>
					<Input id="brand" class="col-span-3 bg-white text-black" required name="brand" />
				</div>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="model" class="text-left">Model *</Label>
					<Input id="model" class="col-span-3 bg-white text-black" required name="model" />
				</div>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="color" class="text-left">Color</Label>
					<Input id="color" class="col-span-3 bg-white text-black" name="color" />
				</div>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="modelyear" class="text-left">Model Year *</Label>
					<Input id="modelyear" class="col-span-3 bg-white text-black" required name="modelyear" />
				</div>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="price" class="text-left">Price *</Label>
					<Input id="price" class="col-span-3 bg-white text-black" required name="price" />
				</div>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="description" class="text-left">Description</Label>
					<Textarea
						id="description"
						class="col-span-3 bg-white text-black"
						placeholder="Details of your car..."
						name="description"
					/>
				</div>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="pictures" class="text-left">Pictures *</Label>
					<Input
						id="pictures"
						class="col-span-3 bg-white text-black"
						type="file"
						multiple
						required
						name="pictures"
						accept="image/*"
					/>
				</div>
			</div>
			<Dialog.Footer>
				<Button type="submit">Save changes</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>

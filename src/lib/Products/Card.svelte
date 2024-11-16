<script>
	import Check from 'lucide-svelte/icons/check';
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	import * as Card from '$lib/components/ui/card/index.js';
	import { slide, fade, fly, scale, crossfade } from 'svelte/transition';
	import { elasticInOut, quintInOut } from 'svelte/easing';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';
	let { info, username } = $props();
	async function handleDelete() {
		console.log(info.uuid);
		toast.info("Deleting the car's data...");
		const response = await fetch(
			`https://cma-backend-moinaz9o0-ayush-kumars-projects-511ab598.vercel.app/products?username=${username}&uuid=${info.uuid}`,
			{
				method: 'DELETE'
			}
		);
		const data = await response.json();

		toast.success('Car deleted successfully!');
		location.reload();
		console.log(data);
	}
</script>

<div class="flex">
	<Card.Root class="w-72">
		<Card.Content class="p-1">
			<div>
				<div class="relative">
					<Carousel.Root class="w-full max-w-xs">
						<Carousel.Content>
							{#each info.pictures as picture, i (i)}
								<Carousel.Item>
									<div class="w-full">
										<Card.Root class="w-full">
											<Card.Content class="flex w-full items-center justify-center p-1">
												<a href={`/products/${info.uuid}`} data-sveltekit-prefetch>
													<img src={picture.url} alt="car" class="h-40 w-full rounded" /></a
												>
											</Card.Content>
										</Card.Root>
									</div>
								</Carousel.Item>
							{/each}
						</Carousel.Content>
						<Carousel.Previous
							class="absolute left-0 top-[50%] -translate-y-1/2 transform bg-opacity-70"
						/>
						<Carousel.Next
							class="absolute right-0 top-[50%] -translate-y-1/2 transform bg-opacity-70"
						/>
					</Carousel.Root>
				</div>

				<div class="flex flex-col gap-2 p-2">
					<a href={`/products/${info.uuid}`} data-sveltekit-prefetch>
						<div class="text-xl font-bold">{info.brand}</div>
					</a>
					<div class="flex flex-row justify-between">
						<div>Model:</div>
						<div>{info.model}</div>
					</div>
					<div class="flex flex-row justify-between">
						<div>Color:</div>
						<div>{info.color}</div>
					</div>
					<div class="flex flex-row justify-between">
						<div>Model Year:</div>
						<div>{info.model_year}</div>
					</div>
					<div class="flex flex-row justify-between">
						<div>Price:</div>
						<div>{info.price}</div>
					</div>
				</div>
			</div>
			<div class="flex justify-end p-2">
				<Button class="bg-red-700 text-white hover:bg-red-500" onclick={handleDelete}
					>Delete Car</Button
				>
			</div>
		</Card.Content>
	</Card.Root>
</div>

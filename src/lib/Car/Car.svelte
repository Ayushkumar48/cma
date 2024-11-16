<script>
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	export let data;
	data = data[0];
	console.log(data.pictures);
</script>

<div class="flex flex-row gap-10 rounded-md bg-slate-700 p-4 shadow-xl">
	<div class="flex w-[32%] items-center justify-center">
		<div class="relative rounded-lg bg-slate-400 p-2 shadow-lg">
			<Carousel.Root class="h-full w-full max-w-xs">
				<Carousel.Content>
					{#each data.pictures as picture, i (i)}
						<Carousel.Item>
							<div class="w-full">
								<Card.Root class="w-full">
									<Card.Content class="flex w-full items-center justify-center p-1">
										<img src={picture.url} alt="car" class="h-72 w-full rounded" />
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
	</div>
	<div class="flex w-[68%] flex-col gap-6">
		<div class="text-2xl font-bold">{data.brand}</div>
		<div class="flex flex-row items-center gap-4">
			<div>Model:</div>
			<div class="text-lg">{data.model}</div>
		</div>
		<div class="flex flex-row items-center gap-4">
			<div>Color:</div>
			<div class="text-lg">{data.color}</div>
		</div>
		<div class="flex flex-row items-center gap-4">
			<div>Model year:</div>
			<div class="text-lg">{data.model_year}</div>
		</div>
		<div class="flex flex-row items-center gap-4">
			<div>Price:</div>
			<div class="text-lg font-bold">{data.price}</div>
		</div>
		<div>{data.description}</div>
	</div>
</div>
